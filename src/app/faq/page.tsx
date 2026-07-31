import type { Metadata } from "next";
import FAQPage from "./page-client";
import JsonLd from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";

export const metadata: Metadata = {
  title: "Pertanyaan Umum (FAQ)",
  description: "Temukan jawaban untuk pertanyaan yang sering diajukan tentang produk Sin Herbal, cara pemesanan, pengiriman, dan garansi.",
};

export default function FAQ() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "FAQ", item: `${BASE_URL}/faq` },
        ],
      }} />
      <FAQPage />
    </>
  );
}
