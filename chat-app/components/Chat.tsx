"use client";

import { useState } from "react";
import ChatInput from "./ChatInput";
import ChatMessage from "./ChatMessage";
import UserList from "./UserList";
import ChatSidebar from "./ChatSidebar";
import useSocket from "@/hooks/useSocket";

type ChatProps = {
  username: string;
};

export default function Chat({ username }: ChatProps) {
  const [currentChatId, setCurrentChatId] = useState(1);
  const { messages, sendMessage, onlineUsers, isConnected } = useSocket(username, currentChatId);

  return (
    <div className="flex h-full max-w-5xl w-full border rounded-lg overflow-hidden">
      <ChatSidebar
        username={username}
        currentChatId={currentChatId}
        onSelectChat={setCurrentChatId}
      />

      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
          {messages.map((msg) => (
            <ChatMessage
              key={msg.id ?? Math.random()}
              {...msg}
              type="chat"  
              isOwn={msg.sender_name === username}
            />
          ))}
        </div>

        <UserList users={onlineUsers} />
        <ChatInput onSend={sendMessage} disabled={!isConnected} />
      </div>
    </div>
  );
}
