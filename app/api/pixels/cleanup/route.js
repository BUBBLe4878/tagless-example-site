import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(request) {
  try {
    await pool.query(`
      DELETE FROM pixel_data
      WHERE id NOT IN (
        SELECT MIN(id)
        FROM pixel_data
        GROUP BY row_num, col_num
      )
    `);
    return Response.json({ message: "Duplicates cleared" });
  } catch (err) {
    return Response.json({ error: "Failed to clean duplicates" }, { status: 500 });
  }
}