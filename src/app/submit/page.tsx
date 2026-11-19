import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MultiStepForm from "@/components/MultiStepForm";
import { Zap, Lock, ShieldCheck } from "lucide-react";

export default function SubmitGamePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-white">
      <Navbar />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[750px] h-[300px] bg-gradient-to-b from-[#E71C34]/20 via-[#700B1C]/10 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-4xl mx-auto text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#141721] border border-[#252b3b] text-xs font-bold text-[#F3E000] uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5 text-[#E71C34]" />
            First-Party Game Intake Portal
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Teams Form Registration Indigo Game Intake
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-2xl mx-auto">
            Formulir pendaftaran terintegrasi resmi Indigo Game Startup Incubation. Lengkapi 5 halaman di bawah ini dan unggah dokumen Pitch Deck PDF Anda.
          </p>

          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-4 text-[11px] text-gray-400 bg-[#141721] border border-[#252b3b] px-4 py-2 rounded-xl">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
              Tanpa Pihak Ketiga (Native Submission)
            </span>
            <span className="flex items-center gap-1.5">
              <Lock className="w-3.5 h-3.5 text-[#F2A900]" />
              Pitch Deck Privat (Hanya Diakses Tim Kurator &amp; Admin)
            </span>
          </div>
        </div>

        <MultiStepForm />
      </main>

      <Footer />
    </div>
  );
}
