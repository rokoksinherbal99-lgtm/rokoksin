import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, and, ne, asc } from "drizzle-orm";
import { formatPrice } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import Image from "next/image";
import { Shield, Package, CheckCircle, Tag } from "lucide-react";

const productTypes: Record<string, string> = {
  "Sin Platinum TSI": "SKT", "Sin Kujang Mas TSI": "SKT", "Sin Provost 19 TSI": "SKT",
  "Sin Sapu Jagat": "SKT", "Sin Krakatau": "SKT", "Sin New Normal ORG": "SKT",
  "Sin Precision White": "SKT", "Sin Precision": "SKT",
  "Sin Sinergi Mind": "SKM", "Sin Platinum Filter": "SKM", "Sin Sinergi Mind Menthol": "SKM",
  "Sin Trust Menthol": "SKM", "Sin Trust": "SKM", "Sin Kujang Mas Filter": "SKM",
  "Sin New Normal Mind": "SKM", "Sin New Normal Menthol": "SKM", "Sin Sinergi Encode": "SKM",
  "Kopi Mana Kopi": "Kopi", "Kopi Original": "Kopi",
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "https://rokoksin.vercel.app";
import AddToCartButton from "./add-to-cart-button";
import ProductCard from "@/components/ProductCard";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!product) return {};
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [product.images],
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [row] = await db.select().from(products).where(eq(products.slug, slug)).leftJoin(categories, eq(products.categoryId, categories.id)).limit(1);
  if (!row || !row.categories) notFound();
  const product = { ...row.products, category: row.categories };

  const related = await db.select().from(products)
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(and(eq(products.categoryId, product.categoryId), ne(products.id, product.id)))
    .orderBy(asc(products.name))
    .limit(4);

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images,
    sku: product.id,
    mpn: product.id,
    brand: { "@type": "Brand", name: "Sin Herbal" },
    category: product.category.name,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IDR",
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: `${BASE_URL}/products/${product.slug}`,
    },
  };

  return (
    <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-8 text-sm text-gray-400">
        <Link href="/" className="transition hover:text-[#2C4C3B]">Beranda</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="transition hover:text-[#2C4C3B]">Produk</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <div className="group relative">
          <div className="aspect-[4/3] overflow-hidden rounded-sm bg-gradient-to-br from-[#EDF2ED] to-[white] shadow-sm shadow-[#D5E0D3]/50">
            <Image
              src={product.images}
              alt={product.name}
              fill
              unoptimized
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-500 group-hover:scale-105"
              priority
            />
          </div>
        </div>
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-sm bg-[#D5E0D3] px-3 py-1 text-xs font-semibold text-[#2C4C3B]">
              <Package className="h-3.5 w-3.5" strokeWidth={1.5} />
              {product.category.name}
            </span>
            {productTypes[product.name] && (
              <span className={`inline-flex items-center gap-1.5 rounded-sm px-3 py-1 text-xs font-semibold ${productTypes[product.name] === "SKT" ? "bg-amber-50 text-amber-700" : productTypes[product.name] === "SKM" ? "bg-blue-50 text-blue-700" : "bg-teal-50 text-teal-700"}`}>
                <Tag className="h-3.5 w-3.5" strokeWidth={1.5} />
                {productTypes[product.name]}
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold text-[#1A3626] md:text-4xl">{product.name}</h1>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold text-[#2C4C3B]">{formatPrice(product.price)}</span>
            {product.stock > 0 && <span className="text-sm text-[#2C4C3B] font-medium">/ unit</span>}
          </div>
          <div className="mt-6 border-t border-[#D5E0D3] pt-6">
            <p className="leading-relaxed text-[#5D8356]">{product.description}</p>
          </div>
          <div className="mt-6 space-y-3 rounded-sm bg-gradient-to-br from-[#D5E0D3] to-[white] border border-[#ABC1A7] p-5">
            {product.manufacturer && (
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 text-[#2C4C3B] shrink-0" strokeWidth={1.5} />
                <span className="text-[#5D8356]">Produsen: <strong className="text-[#1A3626]">{product.manufacturer}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 text-[#2C4C3B] shrink-0" strokeWidth={1.5} />
              <span className="text-[#5D8356]">Stok: <strong className={product.stock <= 5 && product.stock > 0 ? "text-amber-600" : ""}>{product.stock > 10 ? "Tersedia" : product.stock > 0 ? `Stok Terbatas (sisa ${product.stock})` : "Habis"}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-[#ABC1A7] bg-[#D5E0D3] px-2.5 py-1 text-xs font-semibold text-[#2C4C3B]">
                <Shield className="h-3.5 w-3.5" strokeWidth={1.5} />
                Bea & Cukai
              </span>
              <span className="text-[#5D8356]">Produk terdaftar resmi</span>
            </div>
          </div>

          {/* Spesifikasi Produk */}
          <div className="mt-6 rounded-sm border-[#D5E0D3] bg-[white] p-5 shadow-sm">
            <h3 className="font-bold text-[#1A3626]">Spesifikasi Produk</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-sm bg-[#EDF2ED] p-3">
                <p className="text-xs text-[#5D8356]">Kategori</p>
                <p className="font-semibold text-[#1A3626]">{product.category.name}</p>
              </div>
              <div className="rounded-sm bg-[#EDF2ED] p-3">
                <p className="text-xs text-[#5D8356]">Jenis</p>
                <p className="font-semibold text-[#1A3626]">{productTypes[product.name] || "-"}</p>
              </div>
            </div>
          </div>
          <AddToCartButton
            id={product.id}
            name={product.name}
            slug={product.slug}
            price={product.price}
            image={product.images}
            disabled={product.stock < 1}
          />
        </div>
      </div>

      {related.length > 0 && (
        <><div className="organic-divider mx-auto mt-4 max-w-[120px]" />
        <section className="mt-20">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block rounded-full border border-[#ABC1A7]/30 bg-[#D5E0D3]/50 px-5 py-1 font-serif text-sm font-semibold italic text-[#2C4C3B]">Terkait</span>
              <h2 className="mt-2 text-2xl font-bold text-[#1A3626]">Produk Terkait</h2>
            </div>
            <Link href="/products" className="btn-secondary text-sm gap-1">
              Lihat Semua
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.products.id} id={r.products.id} name={r.products.name} slug={r.products.slug} price={r.products.price} image={r.products.images} stock={r.products.stock} />
            ))}
          </div>
        </section></>)}
    </div>
    </>
  );
}
