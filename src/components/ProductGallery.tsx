"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);
  const list = images.length > 0 ? images : ["/images/product-1.svg"];

  return (
    <div>
      <div className="group relative aspect-[4/3] overflow-hidden rounded-xl border border-border bg-muted shadow-sm">
        <Image
          src={list[active]}
          alt={name}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          priority
        />
      </div>
      {list.length > 1 && (
        <div className="mt-3 grid grid-cols-4 gap-3">
          {list.map((src, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              className={`relative aspect-square overflow-hidden rounded-lg border bg-muted transition ${
                i === active ? "border-primary ring-2 ring-ring" : "border-border hover:border-foreground/40"
              }`}
            >
              <Image src={src} alt={`${name} ${i + 1}`} fill unoptimized sizes="96px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
