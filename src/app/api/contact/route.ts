import { NextRequest, NextResponse } from "next/server";
import { createPublicContactMessage } from "@/lib/storage";

export async function GET() {
  return NextResponse.json(
    {
      success: false,
      error: "Forbidden: Pesan kontak hanya dapat dibaca oleh Admin melalui Portal Internal.",
    },
    { status: 403 }
  );
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const fullName = body.fullName?.trim();
    const email = body.email?.trim();
    const message = body.message?.trim();

    if (!fullName || !email || !email.includes("@") || !message) {
      return NextResponse.json(
        {
          success: false,
          error: "Harap lengkapi Full Name, Email yang valid, serta isi Message.",
        },
        { status: 400 }
      );
    }

    const receipt = await createPublicContactMessage({ fullName, email, message });
    return NextResponse.json({ success: true, data: receipt }, { status: 201 });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Gagal mengirim pesan";
    return NextResponse.json({ success: false, error: msg }, { status: 500 });
  }
}
