"use client";

import Link from "next/link";
import { Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#252b3b] bg-[#000000] text-gray-400 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 className="w-5 h-5 text-[#E71C34]" />
              <span className="font-extrabold text-white text-base">
                indigo<span className="text-[#E71C34]">Game</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm mb-4">
              Indigo Game Startup Incubation adalah program inkubasi studio game di bawah naungan PT Telkom Indonesia untuk mendukung ekosistem kreator game lokal menembus pasar penerbitan global.
            </p>
            <p className="text-xs text-gray-500">
              Jakarta Digital Valley, Menara Multimedia Lt. 6, Jl. Kebon Sirih No. 12, Jakarta Pusat.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              INDIGO GAME
            </h4>
            <ul className="text-xs space-y-2.5 text-gray-400">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Indigo Game
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/startups" className="hover:text-white transition-colors">
                  Startups
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/submit" className="text-[#F3E000] font-semibold hover:underline">
                  Submit your game
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">
              INDIGO ECOSYSTEM
            </h4>
            <ul className="text-xs space-y-2.5 text-gray-400">
              <li>
                <a href="https://indigo.id" target="_blank" rel="noreferrer" className="hover:text-white">
                  Indigo.id
                </a>
              </li>
              <li>Pre-startup &amp; Incubation</li>
              <li>Acceleration Program</li>
              <li>
                Email:{" "}
                <a href="mailto:game@indigo.id" className="text-[#E71C34] hover:underline">
                  game@indigo.id
                </a>{" "}
                /{" "}
                <a href="mailto:pnd@indigo.id" className="text-[#E71C34] hover:underline">
                  pnd@indigo.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1b202e] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© 2026 Indigo Game – PT. Telkom Indonesia. All Rights Reserved.</p>
          <p>First-Party Intake System (Final Project VINIX7)</p>
        </div>
      </div>
    </footer>
  );
}
