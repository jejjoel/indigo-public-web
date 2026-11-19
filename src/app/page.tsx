import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Gamepad2,
  DollarSign,
  Users,
  Award,
  Sparkles,
  Globe,
  Laptop,
  Briefcase,
  ArrowRight,
  Building2,
} from "lucide-react";

const SUPPORTS = [
  {
    icon: DollarSign,
    title: "Development Fund",
    desc: "Pendanaan pengembangan game untuk meminimalkan risiko biaya produksi hingga siap rilis ke publisher.",
  },
  {
    icon: Users,
    title: "Dedicated Mentors",
    desc: "Pendampingan intensif 1-on-1 dari Resident & Technical Mentor berpengalaman di industri game global.",
  },
  {
    icon: Briefcase,
    title: "Publishing Support",
    desc: "Bantuan kurasi pitch deck, business matching, dan negosiasi kesepakatan dengan publisher internasional.",
  },
  {
    icon: Globe,
    title: "Global Networking & Events",
    desc: "Kesempatan pameran di ajang nasional dan internasional seperti IGDX, Tokyo Game Show, dan Gamescom.",
  },
  {
    icon: Laptop,
    title: "Facility & Hardware Support",
    desc: "Dukungan perangkat kerja spesifikasi tinggi (Gaming PC/Workstation) dan akses fasilitas co-working.",
  },
  {
    icon: Award,
    title: "Business & Legal Guidance",
    desc: "Pendampingan pembentukan badan usaha (PT/CV), manajemen IP, serta struktur captable startup.",
  },
];

const MENTORS = [
  {
    name: "Andi Suryanto",
    role: "Resident Mentor — Business & Publishing",
    focus: "Monetization Strategy, Publisher Pitching & IP Management",
  },
  {
    name: "Rizky Pratama",
    role: "Resident Mentor — Game Design",
    focus: "Core Loop Design, Player Retention & Vertical Slice Polish",
  },
  {
    name: "Siti Rahmawati",
    role: "Resident Mentor — Studio Operations",
    focus: "Team Scaling, Agile Production & Financial Runway",
  },
  {
    name: "Bima Kusuma",
    role: "Technical Mentor — Game Engineering",
    focus: "Unity/Unreal Optimization, Architecture & Multi-platform Porting",
  },
  {
    name: "Nadia Putri",
    role: "Technical Mentor — Game Art & Direction",
    focus: "2D/3D Art Pipeline, Visual Identity & UI/UX for Games",
  },
  {
    name: "Kevin Wijaya",
    role: "Technical Mentor — Marketing & Community",
    focus: "Steam Wishlist Growth, Trailer Direction & Community Building",
  },
];

const PARTNERS = [
  "PT Telkom Indonesia",
  "Kemenparekraf RI",
  "Kominfo / IGDX",
  "Asosiasi Game Indonesia (AGI)",
  "Indigo Startup Incubation",
  "Global Game Publishers Network",
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-16 pb-24 border-b border-[#1b202e]">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[850px] h-[400px] bg-gradient-to-b from-[#E71C34]/25 via-[#700B1C]/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-md bg-[#F3E000] text-black text-xs font-extrabold uppercase tracking-wider mb-6 shadow-lg">
            <span>INTAKE IS OPEN</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight mb-6">
            LEVEL UP YOUR{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E71C34] via-[#ff4a60] to-[#F2A900]">
              GAME STUDIO
            </span>{" "}
            TO THE GLOBAL STAGE
          </h1>

          <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto mb-9 leading-relaxed">
            Indigo Game Startup Incubation mendukung studio game tahap awal di Indonesia melalui pendanaan produksi, mentoring pakar industri, dan jembatan langsung menuju publisher global.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#E71C34] hover:bg-[#D3182E] text-white text-sm font-extrabold uppercase tracking-wider shadow-xl shadow-[#E71C34]/30 transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#F3E000]" />
              SUBMIT YOUR GAME
            </Link>
            <Link
              href="/about"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-[#141721] hover:bg-[#1b202e] border border-[#252b3b] text-gray-200 text-sm font-semibold transition-all"
            >
              Pelajari Tahapan Inkubasi
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 2. VALUE PROPOSITION: STATS & 6 SUPPORTS */}
      <section className="bg-gradient-to-br from-[#E71C34] via-[#D3182E] to-[#700B1C] py-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Card */}
          <div className="bg-[#700B1C]/90 border border-white/15 rounded-2xl p-8 mb-14 shadow-2xl">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl sm:text-5xl font-extrabold text-[#F3E000]">30+</p>
                <p className="text-xs sm:text-sm text-red-100 uppercase tracking-wider font-bold mt-1">
                  Startups Incubated
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-5xl font-extrabold text-[#F3E000]">US$600K+</p>
                <p className="text-xs sm:text-sm text-red-100 uppercase tracking-wider font-bold mt-1">
                  Funding Delivered
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-5xl font-extrabold text-[#F3E000]">9</p>
                <p className="text-xs sm:text-sm text-red-100 uppercase tracking-wider font-bold mt-1">
                  Publisher Deals
                </p>
              </div>
              <div>
                <p className="text-3xl sm:text-5xl font-extrabold text-[#F3E000]">10+</p>
                <p className="text-xs sm:text-sm text-red-100 uppercase tracking-wider font-bold mt-1">
                  Global Events
                </p>
              </div>
            </div>
          </div>

          <div className="text-center mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F3E000]">
              WE PROVIDE
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold mt-1">
              SUPPORTS TO LEVEL UP YOUR GAME
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SUPPORTS.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="bg-[#0b0c10]/90 border border-white/10 rounded-2xl p-6 hover:border-[#F3E000]/50 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#E71C34]/20 border border-[#E71C34]/40 flex items-center justify-center text-[#F3E000] mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. VISI & PARTNER INDUSTRI / PEMERINTAH */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f121a] border-b border-[#1b202e]">
        <div className="max-w-7xl mx-auto text-center">
          <span className="text-xs font-extrabold uppercase tracking-widest text-[#E71C34]">
            WE ARE
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 mb-3">
            BACKED BY INDUSTRY &amp; GOVERNMENT ECOSYSTEM
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 max-w-2xl mx-auto mb-10">
            Kolaborasi strategis antara BUMN, kementerian, asosiasi industri, dan jaringan penerbit global untuk mempercepat pertumbuhan studio game nasional.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {PARTNERS.map((p) => (
              <div
                key={p}
                className="bg-[#141721] border border-[#252b3b] rounded-xl p-4 flex flex-col items-center justify-center gap-2 hover:border-[#E71C34]/40 transition-colors"
              >
                <Building2 className="w-6 h-6 text-[#F2A900]" />
                <span className="text-xs font-bold text-gray-200 text-center">
                  {p}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DAFTAR MENTOR */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F2A900]">
              DEDICATED EXPERTS
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white mt-1">
              RESIDENT &amp; TECHNICAL MENTORS
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              Dibimbing langsung oleh praktisi berpengalaman di bidang game design, pemrograman, visual art, hingga bisnis penerbitan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {MENTORS.map((m) => (
              <div
                key={m.name}
                className="bg-[#141721] border border-[#252b3b] rounded-2xl p-6 hover:border-[#E71C34]/50 transition-all"
              >
                <div className="flex items-center gap-3.5 mb-3">
                  <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#E71C34] to-[#700B1C] flex items-center justify-center font-extrabold text-white text-sm">
                    {m.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white">{m.name}</h3>
                    <p className="text-[11px] font-semibold text-[#F2A900]">{m.role}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{m.focus}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. BOTTOM CTA SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-[#141721] via-[#1c1118] to-[#141721] border-t border-[#252b3b]">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block px-3 py-1 rounded bg-[#F3E000] text-black text-xs font-extrabold uppercase mb-4">
            Indigo Game Intake is Open
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white mb-4">
            EAGER TO GET A PUBLISHER FOR YOUR GAME?
          </h2>
          <p className="text-xs sm:text-sm text-gray-300 max-w-xl mx-auto mb-8">
            Kirimkan proposal studio dan Pitch Deck Anda langsung melalui portal pendaftaran terintegrasi kami sekarang.
          </p>
          <Link
            href="/submit"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[#E71C34] hover:bg-[#D3182E] text-white text-sm font-extrabold uppercase tracking-wider shadow-xl shadow-[#E71C34]/30 transition-all hover:-translate-y-0.5"
          >
            <Gamepad2 className="w-5 h-5 text-[#F3E000]" />
            SUBMIT YOUR GAME
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
