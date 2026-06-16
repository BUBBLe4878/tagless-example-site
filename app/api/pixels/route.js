//made by ai
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Initialize database
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
  } catch (err) {
    console.error("Database error:", err);
  }
}

initializeDatabase();

export async function GET(request) {
  try {
    const result = await pool.query("SELECT * FROM pixel_data");
    return Response.json(result.rows);
  } catch (err) {
    return Response.json({ error: "Failed to fetch pixels" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const { row, col, value } = await request.json();
    const result = await pool.query(
      `INSERT INTO pixel_data (row_num, col_num, value)
       VALUES ($1, $2, $3)
       ON CONFLICT (row_num, col_num) 
       DO UPDATE SET value = $3
       RETURNING *`,
      [row, col, value]
    );
    return Response.json(result.rows[0]);
  } catch (err) {
    return Response.json({ error: "Failed to save pixel" }, { status: 500 });
  }
}