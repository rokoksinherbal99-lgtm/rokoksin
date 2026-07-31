import ProductsPageClient from "./products-page-client";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";

export const metadata: Metadata = {
  title: "Produk Herbal",
  description: "Koleksi lengkap produk herbal Sin Herbal. Rokok herbal SKT/SKM dan kopi premium terdaftar Bea Cukai.",
};

export const dynamic = "force-dynamic";

export default function ProductsPage() {
  return (
    <>
      <JsonLd data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Beranda", item: `${BASE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Produk", item: `${BASE_URL}/products` },
        ],
      }} />
      <ProductsPageClient />
    </>
  );
}
