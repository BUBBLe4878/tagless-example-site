require("dotenv").config();
const express = require("express");
const pg = require("pg");
const cors = require("cors");
const WebSocket = require("ws");
const http = require("http");

const app = express();
const PORT = 3000;
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static("."));

// PostgreSQL Connection Pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// Store connected clients
const clients = new Map();

// WebSocket connection
wss.on("connection", (ws) => {
  const clientId = Math.random().toString(36).substring(7);
  clients.set(clientId, ws);
  console.log(`Client connected: ${clientId}`);

  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data);
      message.clientId = clientId; // Add clientId to message

      // Broadcast to all other clients
      clients.forEach((client, id) => {
        if (id !== clientId && client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    } catch (err) {
      console.error("WebSocket message error:", err);
    }
  });

  ws.on("close", () => {
    clients.delete(clientId);
    console.log(`Client disconnected: ${clientId}`);
  });
});

// Initialize database on startup
async function initializeDatabase() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pixel_data (
        id SERIAL PRIMARY KEY,
        row_num INT NOT NULL,
        col_num INT NOT NULL,
        value INT NOT NULL,
        UNIQUE(row_num, col_num)
      );
    `);
    console.log("✓ Database table created/verified");
  } catch (err) {
    console.error("Database initialization error:", err);
  }
}

// API Routes (same as before)
app.get("/api/pixels", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pixel_data");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching pixels:", err);
    res.status(500).json({ error: "Failed to fetch pixels" });
  }
});

app.post("/api/pixels", async (req, res) => {
  try {
    const { row, col, value } = req.body;
    const result = await pool.query(
      `INSERT INTO pixel_data (row_num, col_num, value)
       VALUES ($1, $2, $3)
       ON CONFLICT (row_num, col_num) 
       DO UPDATE SET value = $3
       RETURNING *`,
      [row, col, value],
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error saving pixel:", err);
    res.status(500).json({ error: "Failed to save pixel" });
  }
});

app.post("/api/pixels/cleanup", async (req, res) => {
  try {
    await pool.query(`
      DELETE FROM pixel_data
      WHERE id NOT IN (
        SELECT MIN(id)
        FROM pixel_data
        GROUP BY row_num, col_num
      )
    `);
    res.json({ message: "Duplicates cleared" });
  } catch (err) {
    console.error("Error cleaning duplicates:", err);
    res.status(500).json({ error: "Failed to clean duplicates" });
  }
});

// Start server
server.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await initializeDatabase();
});