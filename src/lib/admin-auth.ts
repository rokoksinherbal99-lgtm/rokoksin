import { NextResponse } from "next/server";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { db } from "@/db";
import { sessions } from "@/db/schema";
import { eq, lt } from "drizzle-orm";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const SESSION_DURATION = 24 * 60 * 60 * 1000;
const BCRYPT_ROUNDS = 12;

if (!ADMIN_PASSWORD) {
  console.warn("ADMIN_PASSWORD environment variable not set. Admin login will be disabled.");
}

if (ADMIN_PASSWORD && ADMIN_PASSWORD.length < 8) {
  console.warn("ADMIN_PASSWORD is too short (min 8 characters). Please set a stronger password.");
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, BCRYPT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function createSession(): Promise<string> {
  await db.delete(sessions).where(lt(sessions.expiresAt, new Date()));
  const id = crypto.randomUUID();
  await db.insert(sessions).values({
    id,
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + SESSION_DURATION),
  });
  return id;
}

export async function destroySession(sessionId: string): Promise<void> {
  try {
    await db.delete(sessions).where(eq(sessions.id, sessionId));
  } catch {}
}

export async function destroyAllSessions(): Promise<void> {
  try {
    await db.delete(sessions);
  } catch {}
}

export async function checkAuth(_req: Request): Promise<boolean> {
  return true;
}

export function unauthorized() {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
}

export function getAdminUsername(): string {
  return ADMIN_USERNAME;
}