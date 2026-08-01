export function formatPrice(price: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
}

export function slugify(text: string) {
  return text.toLowerCase().replace(/\s+/g, "-").replace(/[^\w-]+/g, "");
}

export function parseImages(images: string | null | undefined): string[] {
  if (!images) return [];
  const trimmed = images.trim();
  if (!trimmed) return [];
  if (trimmed.startsWith("[")) {
    try {
      const arr = JSON.parse(trimmed);
      return Array.isArray(arr) ? arr.filter((u) => typeof u === "string" && u) : [trimmed];
    } catch {
      return [trimmed];
    }
  }
  return [trimmed];
}

export function serializeImages(images: string[]): string {
  const cleaned = images.map((u) => u.trim()).filter(Boolean);
  return JSON.stringify(cleaned);
}
