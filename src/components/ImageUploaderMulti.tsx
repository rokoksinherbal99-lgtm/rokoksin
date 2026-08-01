"use client";

import { useCallback, useRef, useState } from "react";
import { parseImages } from "@/lib/utils";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function ImageUploaderMulti({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<string[]>(() => parseImages(value));
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const commit = useCallback((next: string[]) => {
    setImages(next);
    onChange(JSON.stringify(next));
  }, [onChange]);

  const upload = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    const fd = new FormData();
    fd.set("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        commit([...images, data.url]);
      }
    } catch {
      const reader = new FileReader();
      reader.onload = () => {
        const b64 = reader.result as string;
        commit([...images, b64]);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  }, [images, commit]);

  const handleFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((f) => upload(f));
  }, [upload]);

  const remove = useCallback((i: number) => {
    commit(images.filter((_, idx) => idx !== i));
  }, [images, commit]);

  const move = useCallback((i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= images.length) return;
    const next = [...images];
    [next[i], next[j]] = [next[j], next[i]];
    commit(next);
  }, [images, commit]);

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-foreground">Gambar Produk</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-6 transition ${
          dragOver ? "border-border bg-muted" : "border-border hover:border-border"
        }`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-border border-t-primary" />
            <span className="text-sm text-muted-foreground">Mengunggah...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm">Seret gambar ke sini atau klik untuk upload</p>
            <p className="text-xs">Bisa lebih dari 1 gambar · PNG, JPG, WebP, SVG max 2MB per file · arahkan kursor ke thumbnail untuk ubah urutan</p>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif" multiple onChange={(e) => { handleFiles(e.target.files); e.target.value = ""; }} className="hidden" />
      </div>

      {images.length > 0 && (
        <div className="mt-3 grid grid-cols-3 gap-3">
          {images.map((src, i) => (
            <div key={i} className="group relative overflow-hidden rounded-lg border border-border bg-muted">
              <img src={src} alt={`Gambar ${i + 1}`} className="aspect-square w-full object-cover" />
              <span className="absolute left-1.5 top-1.5 rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-semibold text-white">
                {i === 0 ? "Utama" : i + 1}
              </span>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-1 bg-gradient-to-t from-black/70 to-transparent p-1.5 opacity-0 transition group-hover:opacity-100">
                <button
                  type="button"
                  disabled={i === 0}
                  onClick={(e) => { e.stopPropagation(); move(i, -1); }}
                  className="rounded-md bg-white/90 p-1 text-black shadow transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Pindahkan gambar ${i + 1} ke kiri`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
                </button>
                <span className="text-[10px] font-semibold text-white">{i + 1} / {images.length}</span>
                <button
                  type="button"
                  disabled={i === images.length - 1}
                  onClick={(e) => { e.stopPropagation(); move(i, 1); }}
                  className="rounded-md bg-white/90 p-1 text-black shadow transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label={`Pindahkan gambar ${i + 1} ke kanan`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
                </button>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); remove(i); }}
                className="absolute right-1.5 top-1.5 rounded-full bg-red-500 p-1 text-white shadow transition hover:bg-red-600"
                aria-label={`Hapus gambar ${i + 1}`}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
              </button>
            </div>
          ))}
        </div>
      )}

      <div className="mt-2">
        <label className="block text-xs font-medium text-muted-foreground">Atau masukkan URL gambar manual (pisahkan dengan koma)</label>
        <input
          type="text"
          value={images.join(", ")}
          onChange={(e) => {
            const urls = e.target.value.split(",").map((u) => u.trim()).filter(Boolean);
            commit(urls);
          }}
          placeholder="https://...gambar1, https://...gambar2"
          className="mt-1 w-full rounded-lg border px-3 py-1.5 text-sm"
        />
      </div>
    </div>
  );
}
