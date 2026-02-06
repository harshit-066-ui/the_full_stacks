import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const hash = await bcrypt.hash(password, 10);

  await db.query("INSERT INTO users (username, password) VALUES (?, ?)", [
    username,
    hash,
  ]);

  return NextResponse.json({ message: "User registered successfully" });
}
