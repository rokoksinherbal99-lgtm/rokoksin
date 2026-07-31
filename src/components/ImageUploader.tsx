"use client";

import { useCallback, useRef, useState } from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function ImageUploader({ value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState(value);
  const [dragOver, setDragOver] = useState(false);

  const upload = useCallback(async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setUploading(true);
    const fd = new FormData();
    fd.set("file", file);
    try {
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (data.url) {
        setPreview(data.url);
        onChange(data.url);
      }
    } catch {
      // fallback: base64
      const reader = new FileReader();
      reader.onload = () => {
        const b64 = reader.result as string;
        setPreview(b64);
        onChange(b64);
      };
      reader.readAsDataURL(file);
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }, [upload]);

  const handleFile = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) upload(file);
  }, [upload]);

  return (
    <div>
      <label className="block text-sm font-medium text-foreground mb-1">Gambar Produk</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
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
        ) : preview ? (
          <div className="relative w-full">
            <img src={preview} alt="Preview" className="mx-auto max-h-48 rounded-lg object-contain" />
            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); setPreview(""); onChange(""); }}
              className="absolute right-0 top-0 rounded-full bg-red-500 p-1 text-white shadow hover:bg-red-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-muted-foreground">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="text-sm">Seret gambar ke sini atau klik untuk upload</p>
            <p className="text-xs">PNG, JPG, WebP, SVG max 2MB</p>
          </div>
        )}
        <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml,image/gif" onChange={handleFile} className="hidden" />
      </div>
      <div className="mt-2">
        <label className="block text-xs font-medium text-muted-foreground">Atau masukkan URL gambar manual</label>
        <input
          type="text"
          value={value}
          onChange={(e) => { onChange(e.target.value); setPreview(e.target.value); }}
          placeholder="/images/product.svg"
          className="mt-1 w-full rounded-lg border px-3 py-1.5 text-sm"
        />
      </div>
    </div>
  );
}
