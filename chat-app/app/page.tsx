"use client";
import React from "react";
import Chat from "@/components/Chat";
import { useSearchParams } from "next/navigation";

export default function HomePage() {
  const searchParams = useSearchParams();
  const username = searchParams.get("username") || "Guest";

  return (
    <div className="h-screen flex justify-center items-center">
      <Chat username={username} />
    </div>
  );
}
