import { useEffect, useRef, useState } from "react";

type Message = {
  id?: number;
  chat_id: number;
  sender_id: number;
  sender_name?: string;
  content: string;
  created_at?: string;
  deleted_at?: string | null;
};

export default function useSocket(username: string, chat_id: number) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket(`ws://localhost:3001?username=${username}&chat_id=${chat_id}`);
    socketRef.current = socket;

    socket.onopen = () => setIsConnected(true);

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "users") setOnlineUsers(data.users);
      else setMessages((prev) => [...prev, data]);
    };

    socket.onclose = () => {
      setIsConnected(false);
      console.log("Disconnected from WS server");
    };

    return () => socket.close();
  }, [username, chat_id]);

  const sendMessage = (content: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) return;
    socketRef.current.send(JSON.stringify({ type: "chat", content }));
  };

  return { messages, sendMessage, onlineUsers, isConnected };
}
