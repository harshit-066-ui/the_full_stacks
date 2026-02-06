import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET() {
  const [rows] = await db.query(`
    SELECT c.id, c.is_group, c.name
    FROM chats c
    ORDER BY c.created_at ASC
  `);
  return NextResponse.json(rows);
}
