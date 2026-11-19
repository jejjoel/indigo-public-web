"use client";

import { Gamepad2 } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t border-[#252b3b] bg-[#08090c] text-gray-400 py-10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Gamepad2 className="w-5 h-5 text-[#E71C34]" />
              <span className="font-extrabold text-white text-base">
                indigo<span className="text-[#E71C34]">Game</span>
              </span>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
              Program inkubasi startup game terdepan dari PT Telkom Indonesia untuk mendorong Indonesia menjadi produsen game berkelas dunia.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">
              Kriteria Utama
            </h4>
            <ul className="text-xs space-y-2 text-gray-400">
              <li>• Director / Tim Leader merupakan WNI</li>
              <li>• Memiliki tim Game Art, Programming, & Designer</li>
              <li>• Memiliki Playable Build / Vertical Slice</li>
              <li>• Pitch Deck sesuai format resmi</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-gray-200 uppercase tracking-wider mb-3">
              Kontak Program
            </h4>
            <p className="text-xs text-gray-400 leading-relaxed mb-2">
              Jakarta Digital Valley / Indigo Telkom
            </p>
            <p className="text-xs text-gray-300">
              Email: <span className="text-[#E71C34]">pnd@indigo.id</span>
            </p>
            <p className="text-xs text-gray-300">
              Web Resmi: <a href="https://game.indigo.id" target="_blank" rel="noreferrer" className="underline hover:text-white">game.indigo.id</a>
            </p>
          </div>
        </div>

        <div className="pt-6 border-t border-[#1b202e] flex flex-col sm:flex-row items-center justify-between text-xs text-gray-500 gap-3">
          <p>© 2026 Indigo Game — PT Telkom Indonesia (Revamp Form Project MSIB Mandiri VINIX7).</p>
          <p className="flex items-center gap-1">
            Built with Next.js & Tailwind CSS for Final Project
          </p>
        </div>
      </div>
    </footer>
  );
}
