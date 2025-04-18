const { Pool } = require("pg");

// Connect to PostgreSQL
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ─────────────────────────────────────────────
// GET / - Show home page
// ─────────────────────────────────────────────
exports.showHomePage = async (req, res) => {
  try {
    res.send("Welcome to the Cat API 🐱");
  } catch (err) {
    console.error(err);
    res.status(500).send("Oups, error");
  }
};

// ─────────────────────────────────────────────
// GET /cats - Fetch all cats with optional pagination
// ─────────────────────────────────────────────
exports.fetchAllCats = async (req, res) => {
  // Parse the offset from the query parameters (default to 0 if not provided)
  const offset = parseInt(req.query.offset) || 0;
  // Parse the limit from the query parameters (default to 10 if not provided)
  const limit = parseInt(req.query.limit) || 10;

  try {
    // Execute a SQL query to fetch images, ordered by score in descending order
    const result = await pool.query(
      "SELECT * FROM images ORDER BY score DESC LIMIT $1 OFFSET $2",
      [limit, offset]
    );

    // Send the result (list of images) as a JSON response
    res.json(result.rows);
  } catch (err) {
    // Log any errors and Send an error message in case of failure
    console.error(err);
    res.status(500).send("Error fetching images");
  }
};

// ─────────────────────────────────────────────
// GET /cats/:id - Fetch a single cat by its ID
// ─────────────────────────────────────────────
exports.fetchCatById = async (req, res) => {};

// ─────────────────────────────────────────────
// GET /cats/random - Fetch one or more random cats
// Optional query: count, exclude (comma-separated list of IDs)
// ─────────────────────────────────────────────
exports.fetchRandomCats = async (req, res) => {};

// ─────────────────────────────────────────────
// GET /cats/count - Fetch total number of cats
// ─────────────────────────────────────────────
exports.fetchCatsCount = async (req, res) => {
  try {
    // Execute a SQL query to count the total number of cats in the "images" table
    const result = await pool.query("SELECT COUNT(*) AS count FROM images");

    // Send the result as a JSON response with the count as an integer
    res.json({ count: parseInt(result.rows[0].count, 10) });
  } catch (err) {
    // Log any errors and send error message in case of failure
    console.error(err);
    res.status(500).send("Error counting cats");
  }
};

// ─────────────────────────────────────────────
// POST /cats/:id/score - Update the score of a specific cat
// ─────────────────────────────────────────────
exports.updateCatScore = async (req, res) => {};
