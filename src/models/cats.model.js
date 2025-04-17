const { Pool } = require("pg");

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

console.log(pool);
