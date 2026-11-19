"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Gamepad2, Sparkles } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Startups", href: "/startups" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();

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

        {/* Navigation links (Sesuai Blueprint: /, /about, /startups, /contact, /submit) */}
        <nav className="flex items-center gap-1 sm:gap-3">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`text-xs sm:text-sm font-medium px-2.5 sm:px-3 py-1.5 rounded-md transition-colors ${
                  isActive
                    ? "text-white bg-white/10 font-bold"
                    : "text-gray-300 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="/submit"
            className="ml-1 inline-flex items-center gap-1.5 text-xs sm:text-sm font-extrabold bg-[#F3E000] hover:bg-[#F2A900] text-black px-3.5 py-1.5 rounded-md transition-all shadow-md shadow-[#F3E000]/20"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#E71C34]" />
            Submit your game
          </Link>
        </nav>
      </div>
    </header>
  );
}
