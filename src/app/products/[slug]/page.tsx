import { db } from "@/db";
import { products, categories } from "@/db/schema";
import { eq, and, ne, asc } from "drizzle-orm";
import { formatPrice, parseImages } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Shield, Package, CheckCircle, Tag } from "lucide-react";
import JsonLd from "@/components/JsonLd";

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
import ProductGallery from "@/components/ProductGallery";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const [product] = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  if (!product) return {};
  const images = parseImages(product.images);
  return {
    title: product.name,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: images.length > 0 ? images.slice(0, 1) : undefined,
    },
  };
}

export default async function ProductDetailPage({ params }: Props) {
  const { slug } = await params;
  const [row] = await db.select().from(products).where(eq(products.slug, slug)).leftJoin(categories, eq(products.categoryId, categories.id)).limit(1);
  if (!row || !row.categories) notFound();
  const product = { ...row.products, category: row.categories };
  const productImages = parseImages(product.images);

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
    image: productImages.length > 0 ? productImages[0] : undefined,
    sku: product.id,
    mpn: product.id,
    brand: { "@type": "Brand", name: "Sin Herbal" },
    category: product.category.name,
    offers: {
      "@type": "Offer",
      price: product.price,
      priceCurrency: "IDR",
      priceValidUntil: new Date(new Date().getFullYear() + 1, 11, 31).toISOString().slice(0, 10),
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
      url: `${BASE_URL}/products/${product.slug}`,
      seller: { "@type": "Organization", name: "Sin Herbal" },
    },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Beranda", item: `${BASE_URL}/` },
      { "@type": "ListItem", position: 2, name: "Produk", item: `${BASE_URL}/products` },
      { "@type": "ListItem", position: 3, name: product.name, item: `${BASE_URL}/products/${product.slug}` },
    ],
  };

  return (
    <>
    <JsonLd data={productJsonLd} />
    <JsonLd data={breadcrumbJsonLd} />
    <div className="mx-auto max-w-6xl px-4 py-8">
      <nav className="mb-8 text-sm text-muted-foreground">
        <Link href="/" className="transition hover:text-foreground">Beranda</Link>
        <span className="mx-2">/</span>
        <Link href="/products" className="transition hover:text-foreground">Produk</Link>
        <span className="mx-2">/</span>
        <span className="font-medium text-foreground">{product.name}</span>
      </nav>

      <div className="grid gap-10 md:grid-cols-2">
        <ProductGallery images={productImages} name={product.name} />
        <div className="flex flex-col">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
              <Package className="h-3.5 w-3.5" strokeWidth={1.5} />
              {product.category.name}
            </span>
            {productTypes[product.name] && (
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-secondary px-3 py-1 text-xs font-semibold text-foreground">
                <Tag className="h-3.5 w-3.5" strokeWidth={1.5} />
                {productTypes[product.name]}
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground md:text-4xl">{product.name}</h1>
          <div className="mt-6 flex items-baseline gap-3">
            <span className="text-4xl font-extrabold tracking-tight text-foreground">{formatPrice(product.price)}</span>
            {product.stock > 0 && <span className="text-sm font-medium text-muted-foreground">/ unit</span>}
          </div>
          <div className="mt-6 border-t border-border pt-6">
            <p className="leading-relaxed text-muted-foreground">{product.description}</p>
          </div>
          <div className="mt-6 space-y-3 rounded-xl border border-border bg-card p-5 shadow-sm">
            {product.manufacturer && (
              <div className="flex items-center gap-3 text-sm">
                <Shield className="h-4 w-4 shrink-0 text-foreground" strokeWidth={1.5} />
                <span className="text-muted-foreground">Produsen: <strong className="text-foreground">{product.manufacturer}</strong></span>
              </div>
            )}
            <div className="flex items-center gap-3 text-sm">
              <CheckCircle className="h-4 w-4 shrink-0 text-foreground" strokeWidth={1.5} />
              <span className="text-muted-foreground">Stok: <strong className={product.stock <= 5 && product.stock > 0 ? "text-foreground" : "text-foreground"}>{product.stock > 10 ? "Tersedia" : product.stock > 0 ? `Stok Terbatas (sisa ${product.stock})` : "Habis"}</strong></span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex items-center gap-1.5 rounded-sm border border-border bg-secondary px-2.5 py-1 text-xs font-semibold text-foreground">
                <Shield className="h-3.5 w-3.5" strokeWidth={1.5} />
                Bea & Cukai
              </span>
              <span className="text-muted-foreground">Produk terdaftar resmi</span>
            </div>
          </div>

          {/* Spesifikasi Produk */}
          <div className="mt-6 rounded-xl border border-border bg-card p-5 shadow-sm">
            <h3 className="font-bold text-foreground">Spesifikasi Produk</h3>
            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Kategori</p>
                <p className="font-semibold text-foreground">{product.category.name}</p>
              </div>
              <div className="rounded-lg bg-muted p-3">
                <p className="text-xs text-muted-foreground">Jenis</p>
                <p className="font-semibold text-foreground">{productTypes[product.name] || "-"}</p>
              </div>
            </div>
          </div>
          <AddToCartButton
            id={product.id}
            name={product.name}
            slug={product.slug}
            price={product.price}
            image={productImages[0] || ""}
            disabled={product.stock < 1}
          />
        </div>
      </div>

      {related.length > 0 && (
        <><div className="organic-divider mx-auto mt-4 max-w-[120px]" />
        <section className="mt-20">
          <div className="flex items-center justify-between">
            <div>
              <span className="inline-block rounded-full border border-border bg-secondary/50 px-5 py-1 text-sm font-semibold text-muted-foreground">Terkait</span>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-foreground">Produk Terkait</h2>
            </div>
            <Link href="/products" className="btn-secondary text-sm gap-1">
              Lihat Semua
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-5 md:grid-cols-4">
            {related.map((r) => (
              <ProductCard key={r.products.id} id={r.products.id} name={r.products.name} slug={r.products.slug} price={r.products.price}             image={parseImages(r.products.images)[0] || ""} stock={r.products.stock} />
            ))}
          </div>
        </section></>)}
    </div>
    </>
  );
}
