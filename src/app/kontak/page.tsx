import type { Metadata } from "next";
import ContactPage from "./page-client";
import JsonLd from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";

export const metadata: Metadata = {
  title: "Kontak Kami",
  description: "Hubungi Sin Herbal via WhatsApp, email, atau formulir kontak. Kami siap membantu Anda.",
};

export default function Kontak() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Kontak Kami", item: `${BASE_URL}/kontak` },
        ],
      }} />
      <ContactPage />
    </>
  );
}
