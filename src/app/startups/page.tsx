import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Gamepad2, ExternalLink, Sparkles, Mail } from "lucide-react";

const FEATURED_STUDIOS = [
  {
    studio: "Nusantara Game Studio",
    game: "Chronicles of Majapahit",
    genre: "Role-playing (RPG)",
    platform: "PC (Steam)",
    city: "Bandung",
    storeUrl: "https://store.steampowered.com",
  },
  {
    studio: "PixelCrafters Interactive",
    game: "Nusa Puzzle Quest",
    genre: "Puzzle / Casual",
    platform: "Mobile (iOS & Android)",
    city: "Yogyakarta",
    storeUrl: "https://play.google.com",
  },
  {
    studio: "Garuda Forge Games",
    game: "Mecha Strikers: Horizon",
    genre: "Action",
    platform: "PC & Console",
    city: "Jakarta",
    storeUrl: "https://store.steampowered.com",
  },
  {
    studio: "Borobudur Digital Arts",
    game: "Echoes of the Archipelago",
    genre: "Adventure",
    platform: "PC (Steam)",
    city: "Semarang",
    storeUrl: "https://itch.io",
  },
  {
    studio: "Khatulistiwa Labs",
    game: "Warung Tycoon Simulator",
    genre: "Simulation",
    platform: "PC & Mobile",
    city: "Surabaya",
    storeUrl: "https://store.steampowered.com",
  },
  {
    studio: "Aksara Play Studio",
    game: "Tactical Nusantara",
    genre: "Strategy",
    platform: "PC (Steam)",
    city: "Malang",
    storeUrl: "https://itch.io",
  },
];

const OTHER_STARTUPS = [
  " Pendopo Interactive (Bandung)",
  "Merapi Game Works (Yogyakarta)",
  "Sriwijaya Interactive (Palembang)",
  "Dewata Pixel Studio (Denpasar)",
  "Celebes Game Lab (Makassar)",
  "Borneo Indie Collective (Balikpapan)",
  "Batavia Digital Entertainment (Jakarta)",
  "Arema Game Crafters (Malang)",
  "Pahlawan Cyber Studio (Surabaya)",
  "Cendrawasih Vision Games (Jayapura)",
  "Toba Lake Interactive (Medan)",
  "Parahyangan VR Lab (Bandung)",
];

export default function StartupsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-white">
      <Navbar />

      {/* 1. HERO SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1b202e] text-center relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-gradient-to-b from-[#E71C34]/20 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="max-w-4xl mx-auto">
          <span className="inline-block px-3 py-1 rounded bg-[#F3E000] text-black text-xs font-extrabold uppercase tracking-wider mb-4">
            30+ INCUBATED STUDIOS
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4">
            OUR INCUBATED{" "}
            <span className="text-[#E71C34]">GAME STARTUPS</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-2xl mx-auto mb-8">
            Daftar studio game lokal binaan Indigo Game yang telah melahirkan karya orisinal di platform PC, Mobile, Console, hingga VR/AR.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E71C34] hover:bg-[#D3182E] text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider shadow-lg shadow-[#E71C34]/25 transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#F3E000]" />
              Daftarkan Studio Anda
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#141721] hover:bg-[#1b202e] border border-[#252b3b] text-gray-200 text-xs sm:text-sm font-semibold transition-all"
            >
              <Mail className="w-4 h-4 text-[#F2A900]" />
              Reach Us for Partnership
            </Link>
          </div>
        </div>
      </section>

      {/* 2. FEATURED GAME STUDIOS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 border-b border-[#1b202e]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F2A900]">
              FEATURED PORTFOLIO
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
              FEATURED GAME STUDIOS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURED_STUDIOS.map((item) => (
              <div
                key={item.studio}
                className="bg-[#141721] border border-[#252b3b] rounded-2xl p-6 flex flex-col justify-between hover:border-[#E71C34]/60 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span className="px-2.5 py-1 rounded bg-[#E71C34]/20 border border-[#E71C34]/40 text-[#ff6b7d] text-[11px] font-bold">
                      {item.genre}
                    </span>
                    <span className="text-xs text-gray-400">{item.city}</span>
                  </div>

                  <h3 className="text-lg font-extrabold text-white mb-1">
                    {item.game}
                  </h3>
                  <p className="text-xs font-semibold text-[#F3E000] mb-3">
                    by {item.studio}
                  </p>
                  <p className="text-xs text-gray-400 mb-6">
                    Target Platform: <strong className="text-gray-200">{item.platform}</strong>
                  </p>
                </div>

                <a
                  href={item.storeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-lg bg-[#0b0c10] hover:bg-white/5 border border-[#252b3b] text-xs font-bold text-gray-200 transition-colors"
                >
                  <Gamepad2 className="w-4 h-4 text-[#E71C34]" />
                  Visit Store Page
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. OTHER INCUBATED STARTUPS */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0f121a]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E71C34]">
              ALUMNI NETWORK
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-white mt-1">
              OTHER INCUBATED GAME STARTUPS
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3.5">
            {OTHER_STARTUPS.map((name) => (
              <div
                key={name}
                className="bg-[#141721] border border-[#252b3b] rounded-xl px-4 py-3 text-xs font-semibold text-gray-300 flex items-center gap-2"
              >
                <span className="w-2 h-2 rounded-full bg-[#F3E000]" />
                {name}
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
