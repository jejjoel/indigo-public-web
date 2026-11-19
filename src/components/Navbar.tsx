"use client";

import Link from "next/link";
import { Gamepad2, Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#0b0c10]/90 backdrop-blur-md border-b border-[#252b3b]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#E71C34] to-[#700B1C] flex items-center justify-center text-white shadow-lg shadow-[#E71C34]/20 group-hover:scale-105 transition-transform">
            <Gamepad2 className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-lg tracking-wider text-white">
                indigo<span className="text-[#E71C34]">Game</span>
              </span>
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-[#F3E000] text-black">
                Intake
              </span>
            </div>
            <p className="text-[10px] text-gray-400 -mt-1 hidden sm:block">
              Telkom Indonesia Incubation
            </p>
          </div>
        </Link>

        {/* Navigation links (Public Only — Zero Admin Footprint) */}
        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="/"
            className="text-xs sm:text-sm font-medium text-gray-300 hover:text-white px-2 sm:px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors"
          >
            Beranda
          </Link>
          <a
            href="/#form-section"
            className="text-xs sm:text-sm font-medium text-gray-300 hover:text-white px-2 sm:px-3 py-1.5 rounded-md hover:bg-white/5 transition-colors"
          >
            Formulir Intake
          </a>
          <a
            href="/#form-section"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold bg-[#E71C34] hover:bg-[#D3182E] text-white px-3.5 py-1.5 rounded-md transition-colors shadow-md shadow-[#E71C34]/25"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F3E000]" />
            Submit Your Game
          </a>
        </nav>
      </div>
    </header>
  );
}
