import WebSocket, { WebSocketServer } from "ws";
import { db } from "./lib/db";

interface WSMessage {
  id?: number;
  chat_id: number;
  sender_id: number;
  sender_name?: string;
  content: string;
  created_at?: string;
  deleted_at?: string | null;
}

interface WSClient {
  username: string;
  user_id: number;
  chat_id: number;
}

const wss = new WebSocketServer({ port: 3001 });
const clients = new Map<WebSocket, WSClient>();

async function getMessages(chat_id: number) {
  const [rows] = await db.query(`
    SELECT m.id, m.chat_id, m.sender_id, u.username AS sender_name, m.content, m.created_at, m.deleted_at
    FROM messages m
    JOIN users u ON m.sender_id = u.id
    WHERE m.chat_id = ? AND deleted_at IS NULL
    ORDER BY m.created_at ASC
  `, [chat_id]);
  return rows as WSMessage[];
}

async function getOnlineUsers(chat_id: number) {
  return Array.from(clients.values())
    .filter(c => c.chat_id === chat_id)
    .map(c => c.username);
}

wss.on("connection", async (ws, req) => {
  const url = new URL(req.url!, `http://${req.headers.host}`);
  const username = url.searchParams.get("username") || "Guest";
  const chat_id = parseInt(url.searchParams.get("chat_id") || "1");

  // Get user ID
  const [userRows] = await db.query("SELECT id FROM users WHERE username = ?", [username]);
  const user = (userRows as any[])[0];
  if (!user) {
    ws.close();
    return;
  }

  clients.set(ws, { username, user_id: user.id, chat_id });

  // Send existing messages for the chat
  const messages = await getMessages(chat_id);
  messages.forEach(msg => ws.send(JSON.stringify(msg)));

  // Send online users
  ws.send(JSON.stringify({ type: "users", users: await getOnlineUsers(chat_id) }));

  ws.on("message", async (data) => {
    const msg = JSON.parse(data.toString()) as WSMessage;
    msg.created_at = new Date().toISOString();
    msg.sender_id = user.id;
    msg.chat_id = chat_id;

    // Save to DB
    const [result] = await db.query(
      "INSERT INTO messages (chat_id, sender_id, content, created_at) VALUES (?, ?, ?, ?)",
      [msg.chat_id, msg.sender_id, msg.content, msg.created_at]
    );
    msg.id = (result as any).insertId;
    msg.sender_name = username;

    // Broadcast to all clients in this chat
    for (const [clientWs, clientData] of clients.entries()) {
      if (clientData.chat_id === chat_id && clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify(msg));
      }
    }
  });

  ws.on("close", () => {
    clients.delete(ws);
    // Update online users for the chat
    for (const [clientWs, clientData] of clients.entries()) {
      if (clientData.chat_id === chat_id && clientWs.readyState === WebSocket.OPEN) {
        clientWs.send(JSON.stringify({ type: "users", users: getOnlineUsers(chat_id) }));
      }
    }
  });
});

console.log("WebSocket server running on ws://localhost:3001");
