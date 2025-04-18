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
exports.fetchAllCats = async (req, res) => {};

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
