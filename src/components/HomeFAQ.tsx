"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  { q: "Bagaimana cara memesan produk?", a: "Pilih produk yang diinginkan, lalu klik \"Pesan via WhatsApp\" atau \"Tambah ke Keranjang\". Untuk WhatsApp, Anda langsung chat kami. Untuk keranjang, isi data diri di checkout, lalu kami hubungi untuk konfirmasi." },
  { q: "Apakah bisa kirim ke seluruh Indonesia?", a: "Tentu saja, selain mudah dalam pemesanannya, juga kami mudah dalam pengiriman karena mendukung ekspedisi ekspress yang mampu menjangkau seluruh Indonesia." },
  { q: "Apakah produknya ori?", a: "Kami hanya menyediakan produk dengan kualitas 100% original sehingga sangat terjamin. Ini karena kami adalah agen resmi produk Sin." },
  { q: "Apakah ada garansi?", a: "Tentu saja semua produk yang kami pasarkan dilengkapi dengan jaminan garansi resmi, garansi uang kembali jika produk tidak ori, tidak sampai ke lokasi, atau pun rusak." },
  { q: "Apa khasiat Kopi Mana Kopi?", a: "Kopi Mana Kopi adalah racikan kopi yang dipadukan dengan jahe, madu, adas, dan kapulaga dalam komposisi yang PAS. Melahirkan cita rasa yang unik untuk memenuhi kebutuhan kafein Anda sekaligus menjaga daya tahan tubuh." },
];

export default function HomeFAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div key={i} className={`overflow-hidden rounded-sm border border-[#E4E4E7] bg-white shadow-sm transition-all ${open === i ? "shadow-md" : ""}`}>
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-[#F4F4F5]"
          >
            <span className="font-serif font-bold text-[#18181B]">{faq.q}</span>
            <ChevronDown className={`h-5 w-5 shrink-0 text-[#A1A1AA] transition duration-200 ${open === i ? "rotate-180" : ""}`} strokeWidth={1.5} />
          </button>
          {open === i && (
            <div className="border-t border-[#E4E4E7] px-6 py-5 animate-fade-in">
              <p className="font-sans leading-relaxed text-[#52525B]">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
