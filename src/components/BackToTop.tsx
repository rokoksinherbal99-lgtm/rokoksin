"use client";

import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export default function BackToTop() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-24 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:bg-primary"
      aria-label="Kembali ke atas"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
}
