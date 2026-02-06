import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { db } from "@/lib/db";

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const [rows] = await db.query(
    "SELECT * FROM users WHERE username = ?",
    [username]
  );
  const user = (rows as any[])[0];

  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return NextResponse.json({ error: "Invalid password" }, { status: 401 });

  return NextResponse.json({ message: "Login successful" });
}
