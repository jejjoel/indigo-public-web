"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Upload,
  FileText,
  ShieldCheck,
  User,
  Gamepad,
  Link as LinkIcon,
  Send,
  Loader2,
  Copy,
  Lock,
  RotateCcw,
  X,
} from "lucide-react";
import { PublicSubmissionReceipt } from "@/types/submission";

const STEPS = [
  { id: 1, title: "Halaman 1", subtitle: "Kriteria Intake" },
  { id: 2, title: "Halaman 2", subtitle: "Game Director" },
  { id: 3, title: "Halaman 3", subtitle: "Startup Details" },
  { id: 4, title: "Halaman 4", subtitle: "Documents" },
  { id: 5, title: "Halaman 5", subtitle: "Preference" },
];

const GENRES = [
  "Action",
  "Adventure",
  "Role-playing (RPG)",
  "Simulation",
  "Strategy",
  "Puzzle",
  "Racing",
  "Indie",
  "Casual",
  "Sports",
  "Yang lain",
];

const PLATFORMS = [
  "PC (Personal Computer)",
  "Mobile (Smartphone & Tablet)",
  "Console (Sony PlayStation, Xbox Series, Nintendo Switch)",
  "VR/AR (Virtual Reality/Augmented Reality)",
];

const REFERRAL_OPTIONS = [
  "Website Indigo",
  "Social Media (Facebook, Instagram, LinkedIn, lainnya)",
  "Search Engine (Google, Bing, lainnya)",
  "Website Lainnya (Artikel, Blog, Berita)",
  "Teman, kerabat, keluarga (Word of Mouth)",
  "Forum, Seminar, Webinar",
  "Yang lain",
];

const INITIAL_FORM_STATE = {
  // Halaman 1 dari 5
  agreedToTerms: false,

  // Halaman 2 dari 5: Komposisi tim & Game Director (Leader)
  leaderName: "",
  leaderRole: "",
  leaderLinkedin: "",
  leaderCommitment: "Full Time" as "Full Time" | "Part Time",
  leaderEmail: "",
  leaderWhatsapp: "",
  captable: ">= 65%" as ">= 65%" | "< 65%",

  // Halaman 3 dari 5: Game Startup Details
  startupName: "",
  dateFormed: "",
  location: "",
  targetPlatform: "PC (Personal Computer)",
  startupWebsite: "",
  gameGenre: "Action",
  customGenre: "",
  companyStatus: "PT" as "PT" | "CV" | "Belum terdaftar",
  inCommunity: "Tidak" as "Ya" | "Tidak",
  communityName: "",
  otherPrograms: "-",

  // Halaman 4 dari 5: Game Startup Documents
  teaserVideoUrl: "",
  gameDemoUrl: "",

  // Halaman 5 dari 5: Preference & Konfirmasi Akhir
  referralSource: "Website Indigo",
  customReferral: "",
  confirmFinalSubmit: false,
};

const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^(?:\+62|62|0)[0-9]{8,13}$/;
const LINKEDIN_REGEX = /^https?:\/\/([a-z]{2,3}\.)?linkedin\.com\/.+/i;

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [submittedReceipt, setSubmittedReceipt] =
    useState<PublicSubmissionReceipt | null>(null);
  const [copiedId, setCopiedId] = useState(false);

  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [pitchdeckFile, setPitchdeckFile] = useState<File | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const formTopRef = useRef<HTMLDivElement | null>(null);

  // 1. Otomatis scroll ke paling atas form setiap kali berpindah langkah (Next / Prev / Submit Success)
  useEffect(() => {
    if (formTopRef.current) {
      const yOffset = -90; // Memberi ruang untuk sticky navbar
      const y =
        formTopRef.current.getBoundingClientRect().top +
        window.pageYOffset +
        yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [currentStep, submittedReceipt]);

  // 3. Fungsi untuk otomatis scroll & fokus langsung ke field pertama yang salah / belum terisi
  const scrollToInvalidField = (fieldName: string) => {
    setTimeout(() => {
      const container = document.querySelector(
        `[data-field="${fieldName}"]`
      ) as HTMLElement | null;
      if (container) {
        container.scrollIntoView({ behavior: "smooth", block: "center" });
        const input = container.querySelector(
          "input, textarea, select"
        ) as HTMLElement | null;
        if (input && input.getAttribute("type") !== "file") {
          input.focus({ preventScroll: true });
        }
      }
    }, 50);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: target.checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setErrorMsg(null);
    if (fieldErrors[name]) {
      setFieldErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      const msg = "Upload 1 file yang didukung: PDF. Hanya dokumen .pdf yang diterima.";
      setErrorMsg(msg);
      setFieldErrors({ pitchdeckFile: msg });
      scrollToInvalidField("pitchdeckFile");
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      const msg = "Ukuran file maksimal adalah 100 MB.";
      setErrorMsg(msg);
      setFieldErrors({ pitchdeckFile: msg });
      scrollToInvalidField("pitchdeckFile");
      return;
    }

    setPitchdeckFile(file);
    setErrorMsg(null);
    setFieldErrors((prev) => {
      const copy = { ...prev };
      delete copy.pitchdeckFile;
      return copy;
    });
  };

  const removeSelectedFile = () => {
    setPitchdeckFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleResetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    removeSelectedFile();
    setErrorMsg(null);
    setFieldErrors({});
    setCurrentStep(1);
  };

  const validateStep = (step: number): boolean => {
    setErrorMsg(null);
    const errors: Record<string, string> = {};
    let firstInvalidField: string | null = null;

    const addError = (field: string, message: string) => {
      if (!errors[field]) {
        errors[field] = message;
      }
      if (!firstInvalidField) {
        firstInvalidField = field;
      }
    };

    if (step === 1) {
      if (!formData.agreedToTerms) {
        addError(
          "agreedToTerms",
          "Anda wajib mencentang persetujuan kriteria Game Startup untuk melanjutkan."
        );
      }
    } else if (step === 2) {
      if (!formData.leaderName.trim()) {
        addError("leaderName", "Nama Lengkap Game Director (Leader) wajib diisi.");
      }
      if (!formData.leaderRole.trim()) {
        addError("leaderRole", "Role wajib diisi (Contoh: Game Director / Game Programming).");
      }
      if (!formData.leaderLinkedin.trim()) {
        addError("leaderLinkedin", "LinkedIn Game Director (Leader) wajib diisi.");
      } else if (!LINKEDIN_REGEX.test(formData.leaderLinkedin.trim())) {
        addError(
          "leaderLinkedin",
          "Format link LinkedIn tidak valid. Gunakan format seperti https://linkedin.com/in/username"
        );
      }
      if (!formData.leaderEmail.trim()) {
        addError("leaderEmail", "Email Game Director (Leader) wajib diisi.");
      } else if (!EMAIL_REGEX.test(formData.leaderEmail.trim())) {
        addError(
          "leaderEmail",
          "Format email tidak valid. Contoh format yang benar: nama@studio.com"
        );
      }
      const cleanPhone = formData.leaderWhatsapp.replace(/[\s-]/g, "");
      if (!cleanPhone) {
        addError("leaderWhatsapp", "No Whatsapp Game Director (Leader) wajib diisi.");
      } else if (!PHONE_REGEX.test(cleanPhone)) {
        addError(
          "leaderWhatsapp",
          "Format nomor WhatsApp tidak valid. Gunakan angka diawali 08... atau +628... (10-15 digit)."
        );
      }
    } else if (step === 3) {
      if (!formData.startupName.trim()) {
        addError("startupName", "Nama Team Game Startup wajib diisi.");
      }
      if (!formData.dateFormed) {
        addError("dateFormed", "Tanggal pembentukan Team Game Startup wajib diisi.");
      }
      if (!formData.location.trim()) {
        addError("location", "Lokasi Team Game Startup wajib diisi.");
      }
      if (!formData.startupWebsite.trim()) {
        addError(
          "startupWebsite",
          "Website Game Startup (Website / itch.io page / Steam page) wajib diisi."
        );
      }
      if (formData.gameGenre === "Yang lain" && !formData.customGenre.trim()) {
        addError("gameGenre", "Harap tuliskan genre game Anda pada kolom 'Yang lain'.");
      }
      if (formData.inCommunity === "Ya" && !formData.communityName.trim()) {
        addError(
          "communityName",
          "Karena Anda memilih 'Ya', sebutkan nama komunitas game developer yang diikuti."
        );
      }
      if (!formData.otherPrograms.trim()) {
        addError(
          "otherPrograms",
          "Pertanyaan program lain wajib diisi. Apabila tidak pernah, isi dengan '-'."
        );
      }
    } else if (step === 4) {
      if (!pitchdeckFile) {
        addError(
          "pitchdeckFile",
          "Pitchdeck Startup (file PDF, maks 100 MB) wajib diunggah sebelum melanjutkan."
        );
      }
    } else if (step === 5) {
      if (
        formData.referralSource === "Yang lain" &&
        !formData.customReferral.trim()
      ) {
        addError(
          "referralSource",
          "Harap tuliskan sumber informasi pada kolom 'Yang lain'."
        );
      }
      if (!formData.confirmFinalSubmit) {
        addError(
          "confirmFinalSubmit",
          "Harap centang konfirmasi akhir bahwa seluruh data pendaftaran Anda sudah benar sebelum mengirim."
        );
      }
    }

    setFieldErrors(errors);

    if (firstInvalidField) {
      setErrorMsg(errors[firstInvalidField]);
      scrollToInvalidField(firstInvalidField);
      return false;
    }

    return true;
  };

  // 2. Mencegah event click tombol "Berikutnya" di Step 4 ikut men-trigger tombol "Kirim" di Step 5
  const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const prevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setErrorMsg(null);
    setFieldErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Hanya boleh submit jika sedang berada di Halaman 5 dan lolos validasi konfirmasi akhir
    if (currentStep !== 5) return;
    if (!validateStep(5) || !pitchdeckFile) return;

    setLoading(true);
    setErrorMsg(null);

    const resolvedGenre =
      formData.gameGenre === "Yang lain" && formData.customGenre.trim()
        ? formData.customGenre.trim()
        : formData.gameGenre;

    const resolvedReferral =
      formData.referralSource === "Yang lain" && formData.customReferral.trim()
        ? formData.customReferral.trim()
        : formData.referralSource;

    try {
      const body = new FormData();
      body.append("agreedToTerms", String(formData.agreedToTerms));
      body.append("leaderName", formData.leaderName);
      body.append("leaderRole", formData.leaderRole);
      body.append("leaderLinkedin", formData.leaderLinkedin);
      body.append("leaderCommitment", formData.leaderCommitment);
      body.append("leaderEmail", formData.leaderEmail);
      body.append("leaderWhatsapp", formData.leaderWhatsapp);
      body.append("captable", formData.captable);
      body.append("startupName", formData.startupName);
      body.append("dateFormed", formData.dateFormed);
      body.append("location", formData.location);
      body.append("targetPlatform", formData.targetPlatform);
      body.append("startupWebsite", formData.startupWebsite);
      body.append("gameGenre", resolvedGenre);
      body.append("companyStatus", formData.companyStatus);
      body.append("inCommunity", formData.inCommunity);
      body.append("communityName", formData.communityName);
      body.append("otherPrograms", formData.otherPrograms);
      body.append("teaserVideoUrl", formData.teaserVideoUrl);
      body.append("gameDemoUrl", formData.gameDemoUrl);
      body.append("referralSource", resolvedReferral);
      body.append("pitchdeckFile", pitchdeckFile);

      const res = await fetch("/api/submissions", {
        method: "POST",
        body,
      });

      const result = await res.json();
      if (!res.ok || !result.success) {
        throw new Error(result.error || "Gagal mengirimkan formulir.");
      }

      setSubmittedReceipt(result.data);
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Terjadi kesalahan sistem.";
      setErrorMsg(msg);
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const fieldCardClass = (fieldName: string) =>
    `bg-[#0b0c10] border rounded-xl p-4 transition-all ${
      fieldErrors[fieldName]
        ? "border-[#E71C34] ring-2 ring-[#E71C34]/30"
        : "border-[#252b3b]"
    }`;

  const renderFieldError = (fieldName: string) =>
    fieldErrors[fieldName] ? (
      <p className="mt-2 text-xs text-red-400 flex items-center gap-1.5 font-medium">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        <span>{fieldErrors[fieldName]}</span>
      </p>
    ) : null;

  // SUCCESS VIEW
  if (submittedReceipt) {
    return (
      <div
        ref={formTopRef}
        className="bg-[#141721] border border-[#252b3b] rounded-2xl p-6 sm:p-10 shadow-2xl text-center max-w-2xl mx-auto"
      >
        <div className="w-16 h-16 bg-[#E71C34]/20 border border-[#E71C34] rounded-full flex items-center justify-center mx-auto mb-6 text-[#E71C34]">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#F3E000] text-black mb-3">
          Pendaftaran Berhasil Terkirim
        </span>

        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
          Terima Kasih! Formulir Anda Telah Diterima
        </h2>
        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
          Data pendaftaran <strong className="text-white">{submittedReceipt.startupName}</strong> untuk{" "}
          <strong className="text-white">Indigo Game Intake Program</strong> telah tersimpan aman di sistem kami.
        </p>

        {/* Reference Box */}
        <div className="bg-[#0b0c10] border border-[#252b3b] rounded-xl p-5 mb-6 text-left">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-400 font-semibold uppercase">
              Nomor Tiket / Kode Registrasi
            </span>
            <button
              type="button"
              onClick={() => copyToClipboard(submittedReceipt.registrationCode)}
              className="flex items-center gap-1 text-xs text-[#F2A900] hover:underline"
            >
              <Copy className="w-3.5 h-3.5" />
              {copiedId ? "Tersalin!" : "Salin Kode"}
            </button>
          </div>
          <div className="font-mono text-lg font-extrabold text-[#F3E000] bg-[#141721] p-3 rounded-lg border border-[#252b3b] select-all tracking-wider">
            {submittedReceipt.registrationCode}
          </div>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
            <div>
              <span className="text-gray-500">Nama Team Startup:</span>{" "}
              <span className="text-gray-200 font-semibold">
                {submittedReceipt.startupName}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Game Director (Leader):</span>{" "}
              <span className="text-gray-200 font-semibold">
                {submittedReceipt.leaderName}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Genre Game:</span>{" "}
              <span className="text-gray-200 font-semibold">
                {submittedReceipt.gameGenre}
              </span>
            </div>
            <div>
              <span className="text-gray-500">Target Platform:</span>{" "}
              <span className="text-gray-200 font-semibold">
                {submittedReceipt.targetPlatform.split(" ")[0]}
              </span>
            </div>
          </div>

          {/* Pitch Deck Security Notice */}
          <div className="mt-4 pt-3 border-t border-[#252b3b] flex items-center gap-2 text-xs text-amber-400">
            <Lock className="w-4 h-4 shrink-0" />
            <span>
              Dokumen Pitch Deck (<strong>{submittedReceipt.pitchdeckFileName}</strong>) telah dikunci di penyimpanan privat dan <strong>hanya dapat dilihat oleh Tim Admin &amp; Kurator Indigo Game</strong>.
            </span>
          </div>
        </div>

        <div className="flex justify-center">
          <button
            type="button"
            onClick={() => {
              setSubmittedReceipt(null);
              handleResetForm();
            }}
            className="inline-flex items-center justify-center px-6 py-2.5 rounded-lg bg-[#E71C34] hover:bg-[#D3182E] text-white text-sm font-semibold transition-all shadow-lg shadow-[#E71C34]/25"
          >
            Kirim tanggapan lain
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={formTopRef}
      className="bg-[#141721] border border-[#252b3b] rounded-2xl shadow-2xl overflow-hidden max-w-4xl mx-auto"
    >
      {/* Top Banner Header (Sesuai Judul Resmi Form) */}
      <div className="bg-gradient-to-r from-[#700B1C] via-[#BC1428] to-[#E71C34] p-6 text-white">
        <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase tracking-wider bg-[#F3E000] text-black">
              Official Intake Form
            </span>
            <span className="text-xs text-red-100">
              First-Party Submission System
            </span>
          </div>
          <span className="text-xs font-semibold bg-black/30 px-2.5 py-1 rounded-full">
            Halaman {currentStep} dari 5
          </span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
          Teams Form Registration Indigo Game Intake Program
        </h2>
        <p className="text-xs text-red-100 mt-1">
          * Menunjukkan pertanyaan yang wajib diisi
        </p>
      </div>

      {/* Step Indicator Bar */}
      <div className="bg-[#0d0f17] border-b border-[#252b3b] px-4 py-4 overflow-x-auto">
        <div className="flex items-center justify-between min-w-[580px]">
          {STEPS.map((s, idx) => {
            const isActive = s.id === currentStep;
            const isCompleted = s.id < currentStep;

            return (
              <React.Fragment key={s.id}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isActive
                        ? "bg-[#E71C34] text-white ring-4 ring-[#E71C34]/20 scale-105"
                        : isCompleted
                        ? "bg-[#F2A900] text-black font-extrabold"
                        : "bg-[#1f2433] text-gray-400"
                    }`}
                  >
                    {isCompleted ? "✓" : s.id}
                  </div>
                  <div>
                    <p
                      className={`text-xs font-bold leading-none ${
                        isActive
                          ? "text-white"
                          : isCompleted
                          ? "text-gray-200"
                          : "text-gray-400"
                      }`}
                    >
                      {s.title}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-0.5">
                      {s.subtitle}
                    </p>
                  </div>
                </div>

                {idx < STEPS.length - 1 && (
                  <div
                    className={`flex-1 h-0.5 mx-3 transition-colors ${
                      s.id < currentStep ? "bg-[#F2A900]" : "bg-[#252b3b]"
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Form Content */}
      <form onSubmit={handleSubmit} noValidate className="p-6 sm:p-8">
        {/* ===================================================================
            HALAMAN 1 DARI 5: KRITERIA & KETENTUAN INTAKE
           =================================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="bg-[#0b0c10] border border-[#252b3b] rounded-xl p-5">
              <div className="flex items-center gap-2 text-[#F2A900] mb-3">
                <ShieldCheck className="w-5 h-5" />
                <h3 className="font-bold text-base text-white">
                  Kriteria Game Startup untuk mengikuti program Indigo Game Intake
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-gray-300 leading-relaxed mb-4">
                Indigo Game Intake adalah kegiatan rekrutmen dan seleksi game startup digital untuk masuk ke program Indigo Game.
              </p>

              <ul className="space-y-2.5 text-xs sm:text-sm text-gray-200 bg-[#141721] p-4 rounded-lg border border-[#252b3b] list-disc list-inside">
                <li>Director atau Leader merupakan WNI</li>
                <li>
                  Tim minimal mempunyai Game Art, Game Programming, dan Game Designer
                </li>
                <li>
                  Game Startup maupun member tim yang masih mengikuti program Inkubasi di Indigo tidak diperbolehkan ikut
                </li>
                <li>
                  Program ini tidak diperuntukkan bagi karyawan Telkom Group
                </li>
                <li>
                  Pitchdeck yang dikirimkan menggunakan referensi{" "}
                  <a
                    href="https://game.indigo.id"
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#F3E000] underline hover:text-[#F2A900]"
                  >
                    template
                  </a>{" "}
                  dari Indigo Game
                </li>
                <li>
                  Jika Anda tidak memiliki tim dan ingin mendaftar sebagai individu, silakan hubungi tim penyelenggara program Indigo Game Intake.
                </li>
              </ul>

              <div className="mt-4 p-3.5 rounded-lg bg-[#141721] border border-[#252b3b] text-xs text-gray-300 space-y-2">
                <p>
                  <strong className="text-[#F2A900]">Catatan:</strong> Kami lebih memilih pendaftar tim daripada perorangan. Pendaftar perorangan akan ditambahkan ke pendaftar tim dalam prosesnya nanti sebagai anggota tambahan.
                </p>
                <p>
                  Jika memiliki pertanyaan silakan mengirimkan email ke :{" "}
                  <a
                    href="mailto:pnd@indigo.id"
                    className="text-[#E71C34] font-semibold hover:underline"
                  >
                    pnd@indigo.id
                  </a>
                </p>
              </div>
            </div>

            <div
              data-field="agreedToTerms"
              className={fieldCardClass("agreedToTerms")}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded text-[#E71C34] bg-gray-900 border-gray-700 focus:ring-[#E71C34]"
                />
                <span className="text-xs sm:text-sm text-gray-200">
                  Saya dan tim telah membaca serta memenuhi seluruh kriteria Game Startup untuk mengikuti program Indigo Game Intake di atas.{" "}
                  <span className="text-[#E71C34] font-bold">*</span>
                </span>
              </label>
              {renderFieldError("agreedToTerms")}
            </div>
          </div>
        )}

        {/* ===================================================================
            HALAMAN 2 DARI 5: PROFIL GAME DIRECTOR (LEADER)
           =================================================================== */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div className="bg-[#E71C34] text-white px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2">
              <User className="w-4 h-4 shrink-0" />
              <span>
                Komposisi tim minimal mempunyai Game Art, Game Programming, dan Game Designer
              </span>
            </div>

            {/* 1. Nama Lengkap Game Director (Leader) */}
            <div
              data-field="leaderName"
              className={fieldCardClass("leaderName")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">
                Nama Lengkap Game Director (Leader){" "}
                <span className="text-[#E71C34]">*</span>
              </label>
              <input
                type="text"
                name="leaderName"
                value={formData.leaderName}
                onChange={handleChange}
                placeholder="Jawaban Anda"
                className="w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
              />
              {renderFieldError("leaderName")}
            </div>

            {/* 2. Role */}
            <div
              data-field="leaderRole"
              className={fieldCardClass("leaderRole")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-0.5">
                Role <span className="text-[#E71C34]">*</span>
              </label>
              <p className="text-[11px] text-gray-400 mb-2.5">
                Contoh: Game Director / Game Programming
              </p>
              <input
                type="text"
                name="leaderRole"
                value={formData.leaderRole}
                onChange={handleChange}
                placeholder="Jawaban Anda"
                className="w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
              />
              {renderFieldError("leaderRole")}
            </div>

            {/* 3. LinkedIn Game Director (Leader) */}
            <div
              data-field="leaderLinkedin"
              className={fieldCardClass("leaderLinkedin")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-0.5">
                LinkedIn Game Director (Leader){" "}
                <span className="text-[#E71C34]">*</span>
              </label>
              <p className="text-[11px] text-gray-400 mb-2.5">
                Contoh: https://linkedin.com/in/example/
              </p>
              <input
                type="url"
                name="leaderLinkedin"
                value={formData.leaderLinkedin}
                onChange={handleChange}
                placeholder="https://linkedin.com/in/..."
                className="w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
              />
              {renderFieldError("leaderLinkedin")}
            </div>

            {/* 4. Comitment Game Director (Leader) */}
            <div className="bg-[#0b0c10] border border-[#252b3b] rounded-xl p-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1.5">
                Comitment Game Director (Leader){" "}
                <span className="text-[#E71C34]">*</span>
              </label>
              <p className="text-xs text-gray-400 mb-2 leading-relaxed">
                Full Time adalah komitmen untuk menyediakan waktu secara full hanya untuk menyelesaikan project ini bila nanti lolos seleksi.
              </p>
              <p className="text-xs text-gray-400 mb-3.5 leading-relaxed">
                Sementara Part Time berarti selain mengerjakan proyek ini masih sambil paralel mengerjakan project-project yang lainnya. Ini menjadi pertimbangan penting dan dominan dalam pemilihan startup.
              </p>
              <div className="space-y-2.5">
                {(["Part Time", "Full Time"] as const).map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-gray-200"
                  >
                    <input
                      type="radio"
                      name="leaderCommitment"
                      value={opt}
                      checked={formData.leaderCommitment === opt}
                      onChange={handleChange}
                      className="text-[#E71C34] focus:ring-[#E71C34]"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Email Game Director (Leader) */}
            <div
              data-field="leaderEmail"
              className={fieldCardClass("leaderEmail")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">
                Email Game Director (Leader){" "}
                <span className="text-[#E71C34]">*</span>
              </label>
              <input
                type="email"
                name="leaderEmail"
                value={formData.leaderEmail}
                onChange={handleChange}
                placeholder="nama@studio.com"
                className="w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
              />
              {renderFieldError("leaderEmail")}
            </div>

            {/* 6. No Whatsapp Game Director (Leader) */}
            <div
              data-field="leaderWhatsapp"
              className={fieldCardClass("leaderWhatsapp")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">
                No Whatsapp Game Director (Leader){" "}
                <span className="text-[#E71C34]">*</span>
              </label>
              <input
                type="tel"
                name="leaderWhatsapp"
                value={formData.leaderWhatsapp}
                onChange={handleChange}
                placeholder="08xxxxxxxxxx"
                className="w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
              />
              {renderFieldError("leaderWhatsapp")}
            </div>

            {/* 7. Captable */}
            <div className="bg-[#0b0c10] border border-[#252b3b] rounded-xl p-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-0.5">
                Captable <span className="text-[#E71C34]">*</span>
              </label>
              <p className="text-xs text-gray-400 mb-3">
                Kepemilikan game startup
              </p>
              <div className="space-y-2.5">
                {([">= 65%", "< 65%"] as const).map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2.5 cursor-pointer text-xs sm:text-sm text-gray-200"
                  >
                    <input
                      type="radio"
                      name="captable"
                      value={opt}
                      checked={formData.captable === opt}
                      onChange={handleChange}
                      className="text-[#E71C34] focus:ring-[#E71C34]"
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            HALAMAN 3 DARI 5: GAME STARTUP DETAILS
           =================================================================== */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div className="bg-[#E71C34] text-white px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2">
              <Gamepad className="w-4 h-4 shrink-0" />
              <span>Game Startup Details</span>
            </div>

            {/* 1. Nama Team Game Startup */}
            <div
              data-field="startupName"
              className={fieldCardClass("startupName")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">
                Nama Team Game Startup <span className="text-[#E71C34]">*</span>
              </label>
              <input
                type="text"
                name="startupName"
                value={formData.startupName}
                onChange={handleChange}
                placeholder="Jawaban Anda"
                className="w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
              />
              {renderFieldError("startupName")}
            </div>

            {/* 2. Kapan Team Game Startup dibentuk */}
            <div
              data-field="dateFormed"
              className={fieldCardClass("dateFormed")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-1">
                Kapan Team Game Startup dibentuk{" "}
                <span className="text-[#E71C34]">*</span>
              </label>
              <p className="text-[11px] text-gray-400 mb-2">Tanggal</p>
              <input
                type="date"
                name="dateFormed"
                value={formData.dateFormed}
                onChange={handleChange}
                className="w-full sm:w-64 bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
              />
              {renderFieldError("dateFormed")}
            </div>

            {/* 3. Lokasi Team Game Startup */}
            <div data-field="location" className={fieldCardClass("location")}>
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">
                Lokasi Team Game Startup{" "}
                <span className="text-[#E71C34]">*</span>
              </label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Jawaban Anda"
                className="w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
              />
              {renderFieldError("location")}
            </div>

            {/* 4. Target platform utama untuk rilis game */}
            <div className="bg-[#0b0c10] border border-[#252b3b] rounded-xl p-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-3">
                Target platform utama untuk rilis game{" "}
                <span className="text-[#E71C34]">*</span>
              </label>
              <div className="space-y-2.5">
                {PLATFORMS.map((plat) => (
                  <label
                    key={plat}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="targetPlatform"
                      value={plat}
                      checked={formData.targetPlatform === plat}
                      onChange={handleChange}
                      className="text-[#E71C34] focus:ring-[#E71C34]"
                    />
                    {plat}
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Website Game Startup */}
            <div
              data-field="startupWebsite"
              className={fieldCardClass("startupWebsite")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-0.5">
                Website Game Startup <span className="text-[#E71C34]">*</span>
              </label>
              <p className="text-[11px] text-gray-400 mb-2.5">
                Website / itch.io page / Steam page
              </p>
              <input
                type="text"
                name="startupWebsite"
                value={formData.startupWebsite}
                onChange={handleChange}
                placeholder="Jawaban Anda"
                className="w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
              />
              {renderFieldError("startupWebsite")}
            </div>

            {/* 6. Genre Game */}
            <div data-field="gameGenre" className={fieldCardClass("gameGenre")}>
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-0.5">
                Genre Game <span className="text-[#E71C34]">*</span>
              </label>
              <p className="text-[11px] text-gray-400 mb-3">
                Apabila memiliki lebih dari satu, maka pilih yang lebih dominan
              </p>
              <div className="space-y-2.5">
                {GENRES.map((g) => (
                  <label
                    key={g}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="gameGenre"
                      value={g}
                      checked={formData.gameGenre === g}
                      onChange={handleChange}
                      className="text-[#E71C34] focus:ring-[#E71C34]"
                    />
                    <span>{g === "Yang lain" ? "Yang lain:" : g}</span>
                  </label>
                ))}
              </div>
              {formData.gameGenre === "Yang lain" && (
                <input
                  type="text"
                  name="customGenre"
                  value={formData.customGenre}
                  onChange={handleChange}
                  placeholder="Tuliskan genre game..."
                  className="mt-2.5 w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E71C34]"
                />
              )}
              {renderFieldError("gameGenre")}
            </div>

            {/* 7. Status perusahaan */}
            <div className="bg-[#0b0c10] border border-[#252b3b] rounded-xl p-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-3">
                Status perusahaan <span className="text-[#E71C34]">*</span>
              </label>
              <div className="space-y-2.5">
                {(["PT", "CV", "Belum terdaftar"] as const).map((st) => (
                  <label
                    key={st}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="companyStatus"
                      value={st}
                      checked={formData.companyStatus === st}
                      onChange={handleChange}
                      className="text-[#E71C34] focus:ring-[#E71C34]"
                    />
                    {st}
                  </label>
                ))}
              </div>
            </div>

            {/* 8. Apakah Team Game Startup tergabung dalam komunitas game developer? */}
            <div className="bg-[#0b0c10] border border-[#252b3b] rounded-xl p-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-3">
                Apakah Team Game Startup tergabung dalam komunitas game developer?{" "}
                <span className="text-[#E71C34]">*</span>
              </label>
              <div className="space-y-2.5">
                {(["Ya", "Tidak"] as const).map((yn) => (
                  <label
                    key={yn}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="inCommunity"
                      value={yn}
                      checked={formData.inCommunity === yn}
                      onChange={handleChange}
                      className="text-[#E71C34] focus:ring-[#E71C34]"
                    />
                    {yn}
                  </label>
                ))}
              </div>
            </div>

            {/* 9. Apabila tergabung dalam komunitas, komunitas mana? */}
            <div
              data-field="communityName"
              className={fieldCardClass("communityName")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-2">
                Apabila tergabung dalam komunitas, komunitas mana?
                {formData.inCommunity === "Ya" && (
                  <span className="text-[#E71C34]"> *</span>
                )}
              </label>
              <input
                type="text"
                name="communityName"
                value={formData.communityName}
                onChange={handleChange}
                placeholder="Jawaban Anda"
                className="w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
              />
              {renderFieldError("communityName")}
            </div>

            {/* 10. Apakah game startup pernah/mengikuti program lain? */}
            <div
              data-field="otherPrograms"
              className={fieldCardClass("otherPrograms")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-0.5">
                Apakah game startup pernah/mengikuti program lain? Apabila tidak, isi dengan &apos;-&apos;{" "}
                <span className="text-[#E71C34]">*</span>
              </label>
              <p className="text-[11px] text-gray-400 mb-2.5">
                Misal: IGDX, Gameseed, TGFI
              </p>
              <input
                type="text"
                name="otherPrograms"
                value={formData.otherPrograms}
                onChange={handleChange}
                placeholder="Jawaban Anda"
                className="w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
              />
              {renderFieldError("otherPrograms")}
            </div>
          </div>
        )}

        {/* ===================================================================
            HALAMAN 4 DARI 5: GAME STARTUP DOCUMENTS
           =================================================================== */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="bg-[#E71C34] text-white px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 shrink-0" />
              <span>Game Startup Documents</span>
            </div>

            {/* 1. Pitchdeck Startup (PDF Upload) */}
            <div
              data-field="pitchdeckFile"
              className={fieldCardClass("pitchdeckFile")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-0.5">
                Pitchdeck Startup <span className="text-[#E71C34]">*</span>
              </label>
              <p className="text-xs text-gray-300 mb-1">
                Gunakan referensi{" "}
                <a
                  href="https://game.indigo.id"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#F3E000] underline hover:text-[#F2A900]"
                >
                  Template
                </a>{" "}
                dari Indigo Game
              </p>
              <p className="text-[11px] text-gray-400 mb-4">
                Upload 1 file yang didukung: PDF. Maks 100 MB.
              </p>

              <div className="border-2 border-dashed border-[#252b3b] hover:border-[#E71C34]/60 rounded-xl p-6 text-center transition-colors bg-[#141721]/50">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2.5" />
                <label className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E71C34] hover:bg-[#D3182E] text-white text-xs font-bold cursor-pointer transition-colors shadow-md">
                  <Upload className="w-4 h-4" />
                  Tambahkan file (PDF)
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="application/pdf,.pdf"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                </label>

                {pitchdeckFile && (
                  <div className="mt-4 flex items-center justify-center">
                    <div className="px-3.5 py-2 bg-[#0b0c10] border border-[#252b3b] rounded-lg inline-flex items-center gap-2.5 text-xs text-gray-200">
                      <span className="px-1.5 py-0.5 rounded bg-[#E71C34] text-white font-bold text-[10px]">
                        PDF
                      </span>
                      <span className="font-medium truncate max-w-[240px]">
                        {pitchdeckFile.name}
                      </span>
                      <span className="text-gray-500">
                        ({(pitchdeckFile.size / (1024 * 1024)).toFixed(2)} MB)
                      </span>
                      <button
                        type="button"
                        onClick={removeSelectedFile}
                        className="text-gray-400 hover:text-red-400 p-0.5"
                        title="Hapus file"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex items-center justify-center gap-1.5 text-[11px] text-amber-400/90">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>
                    Akses Privat: File yang telah di-submit hanya dapat dilihat oleh Admin &amp; Mentor Indigo Game.
                  </span>
                </div>
              </div>
              {renderFieldError("pitchdeckFile")}
            </div>

            {/* 2. Teaser Video Game */}
            <div className="bg-[#0b0c10] border border-[#252b3b] rounded-xl p-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-0.5">
                Teaser Video Game
              </label>
              <p className="text-[11px] text-gray-400 mb-2.5">
                Link YouTube (Jika Ada)
              </p>
              <div className="relative">
                <input
                  type="text"
                  name="teaserVideoUrl"
                  value={formData.teaserVideoUrl}
                  onChange={handleChange}
                  placeholder="Jawaban Anda"
                  className="w-full bg-[#141721] border border-[#252b3b] rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
                />
                <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>

            {/* 3. Game Demo */}
            <div className="bg-[#0b0c10] border border-[#252b3b] rounded-xl p-4">
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-0.5">
                Game Demo
              </label>
              <p className="text-[11px] text-gray-400 mb-2.5">
                Link Installer (Jika Ada)
              </p>
              <div className="relative">
                <input
                  type="text"
                  name="gameDemoUrl"
                  value={formData.gameDemoUrl}
                  onChange={handleChange}
                  placeholder="Jawaban Anda"
                  className="w-full bg-[#141721] border border-[#252b3b] rounded-lg pl-9 pr-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-[#E71C34] transition-colors"
                />
                <LinkIcon className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              </div>
            </div>
          </div>
        )}

        {/* ===================================================================
            HALAMAN 5 DARI 5: PREFERENCE & KONFIRMASI PENGIRIMAN
           =================================================================== */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="bg-[#E71C34] text-white px-4 py-3 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2">
              <Send className="w-4 h-4 shrink-0" />
              <span>Preference &amp; Konfirmasi Pengiriman</span>
            </div>

            {/* Dari mana Anda mengetahui tentang Indigo Game? */}
            <div
              data-field="referralSource"
              className={fieldCardClass("referralSource")}
            >
              <label className="block text-xs sm:text-sm font-semibold text-gray-200 mb-3">
                Dari mana Anda mengetahui tentang Indigo Game?{" "}
                <span className="text-[#E71C34]">*</span>
              </label>
              <div className="space-y-2.5">
                {REFERRAL_OPTIONS.map((opt) => (
                  <label
                    key={opt}
                    className="flex items-center gap-2.5 text-xs sm:text-sm text-gray-200 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="referralSource"
                      value={opt}
                      checked={formData.referralSource === opt}
                      onChange={handleChange}
                      className="text-[#E71C34] focus:ring-[#E71C34]"
                    />
                    <span>{opt === "Yang lain" ? "Yang lain:" : opt}</span>
                  </label>
                ))}
              </div>
              {formData.referralSource === "Yang lain" && (
                <input
                  type="text"
                  name="customReferral"
                  value={formData.customReferral}
                  onChange={handleChange}
                  placeholder="Sebutkan sumber lainnya..."
                  className="mt-2.5 w-full bg-[#141721] border border-[#252b3b] rounded-lg px-3.5 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-[#E71C34]"
                />
              )}
              {renderFieldError("referralSource")}
            </div>

            {/* Summary preview table */}
            <div className="bg-[#0b0c10] border border-[#252b3b] rounded-xl p-5">
              <h4 className="text-xs font-bold text-[#F2A900] uppercase tracking-wider mb-3">
                Periksa Kembali Ringkasan Pendaftaran Anda
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <span className="text-gray-400">Nama Team Startup:</span>{" "}
                  <span className="text-white font-semibold">
                    {formData.startupName || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Target Platform:</span>{" "}
                  <span className="text-white font-semibold">
                    {formData.targetPlatform || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Game Director (Leader):</span>{" "}
                  <span className="text-white font-semibold">
                    {formData.leaderName || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Role Leader:</span>{" "}
                  <span className="text-white font-semibold">
                    {formData.leaderRole || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Email Leader:</span>{" "}
                  <span className="text-white font-semibold">
                    {formData.leaderEmail || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">No. WhatsApp:</span>{" "}
                  <span className="text-white font-semibold">
                    {formData.leaderWhatsapp || "-"}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">Genre Game:</span>{" "}
                  <span className="text-white font-semibold">
                    {formData.gameGenre === "Yang lain"
                      ? formData.customGenre
                      : formData.gameGenre}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400">File Pitchdeck:</span>{" "}
                  <span className="text-amber-400 font-semibold">
                    🔒 {pitchdeckFile?.name || "Belum dipilih"}
                  </span>
                </div>
              </div>
            </div>

            {/* Checkbox Konfirmasi Pasti Pengirim Sebelum Dikirim */}
            <div
              data-field="confirmFinalSubmit"
              className={fieldCardClass("confirmFinalSubmit")}
            >
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="confirmFinalSubmit"
                  checked={formData.confirmFinalSubmit}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded text-[#E71C34] bg-gray-900 border-gray-700 focus:ring-[#E71C34]"
                />
                <span className="text-xs sm:text-sm text-gray-200">
                  <strong>Konfirmasi Akhir Pengirim:</strong> Saya telah memeriksa ringkasan di atas dan memastikan seluruh data serta dokumen Pitch Deck yang dilampirkan sudah benar untuk dikirimkan.{" "}
                  <span className="text-[#E71C34] font-bold">*</span>
                </span>
              </label>
              {renderFieldError("confirmFinalSubmit")}
            </div>
          </div>
        )}

        {/* Error alert if any */}
        {errorMsg && (
          <div className="mt-6 p-3.5 rounded-xl bg-red-950/60 border border-red-800 text-red-200 flex items-center gap-2.5 text-xs">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Action Buttons (Kembali, Berikutnya/Kirim, Progress bar, Kosongkan formulir) */}
        <div className="mt-8 pt-5 border-t border-[#252b3b] flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {currentStep > 1 && (
              <button
                key="btn-prev"
                type="button"
                onClick={prevStep}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg border border-[#252b3b] hover:bg-white/5 text-xs sm:text-sm font-semibold text-gray-300 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali
              </button>
            )}

            {currentStep < 5 ? (
              <button
                key="btn-next"
                type="button"
                onClick={nextStep}
                className="inline-flex items-center gap-1.5 px-6 py-2.5 rounded-lg bg-[#E71C34] hover:bg-[#D3182E] text-xs sm:text-sm font-bold text-white transition-all shadow-lg shadow-[#E71C34]/25"
              >
                Berikutnya
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                key="btn-submit"
                type="submit"
                disabled={loading}
                className="inline-flex items-center gap-2 px-7 py-2.5 rounded-lg bg-[#E71C34] hover:bg-[#D3182E] text-xs sm:text-sm font-bold text-white transition-all shadow-xl shadow-[#E71C34]/30 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Kirim Pendaftaran
                  </>
                )}
              </button>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs text-gray-400 font-medium">
              Halaman {currentStep} dari 5
            </span>
            <button
              type="button"
              onClick={handleResetForm}
              className="inline-flex items-center gap-1 text-xs font-semibold text-[#E71C34] hover:underline"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Kosongkan formulir
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
