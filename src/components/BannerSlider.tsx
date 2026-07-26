"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    id: 1,
    title: "Rokok Sin",
    subtitle: "Premium Herbal Cigarettes",
    description: "Nikmati sensasi rokok herbal premium dengan racikan rempah pilihan Nusantara.",
    cta: "Pesan Sekarang",
    href: "/products",
    gradient: "from-[#1A3626] via-[#2C4C3B] to-[#1A3626]",
    accent: "text-[#ABC1A7]",
    image: "/images/sin-trust.jpg",
  },
  {
    id: 2,
    title: "Kopi Mana Kopi",
    subtitle: "Khasiat Herbal dalam Setiap Tegukan",
    description: "Kopi herbal dengan campuran jahe, madu, adas, dan kapulaga yang menyehatkan dan nikmat.",
    cta: "Pesan Sekarang",
    href: "/products/kopi-mana-kopi",
    gradient: "from-[#2C4C3B] via-[#1A3626] to-[#2C4C3B]",
    accent: "text-[#ABC1A7]",
    image: "/images/kopi-mana-kopi.jpg",
  },
];

export default function BannerSlider() {
  const [current, setCurrent] = useState(0);

  const next = useCallback(() => setCurrent((p) => (p + 1) % slides.length), []);
  const prev = useCallback(() => setCurrent((p) => (p - 1 + slides.length) % slides.length), []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section className="relative overflow-hidden">
      {slides.map((slide, i) => (
        <div
          key={slide.id}
          className={`relative transition-all duration-700 ease-in-out ${
            i === current ? "opacity-100" : "absolute inset-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className={`relative bg-gradient-to-r ${slide.gradient} min-h-[500px] md:min-h-[600px]`}>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.08)_0%,_transparent_60%)]" />
            <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-8 px-4 py-16 md:flex-row md:py-20">
              <div className="flex-1 text-center md:text-left">
                <p className={`font-serif text-lg italic ${slide.accent}`}>{slide.subtitle}</p>
                <h2 className="mt-3 font-serif text-4xl font-bold tracking-tight text-white md:text-6xl md:leading-[1.1]">
                  {slide.title}
                </h2>
                <p className="mt-4 max-w-md font-sans text-base leading-relaxed text-white/60 md:text-lg">
                  {slide.description}
                </p>
                <Link
                  href={slide.href}
                  className="mt-8 inline-flex items-center gap-2 border border-white/20 bg-white/10 px-7 py-3.5 font-sans text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
                >
                  {slide.cta}
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </Link>
              </div>
              <div className="flex-1">
                <div className="relative mx-auto aspect-square max-w-[380px] md:mx-0 md:ml-auto">
                  <div className="absolute inset-0 rounded-full bg-white/5 blur-2xl" />
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    width={380}
                    height={380}
                    className="relative z-10 h-full w-full object-contain drop-shadow-2xl"
                    unoptimized
                    priority={i === 0}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-5 w-5" strokeWidth={1.5} />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full border border-white/20 bg-black/20 p-2 text-white backdrop-blur-sm transition hover:bg-white/20"
        aria-label="Next slide"
      >
        <ChevronRight className="h-5 w-5" strokeWidth={1.5} />
      </button>

      <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`h-2 rounded-full transition-all ${
              i === current ? "w-8 bg-white" : "w-2 bg-white/40"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
