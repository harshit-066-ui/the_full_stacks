"use client";

import { useEffect, useState } from "react";

type Chat = {
  id: number;
  name: string | null;
  is_group: boolean;
};

type ChatSidebarProps = {
  username: string;
  currentChatId: number;
  onSelectChat: (chat_id: number) => void;
};

export default function ChatSidebar({ username, currentChatId, onSelectChat }: ChatSidebarProps) {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    async function fetchChats() {
      const res = await fetch("/api/chats");
      const data = await res.json();
      setChats(data);
    }
    fetchChats();
  }, []);

  return (
    <div className="w-60 border-r p-4 flex flex-col gap-2">
      <h2 className="font-semibold text-lg mb-2">Chats</h2>
      {chats.map((chat) => (
        <button
          key={chat.id}
          onClick={() => onSelectChat(chat.id)}
          className={`p-2 rounded text-left ${
            chat.id === currentChatId ? "bg-blue-200" : "hover:bg-gray-100"
          }`}
        >
          {chat.is_group ? chat.name : "Private Chat"}
        </button>
      ))}
    </div>
  );
}
