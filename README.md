# 🌐 Indigo Public Web (`indigo-public-web`)
> **Repository 1 — Website Publik & Portal Pendaftaran Mandiri (*First-Party Intake System*) untuk Indigo Game (`game.indigo.id`)**  
> *Final Project Divisi Web Development — MSIB Mandiri VINIX7 (November 2026)*

---

## 📌 1. Ikhtisar Arsitektur (Repo 1 dari 2)

Aplikasi ini merupakan **Repository 1 (`indigo-public-web`)** dari arsitektur **Multi-Repo + Shared Database** Indigo Game:

1. **`indigo-public-web` (Repo ini):**
   - Menyajikan seluruh halaman publik (`Home /`, `About /about`, `Startups /startups`, `Contact /contact`) serta halaman pendaftaran **`/submit`** (*5-Step Wizard Form* sesuai standar resmi *Teams Form Registration Indigo Game Intake Program*).
   - **Prinsip Keamanan (*Zero Public Admin Footprint* & *Write-Only*):** Tidak memiliki halaman admin dan tidak mengizinkan pembacaan daftar pendaftar (`GET /api/submissions` dikunci dengan `403 Forbidden`). User publik **hanya dapat mengisi dan mengirimkan formulir**.
   - **Kerahasiaan Pitch Deck:** Dokumen PDF Pitch Deck yang diunggah di Halaman 4 disimpan ke **Private Storage Bucket (`pitch-decks`)**. Setelah form disubmit, pendaftar hanya menerima **Nomor Tiket / Kode Registrasi Unik (`IND-2026-XXXX`)**, sementara file PDF hanya dapat dilihat oleh Tim Kurator & Admin melalui `indigo-admin-web`.

2. **`indigo-admin-web` (Repo 2 — Terpisah):**
   - Portal internal khusus Tim Indigo & Mentor untuk login, memantau dashboard, membuka preview PDF Pitch Deck, memberikan skor penilaian mentor, dan mengubah status kurasi.

---

## 🗺️ 2. Struktur Halaman (`indigo-public-web`)

| Route | Halaman | Deskripsi |
| :--- | :--- | :--- |
| `/` | **Home** | Hero section, metrik utama (`30+ Startups`, `US$600K+`, `9 Publisher Deals`, `10+ Global Events`), 6 dukungan inkubasi, partner ekosistem, daftar mentor, & CTA menuju `/submit`. |
| `/about` | **About** | Sejarah Indigo Game sejak 2019, Timeline Batch 1–8 (2019–2026), dan 3 Tahapan Inkubasi (*Intake, Production, Operational*). |
| `/startups` | **Startups** | Portofolio studio game alumni inkubasi Indigo Game beserta tautan store (Steam, Google Play, itch.io). |
| `/contact` | **Contact** | Formulir pesan kolaborasi umum (*Full Name, Email, Message*) yang tersimpan ke tabel `contact_messages`. |
| `/submit` | **Submit Game** | **Fitur Utama:** Formulir pendaftaran terintegrasi **5 Halaman** lengkap dengan validasi bertingkat dan unggah PDF Pitch Deck ke penyimpanan privat. |

---

## 🚀 3. Cara Menjalankan di Lokal

```bash
cd indigo-public-web
npm install
npm run dev
```
Buka **`http://localhost:3000`** di browser Anda.
