import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const db = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "K1@1y1d1e1n",
  database: process.env.DB_NAME || "nexmora_db",
  waitForConnections: true,
  connectionLimit: 10
});

db.getConnection((err, connection) => {
  if (err) console.error("MySQL connection failed:", err);
  else {
    console.log("MySQL connected successfully!");
    connection.release();
  }
});
