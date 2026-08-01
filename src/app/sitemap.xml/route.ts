import { db } from "@/db";
import { products } from "@/db/schema";
import { ARTICLES } from "@/lib/journal";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const allProducts = await db.select().from(products);

    const staticPages = [
      { loc: "", priority: "1.0", changefreq: "daily" },
      { loc: "/products", priority: "0.9", changefreq: "daily" },
      { loc: "/harga", priority: "0.5", changefreq: "weekly" },
      { loc: "/cek-ongkir", priority: "0.4", changefreq: "monthly" },
      { loc: "/lacak-pesanan", priority: "0.4", changefreq: "monthly" },
      { loc: "/faq", priority: "0.6", changefreq: "weekly" },
      { loc: "/tentang-kami", priority: "0.7", changefreq: "monthly" },
      { loc: "/kontak", priority: "0.5", changefreq: "monthly" },
      { loc: "/transparansi", priority: "0.3", changefreq: "monthly" },
      { loc: "/ritual", priority: "0.3", changefreq: "monthly" },
      { loc: "/journal", priority: "0.6", changefreq: "weekly" },
      ...ARTICLES.map((a) => ({ loc: `/journal/${a.slug}`, priority: "0.6" as const, changefreq: "weekly" as const })),
    ];

    const urls = [
      ...staticPages,
      ...allProducts.map((p) => ({
        loc: `/products/${p.slug}`,
        priority: "0.8" as const,
        changefreq: "weekly" as const,
      })),
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${BASE_URL}${u.loc}</loc>\n    <changefreq>${u.changefreq}</changefreq>\n    <priority>${u.priority}</priority>\n  </url>`).join("\n")}
</urlset>`;

    return new Response(xml, {
      headers: { "Content-Type": "application/xml" },
    });
  } catch (err) {
    console.error("Sitemap generation error:", err);
    return new Response("", { status: 500 });
  }
}
