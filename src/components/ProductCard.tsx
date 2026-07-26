"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle } from "lucide-react";
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

  return (
    <div className="group relative rounded-sm border border-[#D5E0D3] bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:shadow-[#2C4C3B]/8 hover:-translate-y-1 active:scale-[0.99]">
      <Link href={`/products/${slug}`} className="block">
        <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-[#EDF2ED] to-white">
          <Image
            src={imgSrc}
            alt={name}
            fill
            unoptimized
            sizes="(max-width: 768px) 50vw, 25vw"
            className="object-cover contrast-110 transition duration-500 group-hover:scale-105"
            onError={() => setImgSrc(defaultImg(id))}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
        </div>
        <div className="p-3.5">
          <h3 className="font-serif text-sm font-bold leading-snug text-[#1A3626]">{name}</h3>
          <div className="mt-1.5">
            <p className="font-sans text-base font-bold tracking-tight text-[#1A3626]">{formatPrice(price)}</p>
          </div>
          {stock !== undefined && (
            <p className={`mt-1 font-sans text-[11px] font-medium ${stock > 10 ? "text-[#5D8356]" : stock > 0 ? "text-[#ABC1A7]" : "text-[#ABC1A7]/50"}`}>
              {stock > 10 ? "Tersedia" : stock > 0 ? "Hampir habis" : "Stok habis"}
            </p>
          )}
          <div className="mt-3 flex items-center gap-1.5 font-sans text-xs font-semibold text-[#2C4C3B] transition-all group-hover:gap-2.5">
            Lihat Detail <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" strokeWidth={1.5} />
          </div>
        </div>
      </Link>
      {stock !== undefined && stock > 0 && (
        <div className="px-3.5 pb-3.5">
          <a
            href={`https://wa.me/6285161835757?text=${encodeURIComponent(`Halo! Saya ingin pesan ${name}. Berapa harganya?`)}`}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex w-full items-center justify-center gap-2 rounded-sm bg-[#25D366] px-3 py-2 font-sans text-xs font-semibold text-white transition hover:bg-[#1da851]"
          >
            <MessageCircle className="h-3.5 w-3.5" strokeWidth={1.5} /> Beli via WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
