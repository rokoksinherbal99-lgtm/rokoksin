import { notFound } from "next/navigation";
import Link from "next/link";
import { BookOpen, ArrowLeft, Leaf, Shield, Heart, CheckCircle, Sparkles } from "lucide-react";
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

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return {};
  return {
    title: `${article.title} - Sin Herbal`,
    description: article.excerpt,
  };
}

export default async function JournalArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) notFound();

  const Icon = ICONS[article.icon];

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    image: `${BASE_URL}/og-journal-${article.slug}.png`,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: { "@type": "Organization", name: "Sin Herbal", url: BASE_URL },
    publisher: { "@type": "Organization", name: "Sin Herbal", logo: { "@type": "ImageObject", url: `${BASE_URL}/favicon.ico` } },
    mainEntityOfPage: { "@type": "WebPage", "@id": `${BASE_URL}/journal/${article.slug}` },
    inLanguage: "id-ID",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Jurnal", item: `${BASE_URL}/journal` },
      { "@type": "ListItem", position: 3, name: article.title, item: `${BASE_URL}/journal/${article.slug}` },
    ],
  };

  return (
    <div>
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <section className="relative overflow-hidden bg-gradient-to-b from-[#18181B] via-[#3F3F46] to-[#18181B] py-16">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-[#3F3F46]/30 blur-3xl" />
          <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-foreground/5 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-3xl px-4">
          <Link href="/journal" className="mb-6 inline-flex items-center gap-2 text-sm text-[#A1A1AA] transition hover:text-white">
            <ArrowLeft className="h-4 w-4" /> Kembali ke Jurnal
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E4E4E7]/20 shadow-sm">
              <Icon className="h-6 w-6 text-white" strokeWidth={1.5} />
            </div>
            <div>
              <span className="text-sm font-semibold text-[#A1A1AA]">{article.category}</span>
              <p className="text-xs text-[#A1A1AA]/60">{article.date} · {article.readTime}</p>
            </div>
          </div>
          <h1 className="mt-6 text-3xl font-bold text-white md:text-4xl">{article.title}</h1>
          <p className="mt-4 text-lg text-[#A1A1AA]">{article.excerpt}</p>
        </div>
      </section>

      <article className="py-12">
        <div className="mx-auto max-w-3xl px-4">
          <div
            className="prose prose-sm max-w-none prose-headings:font-bold prose-headings:text-[#18181B] prose-p:text-[#52525B] prose-li:text-[#52525B] prose-strong:text-[#3F3F46] prose-a:text-[#3F3F46]"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </div>
      </article>

      <div className="organic-divider mx-auto mb-16 max-w-[120px]" />

      <section className="pb-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <div className="rounded-sm bg-gradient-to-br from-[#F4F4F5] to-white border border-[#E4E4E7] p-8 shadow-sm">
            <BookOpen className="mx-auto h-8 w-8 text-[#3F3F46]" strokeWidth={1.5} />
            <h2 className="mt-4 text-xl font-bold text-[#18181B]">Artikel Terkait</h2>
            <p className="mt-2 text-sm text-[#52525B]">Baca artikel menarik lainnya seputar herbal dan gaya hidup sehat.</p>
            <Link href="/journal" className="btn-primary mt-6">
              Lihat Semua Artikel
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
