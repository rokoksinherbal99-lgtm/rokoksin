import Link from "next/link";
import { BookOpen, Leaf, Shield, Heart, MessageCircle, CheckCircle, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import { ARTICLES } from "@/lib/journal";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";

const ICONS: Record<string, any> = {
  leaf: Leaf,
  heart: Heart,
  bookopen: BookOpen,
  shield: Shield,
  checkcircle: CheckCircle,
  sparkles: Sparkles,
};

export const metadata: Metadata = {
  title: "Jurnal Herbal - Sin Herbal",
  description: "Artikel dan informasi seputar rokok herbal, gaya hidup sehat alami, dan tips berhenti merokok dari Sin Herbal.",
};

export default function JournalPage() {
  return (
    <div>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Jurnal", item: `${BASE_URL}/journal` },
        ],
      }} />
      <section className="relative overflow-hidden bg-gradient-to-b from-[#18181B] via-[#3F3F46] to-[#18181B] py-20">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#3F3F46]/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-foreground/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-sm bg-[#FFFFFF]/10 backdrop-blur-sm shadow-sm">
            <BookOpen className="h-8 w-8 text-white" strokeWidth={1.5} />
          </div>
          <span className="inline-block rounded-full border border-[#A1A1AA]/30 bg-[#E4E4E7]/50 px-5 py-1 font-serif text-sm font-semibold italic text-[#3F3F46]">Jurnal Herbal</span>
          <h1 className="mt-4 text-4xl font-bold text-white md:text-5xl">Artikel & Informasi</h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-[#FAFAFA]/80">
            Seputar rokok herbal, kopi herbal, gaya hidup sehat, dan tips berhenti merokok.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4">
          <div className="grid gap-6 md:grid-cols-2">
            {ARTICLES.map((article) => {
              const Icon = ICONS[article.icon];
              return (
                <Link
                  key={article.slug}
                  href={`/journal/${article.slug}`}
                  className="group border-[#E4E4E7] bg-white rounded-sm p-6 shadow-sm transition-all hover:shadow-md hover:border-[#A1A1AA]"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#3F3F46] to-[#18181B] shadow-sm">
                      <Icon className="h-5 w-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-[#3F3F46]">{article.category}</span>
                      <p className="text-xs text-[#A1A1AA]">{article.date} · {article.readTime}</p>
                    </div>
                  </div>
                  <h2 className="mt-4 text-lg font-bold text-[#18181B] group-hover:text-[#3F3F46] transition-colors">{article.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-[#52525B]">{article.excerpt}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#3F3F46] group-hover:gap-2 transition-all">
                    Baca Selengkapnya <span aria-hidden="true">→</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <div className="organic-divider mx-auto mt-4 max-w-[120px]" />

      <section className="relative overflow-hidden bg-gradient-to-b from-[#18181B] via-[#3F3F46] to-[#18181B] py-16">
        <div className="relative mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-3xl font-bold text-white">Ingin Berkontribusi?</h2>
          <p className="mt-3 text-lg text-[#A1A1AA]">Punya artikel atau pengalaman seputar herbal? Kirimkan ke kami.</p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <a
              href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_PHONE || "6285161835757"}?text=${encodeURIComponent("Halo! Saya ingin berkontribusi artikel untuk jurnal Sin Herbal.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-sm bg-[#25D366] px-6 py-3 font-sans text-sm font-semibold text-white transition hover:bg-[#1da851]"
            >
              <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
              Kirim via WhatsApp
            </a>
            <Link href="/products" className="inline-flex items-center gap-2 rounded-sm border border-[#A1A1AA]/30 bg-white px-6 py-3 font-sans text-sm font-semibold text-[#18181B] transition hover:bg-white/90">
              Mulai Belanja
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
