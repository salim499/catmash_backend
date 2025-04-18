const { Pool } = require("pg");

// Set up PostgreSQL connection (Render requires SSL)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

// ─────────────────────────────────────────────
// GET / - Show home page
// ─────────────────────────────────────────────
exports.showHomePage = async (req, res) => {
  res.send("Welcome to the Cat API 🐱");
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
exports.fetchCatsCount = async (req, res) => {};

// ─────────────────────────────────────────────
// POST /cats/:id/score - Update the score of a specific cat
// ─────────────────────────────────────────────
exports.updateCatScore = async (req, res) => {};
