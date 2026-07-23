import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function initializeDatabase() {
  try {
    console.log('Initializing database...');

    // Create pixel_data table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS pixel_data (
        id SERIAL PRIMARY KEY,
        row_num INTEGER NOT NULL,
        col_num INTEGER NOT NULL,
        value INTEGER NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(row_num, col_num)
      )
    `);

    console.log('✅ Database initialized successfully');
    console.log('✅ pixel_data table created/verified');

    // Check if table has data
    const result = await pool.query('SELECT COUNT(*) FROM pixel_data');
    console.log(`✅ Table contains ${result.rows[0].count} pixels`);

  } catch (err) {
    console.error('❌ Error initializing database:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initializeDatabase();
