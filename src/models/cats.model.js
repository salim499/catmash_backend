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
    // Send Welcome message
    res.send("Welcome to the Cat API 🐱");
  } catch (err) {
    console.error(err);
    // Log any errors and Send an error message in case of failure
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
      "SELECT * FROM images ORDER BY score DESC, id ASC LIMIT $1 OFFSET $2",
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
exports.fetchCatById = async (req, res) => {
  // Destructure the 'id' parameter from the request URL
  const { id } = req.params;

  try {
    // Execute a SQL query to fetch a specific image by its ID
    const result = await pool.query("SELECT * FROM images WHERE id = $1", [id]);

    // If no image is found
    if (result.rows.length === 0) {
      return res.status(404).send("Image not found");
    }

    // Send the fetched image as a JSON response
    res.json(result.rows[0]);
  } catch (err) {
    // Log any errors and send err message in case failure
    console.error(err);
    res.status(500).send("Error fetching the image");
  }
};

// ─────────────────────────────────────────────
// GET /cats/random - Fetch one or more random cats
// Optional query: count, exclude (comma-separated list of IDs)
// ─────────────────────────────────────────────
exports.fetchRandomCats = async (req, res) => {
  // Destructure the 'exclude' query parameter
  const { exclude } = req.query;

  // Check if 'exclude' is an array or a single value, and convert it into an array
  const excludeIds = Array.isArray(exclude)
    ? exclude
    : exclude
    ? [exclude]
    : [];

  // Parse the 'limit' query parameter, default to 1 if not provided
  const limit = parseInt(req.query.limit) || 1;

  try {
    // Start building the base SQL query to fetch images
    let query = "SELECT * FROM images";
    // Array to hold the query parameters (used for placeholders)
    let params = [];

    // If there are IDs to exclude, add a WHERE clause to filter out those images
    if (excludeIds.length > 0) {
      const placeholders = excludeIds.map((_, i) => `$${i + 1}`).join(", ");
      query += ` WHERE id NOT IN (${placeholders})`;
      params.push(...excludeIds);
    }

    // Add ORDER BY RANDOM() for random selection and apply the limit
    query += ` ORDER BY RANDOM() LIMIT $${params.length + 1}`;
    params.push(limit);

    // Execute the query with the dynamic parameters
    const result = await pool.query(query, params);

    // Send the result (random images) as a JSON response
    res.json(result.rows);
  } catch (err) {
    // Log any errors ans send error message
    console.error(err);
    res.status(500).send("Error fetching random cats");
  }
};

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
