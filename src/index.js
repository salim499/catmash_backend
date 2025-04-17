// Load environment variables from .env
require("dotenv").config();

// Import database function that fetches images data from a given URL and inserts it into the PostgreSQL 'images' table
const syncImagesToDatabase = require("./db/database");

syncImagesToDatabase(`${process.env.API_BASE_URL}/data/cats.json`);
