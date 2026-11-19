"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  Mail,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    if (!fullName.trim() || !email.trim() || !message.trim()) {
      setErrorMsg("Harap isi Full Name, Email, dan Message.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fullName, email, message }),
      });
      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Gagal mengirim pesan.");
      }
      setSent(true);
      setFullName("");
      setEmail("");
      setMessage("");
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0c10] text-white">
      <Navbar />

      <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="inline-block px-3 py-1 rounded bg-[#F3E000] text-black text-xs font-extrabold uppercase tracking-wider mb-3">
              GET IN TOUCH
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              CONTACT <span className="text-[#E71C34]">INDIGO GAME</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-400 mt-2 max-w-xl mx-auto">
              Punya pertanyaan seputar kemitraan publisher, kolaborasi event, atau program inkubasi? Kirimkan pesan Anda di bawah ini.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {/* Info Column */}
            <div className="md:col-span-2 space-y-5">
              <div className="bg-[#141721] border border-[#252b3b] rounded-2xl p-6">
                <h3 className="text-sm font-bold text-[#F3E000] uppercase tracking-wider mb-3">
                  Ingin Mendaftarkan Game Anda?
                </h3>
                <p className="text-xs text-gray-300 leading-relaxed mb-4">
                  Untuk pendaftaran seleksi studio game (*Intake Program*), silakan langsung mengisi formulir resmi 5 tahap kami:
                </p>
                <Link
                  href="/submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#E71C34] hover:bg-[#D3182E] text-white text-xs font-bold transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#F3E000]" />
                  Buka Formulir Intake (/submit)
                </Link>
              </div>

              <div className="bg-[#141721] border border-[#252b3b] rounded-2xl p-6 space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#E71C34] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">
                      Alamat Kantor
                    </h4>
                    <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                      Jakarta Digital Valley, Menara Multimedia Lt. 6, Jl. Kebon Sirih No. 12, Jakarta Pusat.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-[#E71C34] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase">
                      Email Resmi
                    </h4>
                    <p className="text-xs text-gray-400 mt-1">
                      pnd@indigo.id / game@indigo.id
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Column */}
            <div className="md:col-span-3">
              <div className="bg-[#141721] border border-[#252b3b] rounded-2xl p-6 sm:p-8">
                <h2 className="text-lg font-bold text-white mb-1">
                  Kirim Pesan Kolaborasi Umum
                </h2>
                <p className="text-xs text-gray-400 mb-6">
                  Pesan Anda akan langsung masuk ke Kotak Masuk internal tim manajemen Indigo Game.
                </p>

                {sent ? (
                  <div className="p-6 rounded-xl bg-[#0b0c10] border border-green-800/60 text-center">
                    <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto mb-3" />
                    <h3 className="text-base font-bold text-white mb-1">
                      Pesan Berhasil Terkirim!
                    </h3>
                    <p className="text-xs text-gray-400 mb-4">
                      Terima kasih telah menghubungi Indigo Game. Tim kami akan segera meninjau pesan Anda.
                    </p>
                    <button
                      type="button"
                      onClick={() => setSent(false)}
                      className="px-4 py-2 rounded-lg bg-[#E71C34] text-white text-xs font-bold"
                    >
                      Kirim Pesan Lain
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {errorMsg && (
                      <div className="p-3 rounded-lg bg-red-950/60 border border-red-800 text-red-200 text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Full Name <span className="text-[#E71C34]">*</span>
                      </label>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Nama lengkap Anda"
                        className="w-full bg-[#0b0c10] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Email <span className="text-[#E71C34]">*</span>
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="nama@perusahaan.com"
                        className="w-full bg-[#0b0c10] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-300 mb-1.5">
                        Message <span className="text-[#E71C34]">*</span>
                      </label>
                      <textarea
                        rows={4}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tuliskan pesan atau pertanyaan Anda..."
                        className="w-full bg-[#0b0c10] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34]"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-[#E71C34] hover:bg-[#D3182E] text-white text-xs sm:text-sm font-bold shadow-lg shadow-[#E71C34]/25 transition-all disabled:opacity-50"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Mengirim...
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
