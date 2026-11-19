import { NextRequest, NextResponse } from "next/server";
import { createPublicSubmission } from "@/lib/storage";

/**
 * PRINSIP KEAMANAN: ZERO PUBLIC READ ACCESS
 * Pada Repo 1 (Website Public), pengunjung publik DILARANG membaca daftar pendaftar.
 */
export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error:
        "Forbidden: Akses baca publik dinonaktifkan. Data pendaftaran & Pitch Deck hanya dapat diakses melalui Portal Internal Admin.",
    },
    { status: 403 }
  );
}

/**
 * ENDPOINT WRITE-ONLY: Menerima pendaftaran & mengunggah file PDF Pitch Deck ke Private Storage.
 */
export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get("content-type") || "";

    let fields: Record<string, string> = {};
    let pdfBuffer: Buffer | null = null;
    let pitchdeckFileName = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await req.formData();

      for (const [key, value] of formData.entries()) {
        if (key === "pitchdeckFile" && value instanceof File) {
          if (value.type !== "application/pdf" && !value.name.toLowerCase().endsWith(".pdf")) {
            return NextResponse.json(
              { success: false, error: "File Pitch Deck wajib berformat PDF (.pdf)." },
              { status: 400 }
            );
          }
          if (value.size > 100 * 1024 * 1024) {
            return NextResponse.json(
              { success: false, error: "Ukuran file Pitch Deck maksimal adalah 100 MB." },
              { status: 400 }
            );
          }
          pitchdeckFileName = value.name;
          const arrayBuffer = await value.arrayBuffer();
          pdfBuffer = Buffer.from(arrayBuffer);
        } else if (typeof value === "string") {
          fields[key] = value;
        }
      }
    } else {
      // Fallback JSON payload
      const body = await req.json();
      fields = body;
      pitchdeckFileName = body.pitchdeckFileName || "Pitchdeck_Startup.pdf";
      pdfBuffer = Buffer.from("%PDF-1.4 Private Pitch Deck Placeholder", "utf-8");
    }

    // Validasi Halaman 1: Kriteria
    const agreedToTerms =
      fields.agreedToTerms === "true" || Boolean(fields.agreedToTerms === true as unknown);
    if (!agreedToTerms) {
      return NextResponse.json(
        { success: false, error: "Harap menyetujui kriteria & ketentuan Indigo Game Intake." },
        { status: 400 }
      );
    }

    // Validasi Halaman 2: Game Director (Leader)
    if (
      !fields.leaderName?.trim() ||
      !fields.leaderRole?.trim() ||
      !fields.leaderLinkedin?.trim() ||
      !fields.leaderEmail?.trim() ||
      !fields.leaderWhatsapp?.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Data profil Game Director (Leader) pada Halaman 2 belum lengkap." },
        { status: 400 }
      );
    }

    // Validasi Halaman 3: Game Startup Details
    if (
      !fields.startupName?.trim() ||
      !fields.dateFormed?.trim() ||
      !fields.location?.trim() ||
      !fields.targetPlatform?.trim() ||
      !fields.startupWebsite?.trim() ||
      !fields.gameGenre?.trim() ||
      !fields.otherPrograms?.trim()
    ) {
      return NextResponse.json(
        { success: false, error: "Data Game Startup Details pada Halaman 3 belum lengkap." },
        { status: 400 }
      );
    }

    // Validasi Halaman 4: Pitchdeck Startup (PDF)
    if (!pdfBuffer || !pitchdeckFileName) {
      return NextResponse.json(
        { success: false, error: "Dokumen Pitchdeck Startup (PDF) pada Halaman 4 wajib diunggah." },
        { status: 400 }
      );
    }

    // Validasi Halaman 5: Preference
    if (!fields.referralSource?.trim()) {
      return NextResponse.json(
        { success: false, error: "Sumber informasi pada Halaman 5 wajib dipilih." },
        { status: 400 }
      );
    }

    const receipt = await createPublicSubmission(
      {
        agreedToTerms: true,
        leaderName: fields.leaderName.trim(),
        leaderRole: fields.leaderRole.trim(),
        leaderLinkedin: fields.leaderLinkedin.trim(),
        leaderCommitment:
          fields.leaderCommitment === "Part Time" ? "Part Time" : "Full Time",
        leaderEmail: fields.leaderEmail.trim(),
        leaderWhatsapp: fields.leaderWhatsapp.trim(),
        captable: fields.captable === "< 65%" ? "< 65%" : ">= 65%",
        startupName: fields.startupName.trim(),
        dateFormed: fields.dateFormed.trim(),
        location: fields.location.trim(),
        targetPlatform: fields.targetPlatform.trim(),
        startupWebsite: fields.startupWebsite.trim(),
        gameGenre: fields.gameGenre.trim(),
        companyStatus:
          fields.companyStatus === "PT" || fields.companyStatus === "CV"
            ? fields.companyStatus
            : "Belum terdaftar",
        inCommunity: fields.inCommunity === "Ya" ? "Ya" : "Tidak",
        communityName: fields.communityName?.trim() || undefined,
        otherPrograms: fields.otherPrograms.trim() || "-",
        pitchdeckFileName,
        teaserVideoUrl: fields.teaserVideoUrl?.trim() || undefined,
        gameDemoUrl: fields.gameDemoUrl?.trim() || undefined,
        referralSource: fields.referralSource.trim(),
      },
      pdfBuffer
    );

    return NextResponse.json({ success: true, data: receipt }, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memproses pendaftaran";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
