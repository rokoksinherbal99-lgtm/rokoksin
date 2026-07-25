import { NextRequest, NextResponse } from "next/server";
import { db } from "@/db";
import { orders, orderItems, products } from "@/db/schema";
import { eq, inArray } from "drizzle-orm";
import { checkCSRF } from "@/lib/api/security";
import { checkRateLimit, getClientIp, checkOrderSpam } from "@/lib/rate-limit";

const REQUIRED_FIELDS = ["customer", "email", "phone", "address", "city", "province", "postalCode"];
const FIVE_MIN = 5 * 60 * 1000;
const MAX_TOTAL = 50_000_000;
const MIN_TOTAL = 1_000;

const SUSPICIOUS_PATTERNS = [
  /\bhacker\b/i,
  /\bred\s*team\b/i,
  /\badmin\b/i,
  /<[^>]*>/,
  /['";]/,
  /(?:script|alert|prompt|eval|exec)/i,
];

const SUSPICIOUS_NAMES = ["hacker", "red team", "test", "admin", "root", "anonymous"];

function isSuspiciousName(name: string): boolean {
  const lower = name.toLowerCase().trim();
  for (const s of SUSPICIOUS_NAMES) {
    if (lower === s || lower.includes(s)) return true;
  }
  for (const p of SUSPICIOUS_PATTERNS) {
    if (p.test(name)) return true;
  }
  return false;
}

function isSuspiciousEmail(email: string): boolean {
  const e = email.toLowerCase().trim();
  if (!e.includes("@") || !e.includes(".")) return true;
  for (const s of SUSPICIOUS_NAMES) {
    if (e.includes(s)) return true;
  }
  if (SUSPICIOUS_PATTERNS.some((p) => p.test(e))) return true;
  return false;
}

function isSuspiciousField(value: string): boolean {
  if (SUSPICIOUS_PATTERNS.some((p) => p.test(value))) return true;
  return false;
}

export async function POST(req: NextRequest) {
  const rateLimitRes = await checkRateLimit(req, 10);
  if (rateLimitRes) return rateLimitRes;

  const csrfRes = checkCSRF(req);
  if (csrfRes) return csrfRes;

  const ip = getClientIp(req);

  try {
    const body = await req.json();

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Request body tidak valid" }, { status: 400 });
    }

    if (body._website && typeof body._website === "string" && body._website.length > 0) {
      return NextResponse.json({ error: "Request tidak valid" }, { status: 400 });
    }

    if (!body._timestamp || typeof body._timestamp !== "number") {
      return NextResponse.json({ error: "Request tidak valid" }, { status: 400 });
    }

    const now = Date.now();
    if (Math.abs(now - body._timestamp) > FIVE_MIN) {
      return NextResponse.json({ error: "Sesi habis, silakan muat ulang halaman" }, { status: 400 });
    }

    for (const field of REQUIRED_FIELDS) {
      if (!body[field] || typeof body[field] !== "string") {
        return NextResponse.json({ error: `Field ${field} wajib diisi` }, { status: 400 });
      }
      if (field === "customer" && isSuspiciousName(body[field])) {
        return NextResponse.json({ error: "Nama tidak valid" }, { status: 400 });
      }
      if (field === "email" && isSuspiciousEmail(body[field])) {
        return NextResponse.json({ error: "Email tidak valid" }, { status: 400 });
      }
      if (isSuspiciousField(body[field])) {
        console.warn(`Suspicious field ${field} from IP ${ip}: ${body[field]}`);
        return NextResponse.json({ error: `Field ${field} tidak valid` }, { status: 400 });
      }
    }

    if (!Array.isArray(body.items) || body.items.length === 0) {
      return NextResponse.json({ error: "Minimal 1 item dalam pesanan" }, { status: 400 });
    }

    if (typeof body.total !== "number" || body.total <= 0) {
      return NextResponse.json({ error: "Total tidak valid" }, { status: 400 });
    }

    if (body.total > MAX_TOTAL) {
      return NextResponse.json({ error: `Total pesanan melebihi batas maksimal Rp ${MAX_TOTAL.toLocaleString("id-ID")}` }, { status: 400 });
    }

    if (body.total < MIN_TOTAL && body.total > 0) {
      return NextResponse.json({ error: "Total pesanan terlalu rendah" }, { status: 400 });
    }

    if (await checkOrderSpam(ip)) {
      console.warn(`Blocked spam order from IP ${ip}`);
      return NextResponse.json({ error: "Terlalu banyak percobaan. Silakan hubungi admin via WA." }, { status: 429 });
    }

    const productIds = body.items.map((item: any) => item.id);
    for (const item of body.items) {
      if (!item.id || typeof item.id !== "string") {
        return NextResponse.json({ error: "ID produk tidak valid" }, { status: 400 });
      }
      if (!Number.isInteger(item.quantity) || item.quantity < 1 || item.quantity > 999) {
        return NextResponse.json({ error: "Quantity tidak valid" }, { status: 400 });
      }
    }
    const dbProducts = await db.select().from(products).where(inArray(products.id, productIds));
    const priceMap = new Map(dbProducts.map((p) => [p.id, p.price]));

    for (const item of body.items) {
      if (!priceMap.has(item.id)) {
        return NextResponse.json({ error: `Produk ${item.id} tidak ditemukan` }, { status: 400 });
      }
    }

    const serverTotal = body.items.reduce((sum: number, item: any) => {
      return sum + (priceMap.get(item.id) ?? 0) * item.quantity;
    }, 0);

    if (body.total !== serverTotal) {
      console.warn(`Price tampering from IP ${ip}: client=${body.total} server=${serverTotal}`);
      return NextResponse.json({ error: "Harga tidak valid, silakan muat ulang halaman" }, { status: 400 });
    }

    const orderId = crypto.randomUUID();

    const itemRows = body.items.map((item: any) => ({
      id: crypto.randomUUID(),
      orderId,
      productId: item.id,
      quantity: item.quantity,
      price: priceMap.get(item.id) ?? 0,
    }));

    await db.transaction(async (tx) => {
      await tx.insert(orders).values({
        id: orderId,
        customer: body.customer,
        email: body.email,
        phone: body.phone,
        address: body.address,
        city: body.city,
        province: body.province,
        postalCode: body.postalCode,
        total: serverTotal,
      });
      await tx.insert(orderItems).values(itemRows);
    });

    return NextResponse.json({ id: orderId });
  } catch (error) {
    console.error("Order creation error:", error);
    return NextResponse.json({ error: "Gagal membuat pesanan. Silakan coba lagi." }, { status: 500 });
  }
}
