//ts was ai cuz idk backend
require("dotenv").config();

const express = require("express");
const pg = require("pg");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(".")); // Serves your HTML file

// PostgreSQL Connection Pool
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
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

// API Routes

// GET all pixel data
app.get("/api/pixels", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM pixel_data");
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching pixels:", err);
    res.status(500).json({ error: "Failed to fetch pixels" });
  }
});

// GET specific pixel
app.get("/api/pixels/:row/:col", async (req, res) => {
  try {
    const { row, col } = req.params;
    const result = await pool.query(
      "SELECT * FROM pixel_data WHERE row_num = $1 AND col_num = $2",
      [row, col]
    );
    res.json(result.rows[0] || null);
  } catch (err) {
    console.error("Error fetching pixel:", err);
    res.status(500).json({ error: "Failed to fetch pixel" });
  }
});

// POST/UPDATE a pixel
app.post("/api/pixels", async (req, res) => {
  try {
    const { row, col, value } = req.body;
    
    console.log(`Saving pixel: row=${row}, col=${col}, value=${value}`);

    const result = await pool.query(
      `INSERT INTO pixel_data (row_num, col_num, value)
       VALUES ($1, $2, $3)
       ON CONFLICT (row_num, col_num) 
       DO UPDATE SET value = $3
       RETURNING *`,
      [row, col, value]
    );

    console.log("Pixel saved successfully:", result.rows[0]);
    res.json(result.rows[0]);
  } catch (err) {
    console.error("❌ Error saving pixel:", err.message);
    console.error("Full error:", err);
    res.status(500).json({ error: "Failed to save pixel", details: err.message });
  }
});

// DELETE a pixel
app.delete("/api/pixels/:row/:col", async (req, res) => {
  try {
    const { row, col } = req.params;
    await pool.query(
      "DELETE FROM pixel_data WHERE row_num = $1 AND col_num = $2",
      [row, col]
    );
    res.json({ message: "Pixel deleted" });
  } catch (err) {
    console.error("Error deleting pixel:", err);
    res.status(500).json({ error: "Failed to delete pixel" });
  }
});

// Start server
app.listen(PORT, async () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  await initializeDatabase();
});