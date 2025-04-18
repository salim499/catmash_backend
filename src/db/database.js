// Import Axios for making HTTP requests
const axios = require("axios");

// Import the Pool class from 'pg' to manage PostgreSQL connections
const { Pool } = require("pg");

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ─────────────────────────────────────────────
// Fetches images data from a given URL and inserts it into the PostgreSQL 'images' table
// ─────────────────────────────────────────────
const syncImagesToDatabase = async (url) => {
  try {
    // Fetch cats images from the latelier API URL
    const response = await axios.get(url);

    // Get a client from the PostgreSQL connection pool
    const client = await pool.connect();

    // Drop the table (for fresh insertion)
    await client.query(`DROP TABLE IF EXISTS images`);

    // Create the table
    await client.query(`
      CREATE TABLE images (
        id TEXT PRIMARY KEY,
        name TEXT,
        url TEXT,
        score INTEGER
      )
    `);

    // Prepare insert statements
    const insertQuery = `
      INSERT INTO images (id, name, url, score)
      VALUES ($1, $2, $3, $4)
      ON CONFLICT (id) DO NOTHING
    `;

    // Loop through each image returned by the API response
    for (const image of response.data.images) {
      await client.query(insertQuery, [
        image.id, // Unique ID of the image
        `chat ${response.data.images.indexOf(image) + 1}`, // Assign a name like 'chat 1', 'chat 2', etc.
        image.url, // URL of the image
        0, // Default score value
      ]);
    }

    // Release the database client back to the connection pool
    client.release();

    console.log("✅ Images inserted into PostgreSQL successfully!");
  } catch (error) {
    console.error("❌ Error fetching or inserting data:", error);
  }
};

// Export syncImagesToDatabase
module.exports = syncImagesToDatabase;
