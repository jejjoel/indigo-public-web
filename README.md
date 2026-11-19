# 🎮 Indigo Game Intake Portal (Revamp)
> **Solusi Sistem Pengumpulan Game Terintegrasi untuk Program Inkubasi Indigo Game (PT Telkom Indonesia)**  
> *Final Project Divisi Web Development — MSIB Mandiri VINIX7 (November 2026)*

![Next.js](https://img.shields.io/badge/Next.js-16.4-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)
![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)

---

## 📌 1. Latar Belakang & Problem Statement
Situs resmi [game.indigo.id](https://game.indigo.id/) sebelumnya menggunakan tautan eksternal (**Google Form**) untuk proses intake/pengumpulan berkas studio game. Pendekatan ini memiliki beberapa kelemahan:
1. **Pengalaman Pengguna Terputus:** Calon pendaftar dialihkan keluar dari domain resmi ke layanan pihak ketiga.
2. **Keterbatasan Validasi:** Tidak ada validasi real-time untuk kriteria khusus (misal kelayakan captable $\ge 65\%$, link demo game, atau batasan ukuran file PDF).
3. **Ketiadaan Dashboard Kurasi Terpadu:** Tim kurator/mentor kesulitan melacak riwayat status pendaftaran secara terstruktur langsung dari website.

### 💡 Solusi
Membangun portal intake native terintegrasi yang menyatu langsung di dalam sistem:
- **Multi-Step Form (5 Tahapan):** Meniru alur resmi Google Form dengan estetika visual gaming (tema Crimson Red Telkom `#E71C34` & Dark Charcoal `#0b0c10`).
- **Validasi Ketat:** Validasi data Game Director, detail studio, genre game, dokumen PDF pitch deck, dan kriteria kelayakan.
- **Dashboard Admin (CRUD Lengkap):** Panel kurasi untuk melihat, memfilter, mengubah status evaluasi (*Pending*, *Under Review*, *Accepted*, *Rejected*), mencatat feedback mentor, hingga ekspor data ke format CSV.

---

## ✨ 2. Fitur Utama

### A. Untuk Pendaftar Game Startup
- **Tahap 1: Kriteria & Ketentuan Intake** — Syarat WNI, komposisi minimal tim, dan konfirmasi kepatuhan kriteria.
- **Tahap 2: Profil Game Director** — Nama, role tim, LinkedIn, komitmen waktu (Full/Part Time), kontak WhatsApp/Email, dan captable.
- **Tahap 3: Detail Game & Studio** — Nama tim, tanggal berdiri, domisili, target platform rilis, website/itch.io/Steam, genre dominan, legalitas perusahaan, dan keikutsertaan komunitas.
- **Tahap 4: Dokumen & Media** — Unggah Pitch Deck PDF (maks 100 MB), tautan video teaser YouTube, dan tautan installer/playable demo.
- **Tahap 5: Preferensi & Konfirmasi** — Sumber info program, ringkasan pendaftaran otomatis, dan kode registrasi unik.

### B. Untuk Tim Kurator & Mentor (Admin Panel)
- **Monitoring Statistik:** Indikator jumlah pendaftar per status secara instan.
- **Pencarian & Filter Cepat:** Temukan startup berdasarkan nama tim, nama leader, genre game, atau domisili kota.
- **Modal Detail Interaktif:** Akses instan ke kontak leader (WhatsApp/Email), unduh berkas pitch deck, dan buka link demo game.
- **Pembaruan Status & Catatan:** Fitur pembaruan status pendaftaran dan penambahan catatan evaluasi mentor.
- **Export Data CSV:** Unduh rekapitulasi data pendaftar untuk arsip spreadsheet internal.

---

## 🛠️ 3. Tech Stack

| Lapisan | Teknologi | Alasan Pemilihan |
|---|---|---|
| **Frontend Framework** | **Next.js (App Router) + React 19** | Performa tinggi, Server-Side Rendering (SSR), arsitektur modular |
| **Styling & UI** | **Tailwind CSS + Lucide Icons** | Desain responsif bertema dark gaming dengan performa styling optimal |
| **Backend & API** | **Next.js API Routes** | Endpoint RESTful terintegrasi untuk operasi CRUD pendaftar |
| **Basis Data** | **Structured Persistent Storage / Supabase** | Penyimpanan data relasional aman dan terstruktur |
| **Deployment** | **Vercel** | Hosting cloud dengan integrasi otomatis continuous deployment |

---

## 📂 4. Struktur Direktori Proyek

```
indigo-game-submission/
├── src/
│   ├── app/
│   │   ├── admin/            # Halaman Dashboard Kurasi Admin (CRUD)
│   │   │   └── page.tsx
│   │   ├── api/              # Endpoint RESTful API
│   │   │   └── submissions/
│   │   │       ├── route.ts
│   │   │       └── [id]/route.ts
│   │   ├── globals.css       # Token warna Indigo Game & kustomisasi styling
│   │   ├── layout.tsx        # Layout utama sistem
│   │   └── page.tsx          # Halaman Beranda & Multi-Step Form
│   ├── components/
│   │   ├── Footer.tsx        # Footer resmi Telkom Indigo Game
│   │   ├── MultiStepForm.tsx # Komponen form interaktif 5 tahap
│   │   └── Navbar.tsx        # Navigasi sticky responsive
│   ├── lib/
│   │   └── storage.ts        # Data layer & logika persistensi CRUD
│   └── types/
│       └── submission.ts     # Type definitions data pendaftar
├── data/
│   └── submissions.json      # Basis data lokal awal & mock pendaftar
├── package.json
└── README.md
```

---

## 🚀 5. Cara Menjalankan Proyek Secara Lokal

1. **Clone repositori:**
   ```bash
   git clone https://github.com/<username>/indigo-game-submission.git
   cd indigo-game-submission
   ```

2. **Install dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server pengembangan:**
   ```bash
   npm run dev
   ```

4. **Buka di browser:**
   - Halaman Formulir: `http://localhost:3000`
   - Dashboard Admin: `http://localhost:3000/admin`

5. **Build untuk produksi:**
   ```bash
   npm run build
   npm start
   ```

---

## 👥 6. Tim Pengembang (MSIB VINIX7)
- **Frontend Specialist:** UI/UX implementation, responsiveness, & styling
- **Backend Specialist:** REST API, database query, server logic
- **Database & DevOps:** Cloud deployment, database schema, CI/CD
- **QA & Technical Writer:** Testing report, documentation, & repository management

---
*Dikembangkan dengan dedikasi untuk seleksi Demo Day Divisi Web Development MSIB Mandiri VINIX7 2026.*
