import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Calendar, Layers, Rocket, Sparkles, CheckCircle2 } from "lucide-react";

const TIMELINE = [
  {
    year: "2019",
    batch: "Batch 1 — Inisiasi Indigo Game",
    desc: "Peluncuran perdana program inkubasi khusus vertikal game di bawah naungan Indigo Telkom Indonesia.",
  },
  {
    year: "2020",
    batch: "Batch 2 — Adaptasi & Ekspansi Nasional",
    desc: "Inkubasi dilakukan secara hybrid menjangkau studio game indie dari berbagai kota di seluruh Indonesia.",
  },
  {
    year: "2021",
    batch: "Batch 3 & 4 — Akselerasi Vertical Slice",
    desc: "Fokus pada penguatan prototipe playable vertical slice dan kurasi standar penerbit internasional.",
  },
  {
    year: "2022",
    batch: "Batch 5 — Kolaborasi Publisher Global",
    desc: "Mempertemukan studio binaan dengan publisher global dan partisipasi di ajang pameran game internasional.",
  },
  {
    year: "2023–2025",
    batch: "Batch 6 & 7 — Penguatan IP & Multi-Platform",
    desc: "Ekspansi portofolio studio ke platform PC (Steam), Console, dan Mobile dengan total pendanaan melampaui US$600K+.",
  },
  {
    year: "2026",
    batch: "Batch 8 — Transformasi Portal First-Party Intake",
    desc: "Penerapan sistem pendaftaran mandiri terintegrasi (tanpa Google Form) dengan keamanan dokumen Pitch Deck privat.",
  },
];

const STAGES = [
  {
    step: "01",
    title: "Intake & Curated Selection",
    duration: "Bulan 1",
    points: [
      "Pengiriman formulir 5 tahap & dokumen Pitch Deck PDF melalui portal /submit.",
      "Kurasi awal kelayakan tim (WNI, Captable >= 65%, pilar Art/Programming/Design).",
      "Evaluasi playable vertical slice & sesi pitching bersama tim mentor.",
    ],
  },
  {
    step: "02",
    title: "Production & Mentorship",
    duration: "Bulan 2 – 9",
    points: [
      "Pencairan Development Fund bertahap berdasarkan milestone produksi.",
      "Mentoring mingguan bersama Resident & Technical Mentors.",
      "Dukungan fasilitas perangkat keras (Gaming PC) & pengujian QA berkala.",
    ],
  },
  {
    step: "03",
    title: "Operational & Publishing Deal",
    duration: "Bulan 10 – 12",
    points: [
      "Persiapan materi pemasaran, trailer, dan halaman store (Steam / Mobile / Console).",
      "Business matching dan negosiasi kontrak bersama mitra Publisher Global.",
      "Showcase karya di pameran industri game nasional & internasional.",
    ],
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1b202e] text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-gradient-to-b from-[#E71C34]/20 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded bg-[#F3E000] text-black text-xs font-extrabold uppercase tracking-wider mb-4">
            SINCE 2019
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            ABOUT{" "}
            <span className="text-[#E71C34]">INDIGO GAME</span> INCUBATION
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto">
            Didirikan pada tahun 2019 oleh PT Telkom Indonesia, Indigo Game hadir sebagai katalisator bagi studio game tahap awal untuk bertumbuh menjadi perusahaan game yang berkelanjutan dan kompetitif di pasar global.
          </p>
        </div>
      </section>

      {/* 2. TIMELINE SEJARAH (2019 - 2026) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1b202e]">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F2A900] flex items-center justify-center gap-1.5">
              <Calendar className="w-4 h-4" />
              OUR JOURNEY
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              MILESTONES &amp; TRACK RECORD (2019 – 2026)
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TIMELINE.map((item) => (
              <div
                key={item.year}
                className="bg-[#141721] border border-[#252b3b] rounded-2xl p-6 hover:border-[#E71C34]/50 transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="px-3 py-1 rounded-md bg-[#E71C34] text-white text-xs font-extrabold">
                    {item.year}
                  </span>
                  <span className="text-xs font-bold text-[#F3E000]">
                    Indigo Game
                  </span>
                </div>
                <h3 className="text-base font-bold text-white mb-2">
                  {item.batch}
                </h3>
                <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TAHAPAN INKUBASI (INTAKE, PRODUCTION, OPERATIONAL) */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f121a]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E71C34] flex items-center justify-center gap-1.5">
              <Layers className="w-4 h-4" />
              INCUBATION PHASES
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              3 TAHAPAN PROGRAM INKUBASI
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {STAGES.map((st) => (
              <div
                key={st.step}
                className="bg-[#141721] border border-[#252b3b] rounded-2xl p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-extrabold text-[#F3E000]">
                      {st.step}
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded bg-[#0b0c10] border border-[#252b3b] text-gray-300">
                      {st.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-4">
                    {st.title}
                  </h3>
                  <ul className="space-y-3">
                    {st.points.map((pt) => (
                      <li
                        key={pt}
                        className="flex items-start gap-2 text-xs sm:text-sm text-gray-300"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[#E71C34] shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BOTTOM CTA */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#700B1C] via-[#BC1428] to-[#E71C34] text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-3">
            SIAP BERGABUNG DI BATCH BERIKUTNYA?
          </h2>
          <p className="text-xs sm:text-sm text-red-100 mb-6">
            Pastikan tim Anda memenuhi kriteria dasar dan telah menyiapkan dokumen Pitch Deck PDF.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#F3E000] hover:bg-[#F2A900] text-black text-sm font-extrabold uppercase tracking-wider shadow-xl transition-all"
          >
            <Rocket className="w-4 h-4 text-[#E71C34]" />
            SUBMIT YOUR GAME
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
