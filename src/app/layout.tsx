import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Indigo Game Intake | Formulir Resmi Pendaftaran Startup",
  description:
    "Portal resmi pendaftaran dan kurasi Indigo Game Startup Incubation Program - PT Telkom Indonesia.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" className="h-full dark">
      <body className="min-h-full flex flex-col bg-[#0b0c10] text-[#f1f3f5] antialiased selection:bg-[#E71C34] selection:text-white">
        {children}
      </body>
    </html>
  );
}
