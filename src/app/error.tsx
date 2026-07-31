"use client";

import Link from "next/link";
import { AlertTriangle, Home, MessageCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-lg flex-col items-center justify-center px-4 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-red-50">
        <AlertTriangle className="h-10 w-10 text-red-400" strokeWidth={1.5} />
      </div>
      <h1 className="font-serif text-2xl font-bold tracking-tight text-[#18181B]">Ada yang Tidak Beres</h1>
      <p className="mt-2 max-w-sm font-sans text-sm text-[#52525B]">
        Terjadi kesalahan yang tidak terduga. Jika masalah berlanjut, hubungi kami via WhatsApp.
      </p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-sm bg-[#18181B] px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#3F3F46]"
        >
          <Home className="h-4 w-4" strokeWidth={1.5} />
          Coba Lagi
        </button>
        <a
          href="https://wa.me/6285161835757?text=Halo!%20Saya%20mengalami%20error%20di%20website%20Sin%20Herbal."
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-sm border border-[#25D366] bg-white px-6 py-3 font-sans text-sm font-semibold text-[#25D366] transition hover:bg-[#25D366]/5"
        >
          <MessageCircle className="h-4 w-4" />
          Hubungi WhatsApp
        </a>
      </div>
    </div>
  );
}