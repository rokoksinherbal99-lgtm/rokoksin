import { NextResponse } from "next/server";
import { db } from "@/db";
import { auditLogs } from "@/db/schema";
import { desc } from "drizzle-orm";
import { checkAuth, unauthorized } from "@/lib/admin-auth";
import { checkRateLimit } from "@/lib/rate-limit";

export async function GET(req: Request) {
  if (!await checkAuth(req)) return unauthorized();
  const rl = await checkRateLimit(req, 60);
  if (rl) return rl;
  try {
    const logs = await db.select().from(auditLogs).orderBy(desc(auditLogs.createdAt)).limit(50);
    return NextResponse.json(logs);
  } catch (err) {
    console.error("Admin audit logs error:", err);
    return NextResponse.json({ error: "Failed to fetch audit logs" }, { status: 500 });
  }
}
