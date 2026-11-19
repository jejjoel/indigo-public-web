export type SubmissionStatus = "Pending" | "Under Review" | "Accepted" | "Rejected";

export interface SubmissionData {
  id: string;
  registrationCode: string;
  createdAt: string;
  status: SubmissionStatus;
  adminNotes?: string;

  // Halaman 1 dari 5: Kriteria & Ketentuan Program
  agreedToTerms: boolean;

  // Halaman 2 dari 5: Profil Game Director (Leader)
  leaderName: string;
  leaderRole: string;
  leaderLinkedin: string;
  leaderCommitment: "Full Time" | "Part Time";
  leaderEmail: string;
  leaderWhatsapp: string;
  captable: ">= 65%" | "< 65%";

  // Halaman 3 dari 5: Game Startup Details
  startupName: string;
  dateFormed: string;
  location: string;
  targetPlatform: string;
  startupWebsite: string;
  gameGenre: string;
  companyStatus: "PT" | "CV" | "Belum terdaftar";
  inCommunity: "Ya" | "Tidak";
  communityName?: string;
  otherPrograms: string;

  // Halaman 4 dari 5: Game Startup Documents
  // Catatan Keamanan: pitchdeckStoragePath disimpan di Private Storage Bucket
  // dan HANYA dapat dibuka/dilihat oleh Admin melalui Signed URL / Admin Portal.
  pitchdeckFileName: string;
  pitchdeckStoragePath: string;
  teaserVideoUrl?: string;
  gameDemoUrl?: string;

  // Halaman 5 dari 5: Preference
  referralSource: string;
}

export type SubmissionInput = Omit<
  SubmissionData,
  "id" | "registrationCode" | "createdAt" | "status" | "adminNotes"
>;

/**
 * Data bukti pendaftaran yang dikembalikan ke user publik setelah submit.
 * TIDAK menyertakan pitchdeckStoragePath atau akses baca ke dokumen Pitch Deck.
 */
export interface PublicSubmissionReceipt {
  id: string;
  registrationCode: string;
  createdAt: string;
  startupName: string;
  leaderName: string;
  gameGenre: string;
  targetPlatform: string;
  pitchdeckFileName: string;
}

export interface ContactMessageData {
  id: string;
  fullName: string;
  email: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

