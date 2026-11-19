import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";
import type {
  SubmissionData,
  SubmissionInput,
  PublicSubmissionReceipt,
} from "../types/submission";

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "submissions.json");
// Direktori privat di luar folder public/ — tidak memiliki URL publik sama sekali
const PRIVATE_PITCHDECK_DIR = path.join(DATA_DIR, "pitch-decks");

const INITIAL_DATA: SubmissionData[] = [
  {
    id: "sub-101",
    registrationCode: "IND-2026-101A",
    createdAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    status: "Accepted",
    adminNotes: "Gameplay demo sangat solid, pitch deck sudah sesuai standar Indigo.",
    agreedToTerms: true,
    leaderName: "Arya Wicaksono",
    leaderRole: "Game Director & Lead Programmer",
    leaderLinkedin: "https://linkedin.com/in/aryawicaksono",
    leaderCommitment: "Full Time",
    leaderEmail: "arya@nusantaragames.id",
    leaderWhatsapp: "081234567890",
    captable: ">= 65%",
    startupName: "Nusantara Game Studio",
    dateFormed: "2024-03-15",
    location: "Bandung, Jawa Barat",
    targetPlatform: "PC (Personal Computer)",
    startupWebsite: "https://nusantaragames.itch.io/project-kresna",
    gameGenre: "Role-playing (RPG)",
    companyStatus: "PT",
    inCommunity: "Ya",
    communityName: "GameDev Bandung & Asosiasi Game Indonesia",
    otherPrograms: "IGDX Academy 2024",
    pitchdeckFileName: "Pitchdeck_NusantaraGames_v3.pdf",
    pitchdeckStoragePath: "pitch-decks/IND-2026-101A_Pitchdeck_NusantaraGames_v3.pdf",
    teaserVideoUrl: "https://youtube.com/watch?v=dQw4w9WgXcQ",
    gameDemoUrl: "https://drive.google.com/file/d/sample-build-nusantara/view",
    referralSource: "Social Media (Facebook, Instagram, LinkedIn, lainnya)",
  },
  {
    id: "sub-102",
    registrationCode: "IND-2026-102B",
    createdAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: "Under Review",
    adminNotes: "Sedang dikurasi oleh mentor teknis untuk vertical slice review.",
    agreedToTerms: true,
    leaderName: "Dewi Safitri",
    leaderRole: "Game Designer & Producer",
    leaderLinkedin: "https://linkedin.com/in/dewisafitri-gd",
    leaderCommitment: "Full Time",
    leaderEmail: "dewi@pixelcrafters.co",
    leaderWhatsapp: "082198765432",
    captable: ">= 65%",
    startupName: "PixelCrafters Interactive",
    dateFormed: "2025-01-10",
    location: "Yogyakarta",
    targetPlatform: "Mobile (Smartphone & Tablet)",
    startupWebsite: "https://pixelcrafters.co",
    gameGenre: "Puzzle",
    companyStatus: "CV",
    inCommunity: "Ya",
    communityName: "GameLAN Jogja",
    otherPrograms: "-",
    pitchdeckFileName: "PixelCrafters_Deck_2026.pdf",
    pitchdeckStoragePath: "pitch-decks/IND-2026-102B_PixelCrafters_Deck_2026.pdf",
    teaserVideoUrl: "https://youtube.com/watch?v=sample-teaser",
    gameDemoUrl: "https://testflight.apple.com/join/sample",
    referralSource: "Forum, Seminar, Webinar",
  },
];

function ensurePrivateDirectories(): void {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(PRIVATE_PITCHDECK_DIR)) {
      fs.mkdirSync(PRIVATE_PITCHDECK_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify(INITIAL_DATA, null, 2), "utf-8");
    }
  } catch (err) {
    console.error("Error creating private data directory:", err);
  }
}

function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !key || url.includes("your-project-id")) {
    return null;
  }
  return createClient(url, key);
}

function generateRegistrationCode(): string {
  const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
  const num = Math.floor(1000 + Math.random() * 9000);
  return `IND-2026-${num}${rand.slice(0, 2)}`;
}

/**
 * WRITE-ONLY SERVICE (Khusus Repo 1: indigo-public-web)
 * Menyimpan file PDF Pitch Deck ke Private Storage Bucket (tidak dapat diakses publik)
 * dan menyimpan data formulir ke Database, lalu hanya mengembalikan bukti nomor registrasi.
 */
export async function createPublicSubmission(
  input: Omit<SubmissionInput, "pitchdeckStoragePath">,
  pdfBuffer: Buffer
): Promise<PublicSubmissionReceipt> {
  ensurePrivateDirectories();

  const registrationCode = generateRegistrationCode();
  const id = `ind-${Date.now().toString(36)}-${Math.random().toString(36).substring(2, 6)}`;
  const createdAt = new Date().toISOString();

  // Sanitasi nama file PDF
  const safeFileName = input.pitchdeckFileName
    .replace(/[^a-zA-Z0-9._-]/g, "_")
    .replace(/_{2,}/g, "_");
  const storageFileName = `${registrationCode}_${safeFileName}`;
  const pitchdeckStoragePath = `pitch-decks/${storageFileName}`;

  // 1. Simpan file PDF ke folder privat lokal (di luar public/ agar aman & hanya bisa diakses Admin)
  try {
    const localFilePath = path.join(PRIVATE_PITCHDECK_DIR, storageFileName);
    fs.writeFileSync(localFilePath, pdfBuffer);
  } catch (err) {
    console.error("Warning: Gagal menulis file PDF ke disk lokal:", err);
  }

  // 2. Jika Supabase dikonfigurasi, upload PDF ke Private Bucket 'pitch-decks' & INSERT ke tabel game_submissions
  const supabase = getSupabaseClient();
  if (supabase) {
    const { error: uploadErr } = await supabase.storage
      .from("pitch-decks")
      .upload(storageFileName, pdfBuffer, {
        contentType: "application/pdf",
        upsert: false,
      });

    if (uploadErr) {
      console.error("Supabase Storage upload warning:", uploadErr.message);
    }

    const { error: dbErr } = await supabase.from("game_submissions").insert({
      registration_code: registrationCode,
      agreed_to_terms: input.agreedToTerms,
      leader_name: input.leaderName,
      leader_role: input.leaderRole,
      leader_linkedin: input.leaderLinkedin,
      leader_commitment: input.leaderCommitment,
      leader_email: input.leaderEmail,
      leader_whatsapp: input.leaderWhatsapp,
      captable: input.captable,
      startup_name: input.startupName,
      date_formed: input.dateFormed,
      location: input.location,
      target_platform: input.targetPlatform,
      startup_website: input.startupWebsite,
      game_genre: input.gameGenre,
      company_status: input.companyStatus,
      in_community: input.inCommunity,
      community_name: input.communityName || null,
      other_programs: input.otherPrograms,
      pitchdeck_file_name: input.pitchdeckFileName,
      pitchdeck_storage_path: pitchdeckStoragePath,
      teaser_video_url: input.teaserVideoUrl || null,
      game_demo_url: input.gameDemoUrl || null,
      referral_source: input.referralSource,
      status: "Pending",
    });

    if (dbErr) {
      console.error("Supabase DB insert warning:", dbErr.message);
    }
  }

  // 3. Simpan juga ke data/submissions.json untuk sinkronisasi lokal dengan Repo 2 (Admin)
  const newSubmission: SubmissionData = {
    ...input,
    id,
    registrationCode,
    createdAt,
    status: "Pending",
    pitchdeckStoragePath,
  };

  try {
    const raw = fs.readFileSync(DATA_FILE, "utf-8");
    const list: SubmissionData[] = JSON.parse(raw);
    const updated = [newSubmission, ...(Array.isArray(list) ? list : INITIAL_DATA)];
    fs.writeFileSync(DATA_FILE, JSON.stringify(updated, null, 2), "utf-8");
  } catch (err) {
    console.error("Warning: Gagal memperbarui data/submissions.json:", err);
  }

  // 4. Kembalikan HANYA bukti pendaftaran publik (tanpa pitchdeckStoragePath / URL PDF)
  return {
    id: newSubmission.id,
    registrationCode: newSubmission.registrationCode,
    createdAt: newSubmission.createdAt,
    startupName: newSubmission.startupName,
    leaderName: newSubmission.leaderName,
    gameGenre: newSubmission.gameGenre,
    targetPlatform: newSubmission.targetPlatform,
    pitchdeckFileName: newSubmission.pitchdeckFileName,
  };
}
