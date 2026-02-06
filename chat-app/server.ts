import express, { Request, Response } from "express";
import next from "next";

const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  // Handle Next.js pages and API
  server.all("*", (req: Request, res: Response) => {
    return handle(req, res);
  });

  server.listen(3000, () => {
    console.log("Next.js server running on http://localhost:3000");
    console.log("Use ws-server.ts for WebSocket on port 3001");
  });
});
