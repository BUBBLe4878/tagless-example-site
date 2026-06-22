import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

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

export async function DELETE(request) {
  try {
    const { row, col } = await request.json();
    await pool.query(
      "DELETE FROM pixel_data WHERE row_num = $1 AND col_num = $2",
      [row, col]
    );
    return Response.json({ message: "Pixel deleted" });
  } catch (err) {
    return Response.json({ error: "Failed to delete pixel" }, { status: 500 });
  }
}