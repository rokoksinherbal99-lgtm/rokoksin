"use client";

import { useEffect, useState } from "react";
import { Shield } from "lucide-react";

const STORAGE_KEY = "sinherbal_age_verified";

export default function AgeModal() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const verified = localStorage.getItem(STORAGE_KEY);
    if (!verified) setShow(true);
  }, []);

  const confirm = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setShow(false);
  };

  const leave = () => {
    window.location.href = "https://google.com";
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-sm rounded-sm bg-white p-6 shadow-2xl animate-scale-in">
        <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-[#18181B]">
          <Shield className="h-8 w-8 text-[#E4E4E7]" strokeWidth={1.5} />
        </div>

        <h2 className="text-center font-serif text-xl font-bold tracking-tight text-[#18181B]">
          Verifikasi Usia
        </h2>

        <p className="mt-3 text-center font-sans text-sm leading-relaxed text-[#52525B]">
          Situs ini menjual produk <strong className="text-[#18181B]">rokok herbal</strong> yang mengandung nikotin.
        </p>
        <p className="mt-2 text-center font-sans text-sm font-semibold text-[#18181B]">
          Anda harus berusia minimal 21 tahun.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={confirm}
            className="w-full rounded-sm bg-[#18181B] px-6 py-4 font-sans text-base font-bold text-white transition hover:bg-[#3F3F46] active:scale-[0.98]"
          >
            Ya, Saya Sudah 21+
          </button>
          <button
            onClick={leave}
            className="w-full rounded-sm border border-[#E4E4E7] px-6 py-3.5 font-sans text-sm font-semibold text-[#52525B] transition hover:border-[#A1A1AA] hover:bg-[#F4F4F5] active:scale-[0.98]"
          >
            Saya Belum Cukup Umur
          </button>
        </div>

        <p className="mt-4 text-center font-sans text-[10px] text-[#A1A1AA]">
          Dengan masuk, Anda menyetujui Syarat &amp; Ketentuan yang berlaku.
        </p>
      </div>
    </div>
  );
}
