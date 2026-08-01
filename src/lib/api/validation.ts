export const PRODUCT_ALLOWED_FIELDS = ["name", "slug", "description", "price", "images", "categoryId", "manufacturer", "stock", "featured", "batchNumber"] as const;

const MAX_NAME = 200;
const MAX_DESCRIPTION = 5000;
const MAX_SLUG = 100;
const MAX_MANUFACTURER = 200;
const MAX_BATCH = 50;
const MAX_IMAGES = 2000;
const MAX_PRICE = 100_000_000;
const MAX_STOCK = 1_000_000;

const IMAGE_DOMAINS = [
  "https://images.tridayasinergi.com",
  "https://lh3.googleusercontent.com",
];

export function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export function validateSlug(slug: string): boolean {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) && slug.length <= MAX_SLUG;
}

export function validateImageUrl(url: string): boolean {
  if (url.length > MAX_IMAGES) return false;
  const trimmed = url.trim();
  if (trimmed === "") return true;
  if (trimmed.startsWith("data:image/")) return true;
  if (trimmed.startsWith("https://")) {
    const host = new URL(trimmed).hostname;
    if (host.endsWith(".public.blob.vercel-storage.com")) return true;
  }
  return IMAGE_DOMAINS.some((d) => trimmed.startsWith(d));
}

function safeParseJsonArray(raw: string): string[] {
  try {
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed)) return parsed.filter((x) => typeof x === "string");
  } catch {}
  return [];
}

export interface ProductValidation {
  clean: Record<string, unknown>;
  errors: string[];
}

export function validateProductInput(body: Record<string, unknown>): ProductValidation {
  const clean: Record<string, unknown> = {};
  const errors: string[] = [];

  if (body.name !== undefined) {
    if (typeof body.name !== "string" || body.name.trim().length === 0) {
      errors.push("Nama produk tidak valid");
    } else if (body.name.length > MAX_NAME) {
      errors.push(`Nama produk maksimal ${MAX_NAME} karakter`);
    } else {
      clean.name = sanitize(body.name.trim());
    }
  }

  if (body.slug !== undefined) {
    if (typeof body.slug !== "string" || !validateSlug(body.slug)) {
      errors.push("Slug tidak valid (hanya huruf kecil, angka, dan tanda strip, maks 100)");
    } else {
      clean.slug = body.slug;
    }
  }

  if (body.description !== undefined) {
    if (typeof body.description !== "string") {
      errors.push("Deskripsi tidak valid");
    } else if (body.description.length > MAX_DESCRIPTION) {
      errors.push(`Deskripsi maksimal ${MAX_DESCRIPTION} karakter`);
    } else {
      clean.description = sanitize(body.description.trim());
    }
  }

  if (body.price !== undefined) {
    const price = Number(body.price);
    if (!Number.isInteger(price) || price <= 0 || price > MAX_PRICE) {
      errors.push(`Harga harus antara 1 dan ${MAX_PRICE.toLocaleString("id-ID")}`);
    } else {
      clean.price = price;
    }
  }

  if (body.stock !== undefined) {
    const stock = Number(body.stock);
    if (!Number.isInteger(stock) || stock < 0 || stock > MAX_STOCK) {
      errors.push(`Stok harus antara 0 dan ${MAX_STOCK.toLocaleString("id-ID")}`);
    } else {
      clean.stock = stock;
    }
  }

  if (body.images !== undefined) {
    if (typeof body.images !== "string") {
      errors.push("Gambar tidak valid");
    } else {
      const raw = body.images.trim();
      if (raw === "") {
        clean.images = "";
      } else {
        const urls = raw.startsWith("[") ? safeParseJsonArray(raw) : [raw];
        if (urls.length === 0) {
          errors.push("Gambar tidak valid");
        } else {
          const invalid = urls.find((u) => !validateImageUrl(u));
          if (invalid) {
            errors.push("URL gambar tidak dari sumber yang diizinkan");
          } else {
            clean.images = JSON.stringify(urls.map((u) => u.trim()).filter(Boolean));
          }
        }
      }
    }
  }

  if (body.categoryId !== undefined) {
    if (typeof body.categoryId !== "string" || body.categoryId.trim().length === 0) {
      errors.push("Kategori tidak valid");
    } else {
      clean.categoryId = body.categoryId.trim();
    }
  }

  if (body.manufacturer !== undefined) {
    if (typeof body.manufacturer !== "string") {
      errors.push("Produsen tidak valid");
    } else if (body.manufacturer.length > MAX_MANUFACTURER) {
      errors.push(`Produsen maksimal ${MAX_MANUFACTURER} karakter`);
    } else {
      clean.manufacturer = sanitize(body.manufacturer.trim());
    }
  }

  if (body.featured !== undefined) {
    clean.featured = Boolean(body.featured);
  }

  if (body.batchNumber !== undefined) {
    if (typeof body.batchNumber !== "string") {
      errors.push("Nomor batch tidak valid");
    } else if (body.batchNumber.length > MAX_BATCH) {
      errors.push(`Nomor batch maksimal ${MAX_BATCH} karakter`);
    } else {
      clean.batchNumber = sanitize(body.batchNumber.trim());
    }
  }

  return { clean, errors };
}
