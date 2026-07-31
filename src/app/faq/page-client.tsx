"use client";

import { useState, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import Link from "next/link";

function formatPhone(phone: string) {
  const cleaned = phone.replace(/\D/g, "");
  return `0${cleaned.slice(2, 5)}-${cleaned.slice(5, 9)}-${cleaned.slice(9)}`;
}

const faqs = (displayPhone: string) => [
  {
    q: "Apakah bisa kirim ke seluruh Indonesia?",
    a: "Ya, kami melayani pengiriman ke seluruh Indonesia melalui jasa ekspedisi terpercaya. Ongkir gratis untuk area tertentu, hubungi kami untuk detailnya.",
  },
  {
    q: "Apakah produknya original?",
    a: "100% original. Kami adalah distributor resmi produk Sin Herbal. Garansi uang kembali jika produk tidak original.",
  },
  {
    q: "Apakah ada garansi?",
    a: "Ya, kami memberikan garansi uang kembali jika produk tidak original, tidak sampai, atau rusak dalam pengiriman.",
  },
  {
    q: "Bagaimana cara pesan?",
    a: `Anda bisa memesan melalui website ini, atau menghubungi kami via WhatsApp di ${displayPhone}.`,
  },
  {
    q: "Apa saja manfaat produk Sin Herbal?",
    a: "Produk kami terbuat dari bahan alami pilihan. Rokok herbal kami mengandung rempah-rempah asli nusantara. Minuman herbal membantu menetralisir efek kafein, aman untuk diabetes, kolesterol, asam urat, dan tekanan darah tinggi.",
  },
  {
    q: "Apakah ada minimal pembelian?",
    a: "Tidak ada minimal pembelian. Anda bisa membeli satuan maupun grosir dengan harga khusus.",
  },
];

export default function FAQPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [waPhone, setWaPhone] = useState("6285161835757");

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => { if (data.wa_phone) setWaPhone(data.wa_phone); })
      .catch(() => {});
  }, []);

  const displayPhone = formatPhone(waPhone);
  const allFaqs = faqs(displayPhone);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: allFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
    <div>
      <section className="bg-gradient-to-b from-muted/50 to-background py-20">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-foreground to-muted-foreground shadow-lg shadow-foreground/5">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>
          <span className="inline-block rounded-full bg-muted px-4 py-1 text-sm font-semibold text-foreground">FAQ</span>
          <h1 className="mt-3 text-4xl font-bold text-foreground">Pertanyaan Umum</h1>
          <p className="mt-2 text-muted-foreground">Temukan jawaban untuk pertanyaan yang sering diajukan.</p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-3xl px-4 space-y-3">
          {allFaqs.map((faq, i) => (
            <div key={i} className={`overflow-hidden rounded-2xl border border-border bg-white shadow-sm transition-all ${open === i ? "shadow-md" : ""}`}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition hover:bg-muted/50"
              >
                <span className="font-semibold text-foreground">{faq.q}</span>
                <ChevronDown className={`h-5 w-5 shrink-0 text-muted-foreground transition duration-200 ${open === i ? "rotate-180" : ""}`} />
              </button>
              {open === i && (
                <div className="border-t border-border px-6 py-5 animate-fade-in">
                  <p className="leading-relaxed text-muted-foreground">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        <div className="mx-auto max-w-3xl px-4 mt-10 text-center rounded-2xl bg-gradient-to-br from-muted/50 to-background border border-border p-8">
          <p className="text-muted-foreground">Masih punya pertanyaan? Hubungi kami langsung</p>
          <Link href="/kontak" className="btn-primary mt-4 gap-2 inline-flex">
            Hubungi Kami
          </Link>
        </div>
      </section>
    </div>
    </>
  );
}
