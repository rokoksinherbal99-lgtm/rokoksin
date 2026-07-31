"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, ArrowRight, Heart } from "lucide-react";
import { formatPrice } from "@/lib/utils";
import { useState } from "react";

interface ProductCardProps {
  id: string;
  name: string;
  slug: string;
  price: number;
  image: string;
  stock?: number;
}

const placeholders = ["/images/product-1.svg", "/images/product-2.svg", "/images/product-3.svg", "/images/product-4.svg", "/images/product-5.svg", "/images/product-6.svg"];
const defaultImg = (key: string) => placeholders[Math.abs(key.split("").reduce((a, c) => ((a << 5) - a + c.charCodeAt(0)) | 0, 0)) % placeholders.length];

export default function ProductCard({ id, name, slug, price, image, stock }: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(image || defaultImg(id));
  const [liked, setLiked] = useState(false);

  return (
    <div className="group relative rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-foreground/10 hover:-translate-y-1">
      <Link href={`/products/${slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-muted">
          <Image
            src={imgSrc}
            alt={name}
            fill
            unoptimized
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            onError={() => setImgSrc(defaultImg(id))}
          />
          {stock !== undefined && stock <= 0 && (
            <span className="absolute left-3 top-3 rounded-sm bg-foreground px-2 py-0.5 font-sans text-[10px] font-bold uppercase tracking-wide text-background">
              Habis
            </span>
          )}
        </div>
        <div className="p-4">
          <h3 className="text-sm font-medium leading-snug text-foreground transition-colors group-hover:text-primary">
            {name}
          </h3>
          <p className="mt-1.5 text-base font-bold tracking-tight text-foreground">{formatPrice(price)}</p>
          {stock !== undefined && (
            <p className={`mt-1 text-[11px] font-medium ${stock > 10 ? "text-muted-foreground" : "text-foreground"}`}>
              {stock > 10 ? "Tersedia" : stock > 0 ? "Hampir habis" : "Stok habis"}
            </p>
          )}
          <span className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-foreground/70 transition-all group-hover:gap-2.5 group-hover:text-primary">
            Lihat Detail <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
          </span>
        </div>
      </Link>
      <button
        onClick={() => setLiked(!liked)}
        aria-label="Tambah ke favorit"
        className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full border border-border bg-card/90 text-muted-foreground shadow-sm backdrop-blur-sm transition-all hover:scale-110 hover:text-red-500"
      >
        <Heart className={`h-4 w-4 transition-colors ${liked ? "fill-red-500 text-red-500" : ""}`} strokeWidth={1.5} />
      </button>
      {stock !== undefined && stock > 0 && (
        <div className="px-4 pb-4">
          <a
            href={`https://wa.me/6285161835757?text=${encodeURIComponent(`Halo! Saya ingin pesan ${name}. Berapa harganya?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#25D366] px-3 py-2.5 text-xs font-semibold text-white transition-all hover:bg-[#1da851] active:scale-[0.98]"
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} /> Beli via WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
