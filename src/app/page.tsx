import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MultiStepForm from "@/components/MultiStepForm";
import {
  Gamepad2,
  DollarSign,
  Users,
  Award,
  Sparkles,
  Zap,
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-white">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-[#1b202e]">
        {/* Background gradient effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-gradient-to-b from-[#E71C34]/20 via-[#700B1C]/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1b202e] border border-[#2d3748] text-xs font-semibold text-gray-300 mb-6 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-[#E71C34] animate-pulse" />
            <span>Indigo Game Intake Program — Revamped System</span>
            <span className="px-1.5 py-0.2 rounded bg-[#F3E000] text-black font-extrabold text-[10px]">
              2026
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight max-w-4xl mx-auto leading-tight sm:leading-none mb-6">
            Pendaftaran Resmi <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#E71C34] via-[#ff4a60] to-[#F2A900]">
              Indigo Game Startup Incubation
            </span>
          </h1>

          <p className="text-sm sm:text-base text-gray-400 max-w-2xl mx-auto mb-8 leading-relaxed">
            Kini terintegrasi langsung di dalam sistem — tanpa formulir pihak ketiga. Daftarkan studio game Anda, lampirkan pitch deck &amp; prototipe vertikal, dan raih akses pendanaan serta mentoring industri.
          </p>

          {/* CTA Buttons (Public Only — Zero Public Admin Footprint) */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-14">
            <a
              href="#form-section"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-[#E71C34] hover:bg-[#D3182E] text-white text-sm font-bold shadow-xl shadow-[#E71C34]/30 transition-all hover:-translate-y-0.5"
            >
              <Sparkles className="w-4 h-4 text-[#F3E000]" />
              Mulai Isi Formulir Sekarang
            </a>
          </div>

          {/* Key Value Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-4xl mx-auto text-left">
            <div className="p-4 rounded-xl bg-[#141721] border border-[#252b3b] hover:border-[#E71C34]/40 transition-colors">
              <DollarSign className="w-6 h-6 text-[#F2A900] mb-2" />
              <h3 className="text-xs font-bold text-white mb-1">Development Fund</h3>
              <p className="text-[11px] text-gray-400 leading-tight">
                Dukungan dana segar untuk memitigasi risiko produksi studio game.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141721] border border-[#252b3b] hover:border-[#E71C34]/40 transition-colors">
              <Users className="w-6 h-6 text-[#E71C34] mb-2" />
              <h3 className="text-xs font-bold text-white mb-1">Expert Mentors</h3>
              <p className="text-[11px] text-gray-400 leading-tight">
                Mentoring langsung dari pakar industri game terkemuka di Indonesia.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141721] border border-[#252b3b] hover:border-[#E71C34]/40 transition-colors">
              <Award className="w-6 h-6 text-[#F2A900] mb-2" />
              <h3 className="text-xs font-bold text-white mb-1">Publishing Deals</h3>
              <p className="text-[11px] text-gray-400 leading-tight">
                Jembatan langsung ke penerbit game global dan ajang pameran kelas dunia.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[#141721] border border-[#252b3b] hover:border-[#E71C34]/40 transition-colors">
              <Gamepad2 className="w-6 h-6 text-[#E71C34] mb-2" />
              <h3 className="text-xs font-bold text-white mb-1">Hardware Support</h3>
              <p className="text-[11px] text-gray-400 leading-tight">
                Fasilitas perangkat gaming PC spesifikasi tinggi selama inkubasi.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* STATS STRIP */}
      <section className="bg-gradient-to-r from-[#700B1C] via-[#960F22] to-[#BC1428] py-8 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-2xl sm:text-4xl font-extrabold text-[#F3E000]">30+</p>
              <p className="text-xs text-red-100 uppercase tracking-wider font-semibold mt-1">
                Startups Incubated
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-extrabold text-[#F3E000]">US$600K+</p>
              <p className="text-xs text-red-100 uppercase tracking-wider font-semibold mt-1">
                Funding Delivered
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-extrabold text-[#F3E000]">9</p>
              <p className="text-xs text-red-100 uppercase tracking-wider font-semibold mt-1">
                Publisher Deals
              </p>
            </div>
            <div>
              <p className="text-2xl sm:text-4xl font-extrabold text-[#F3E000]">10+</p>
              <p className="text-xs text-red-100 uppercase tracking-wider font-semibold mt-1">
                Global Events
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORM SECTION */}
      <section id="form-section" className="py-16 px-4 sm:px-6 lg:px-8 relative">
        <div className="max-w-4xl mx-auto text-center mb-8">
          <span className="text-xs font-bold text-[#E71C34] uppercase tracking-wider flex items-center justify-center gap-1.5 mb-2">
            <Zap className="w-4 h-4 text-[#F3E000]" />
            Formulir Pendaftaran Langsung
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Isi Formulir Intake Game Startup
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            Selesaikan 5 langkah pengisian di bawah. Seluruh isian tervalidasi dan langsung tersimpan di basis data terpusat.
          </p>
        </div>

        {/* The MultiStepForm Component */}
        <MultiStepForm />
      </section>

      <Footer />
    </div>
  );
}
