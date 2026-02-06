import { Request, Response } from "express";
import { db } from "../db";

// GET all posts (with search)
export const getPosts = async (req: Request, res: Response) => {
  const search = req.query.search as string;

  let query = "SELECT * FROM posts";
  let values: any[] = [];

  if (search) {
    query += " WHERE title LIKE ? OR content LIKE ?";
    values.push(`%${search}%`, `%${search}%`);
  }

  const [rows] = await db.query(query, values);
  res.json(rows);
};

// GET single post
export const getPostById = async (req: Request, res: Response) => {
  const [rows]: any = await db.query(
    "SELECT * FROM posts WHERE id = ?",
    [req.params.id]
  );

  res.json(rows[0]);
};

// CREATE post
export const createPost = async (req: Request, res: Response) => {
  const { title, content, user_id } = req.body;

  await db.query(
    "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
    [title, content, user_id]
  );

  res.status(201).json({ message: "Post created" });
};

// UPDATE post
export const updatePost = async (req: Request, res: Response) => {
  const { title, content } = req.body;

  await db.query(
    "UPDATE posts SET title = ?, content = ? WHERE id = ?",
    [title, content, req.params.id]
  );

  res.json({ message: "Post updated" });
};

// DELETE post
export const deletePost = async (req: Request, res: Response) => {
  await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
  res.json({ message: "Post deleted" });
};
