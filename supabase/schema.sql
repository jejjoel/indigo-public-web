-- =============================================================================
-- INDIGO GAME INTAKE SYSTEM — SHARED SUPABASE DATABASE & STORAGE SCHEMA
-- Digunakan bersama oleh:
--   1. Repo 1: indigo-public-web (Hanya INSERT / Write-Only)
--   2. Repo 2: indigo-admin-web  (SELECT, UPDATE, DELETE & Preview Pitch Deck)
-- =============================================================================

-- 1. TABEL UTAMA: game_submissions (Sesuai 5 Halaman Google Form Indigo Game Intake)
CREATE TABLE IF NOT EXISTS public.game_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  registration_code VARCHAR(32) NOT NULL UNIQUE,

  -- Halaman 1: Kriteria & Ketentuan Program
  agreed_to_terms BOOLEAN NOT NULL DEFAULT true,

  -- Halaman 2: Profil Game Director (Leader)
  leader_name VARCHAR(150) NOT NULL,
  leader_role VARCHAR(150) NOT NULL,
  leader_linkedin TEXT NOT NULL,
  leader_commitment VARCHAR(20) NOT NULL CHECK (leader_commitment IN ('Full Time', 'Part Time')),
  leader_email VARCHAR(150) NOT NULL,
  leader_whatsapp VARCHAR(40) NOT NULL,
  captable VARCHAR(15) NOT NULL CHECK (captable IN ('>= 65%', '< 65%')),

  -- Halaman 3: Game Startup Details
  startup_name VARCHAR(150) NOT NULL,
  date_formed DATE NOT NULL,
  location VARCHAR(150) NOT NULL,
  target_platform VARCHAR(100) NOT NULL,
  startup_website TEXT NOT NULL,
  game_genre VARCHAR(100) NOT NULL,
  company_status VARCHAR(30) NOT NULL CHECK (company_status IN ('PT', 'CV', 'Belum terdaftar')),
  in_community VARCHAR(10) NOT NULL CHECK (in_community IN ('Ya', 'Tidak')),
  community_name VARCHAR(150),
  other_programs TEXT NOT NULL DEFAULT '-',

  -- Halaman 4: Game Startup Documents (Private Pitch Deck & Media Links)
  pitchdeck_file_name VARCHAR(255) NOT NULL,
  pitchdeck_storage_path TEXT NOT NULL, -- Path internal di Private Bucket 'pitch-decks'
  teaser_video_url TEXT,
  game_demo_url TEXT,

  -- Halaman 5: Preference
  referral_source VARCHAR(150) NOT NULL,

  -- Status Kurasi Internal (Hanya dikelola dari indigo-admin-web)
  status VARCHAR(30) NOT NULL DEFAULT 'Pending' CHECK (status IN ('Pending', 'Under Review', 'Accepted', 'Rejected')),
  admin_notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index untuk mempercepat pencarian & filter di Dashboard Admin
CREATE INDEX IF NOT EXISTS idx_game_submissions_status ON public.game_submissions(status);
CREATE INDEX IF NOT EXISTS idx_game_submissions_created_at ON public.game_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_game_submissions_registration_code ON public.game_submissions(registration_code);

-- 2. TABEL PROFIL ADMIN / MENTOR (1-to-1 dengan Supabase auth.users)
CREATE TABLE IF NOT EXISTS public.admin_profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email VARCHAR(150) NOT NULL UNIQUE,
  full_name VARCHAR(150) NOT NULL,
  role VARCHAR(30) NOT NULL DEFAULT 'MENTOR_REVIEWER' CHECK (role IN ('SUPER_ADMIN', 'MENTOR_REVIEWER')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 3. TABEL PENILAIAN MENTOR (submission_reviews)
CREATE TABLE IF NOT EXISTS public.submission_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  submission_id UUID NOT NULL REFERENCES public.game_submissions(id) ON DELETE CASCADE,
  reviewer_id UUID REFERENCES public.admin_profiles(id) ON DELETE SET NULL,
  score_gameplay INT NOT NULL CHECK (score_gameplay BETWEEN 1 AND 5),
  score_business INT NOT NULL CHECK (score_business BETWEEN 1 AND 5),
  score_team INT NOT NULL CHECK (score_team BETWEEN 1 AND 5),
  review_notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_submission_reviews_submission_id ON public.submission_reviews(submission_id);

-- 4. TABEL PESAN KONTAK UMUM (contact_messages)
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================================================
-- KEAMANAN ROW LEVEL SECURITY (RLS)
-- =============================================================================
ALTER TABLE public.game_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.submission_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Policy 1: Pengunjung Publik (anon) HANYA BOLEH INSERT ke game_submissions & contact_messages
-- (Tidak ada policy SELECT/UPDATE/DELETE untuk anon, sehingga user publik tidak bisa membaca data)
CREATE POLICY "Public users can only insert game submissions"
  ON public.game_submissions
  FOR INSERT
  TO anon
  WITH CHECK (agreed_to_terms = true);

CREATE POLICY "Public users can only insert contact messages"
  ON public.contact_messages
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Policy 2: Admin Terautentikasi (authenticated) memiliki akses penuh (SELECT, UPDATE, DELETE)
CREATE POLICY "Authenticated admins can view all submissions"
  ON public.game_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated admins can update submissions"
  ON public.game_submissions
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can delete submissions"
  ON public.game_submissions
  FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated admins can manage reviews"
  ON public.submission_reviews
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated admins can manage contact messages"
  ON public.contact_messages
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- =============================================================================
-- KONFIGURASI PRIVATE STORAGE BUCKET: pitch-decks
-- =============================================================================
-- Bucket diset public = FALSE agar file Pitch Deck TIDAK memiliki Public URL
-- dan HANYA dapat dibuka oleh Admin melalui Signed URL setelah user submit.
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'pitch-decks',
  'pitch-decks',
  false,
  104857600, -- Maks 100 MB (sesuai ketentuan form)
  ARRAY['application/pdf']
)
ON CONFLICT (id) DO UPDATE
SET public = false,
    file_size_limit = 104857600,
    allowed_mime_types = ARRAY['application/pdf'];

-- Policy Storage 1: User Publik (anon) HANYA bisa UPLOAD (INSERT) PDF ke bucket pitch-decks
CREATE POLICY "Public users can upload pitch deck PDF only"
  ON storage.objects
  FOR INSERT
  TO anon
  WITH CHECK (bucket_id = 'pitch-decks');

-- Policy Storage 2: HANYA Admin (authenticated) yang bisa membaca / preview file Pitch Deck
CREATE POLICY "Only authenticated admins can view or download pitch decks"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'pitch-decks');
