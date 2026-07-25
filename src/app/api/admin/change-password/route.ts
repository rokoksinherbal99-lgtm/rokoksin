import { NextResponse } from "next/server";
import crypto from "crypto";
import { checkAuth, hashPassword, verifyPassword, unauthorized, destroyAllSessions, createSession } from "@/lib/admin-auth";
import { db } from "@/db";
import { settings } from "@/db/schema";
import { eq } from "drizzle-orm";
import { logPasswordChange } from "@/lib/api/audit";
import { checkCSRF } from "@/lib/api/security";
import { checkRateLimit } from "@/lib/rate-limit";

function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) {
    crypto.timingSafeEqual(bufA, Buffer.alloc(bufA.length));
    return false;
  }
  return crypto.timingSafeEqual(bufA, bufB);
}

export async function POST(req: Request) {
  try {
    if (!await checkAuth(req)) return unauthorized();
    const csrfRes = checkCSRF(req);
    if (csrfRes) return csrfRes;
    const rl = await checkRateLimit(req, 10);
    if (rl) return rl;

    const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
    if (!ADMIN_PASSWORD) {
      return NextResponse.json({ error: "Admin not configured" }, { status: 500 });
    }

    const { currentPassword, newPassword } = await req.json();

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current password dan new password wajib diisi" }, { status: 400 });
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "Password baru minimal 8 karakter" }, { status: 400 });
    }

    if (newPassword.length > 128) {
      return NextResponse.json({ error: "Password baru maksimal 128 karakter" }, { status: 400 });
    }

    const dbRow = await db.select().from(settings).where(eq(settings.key, "admin_password_hash")).limit(1);
    const dbHash = dbRow.length > 0 ? dbRow[0].value : null;

    const envMatch = safeCompare(currentPassword, ADMIN_PASSWORD);
    let dbMatch = false;
    if (dbHash) {
      if (dbHash.startsWith("$2")) {
        dbMatch = await verifyPassword(currentPassword, dbHash);
      } else {
        dbMatch = safeCompare(currentPassword, ADMIN_PASSWORD);
      }
    }

    if (!envMatch && !dbMatch) {
      return NextResponse.json({ error: "Password saat ini salah" }, { status: 401 });
    }

    const newHash = await hashPassword(newPassword);

    if (dbRow.length > 0) {
      await db.update(settings).set({ value: newHash, updatedAt: new Date() }).where(eq(settings.key, "admin_password_hash"));
    } else {
      await db.insert(settings).values({ key: "admin_password_hash", value: newHash });
    }

    await logPasswordChange();
    await destroyAllSessions();

    const sessionId = await createSession();
    const res = NextResponse.json({ success: true, message: "Password berhasil diubah" });
    res.cookies.set("admin_token", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return res;
  } catch (err) {
    console.error("Change password error:", err);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}
