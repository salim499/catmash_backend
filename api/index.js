// Load environment variables from .env
require("dotenv").config();

// Import modules
const express = require("express");
const cors = require("cors");

// Import routes
const catsRoutes = require("../src/routes/cats.routes");

// Import the database function
// const syncImagesToDatabase = require("../src/db/database");

// Get the API URL from .env
// const url = `${process.env.API_BASE_URL}/data/cats.json`;

// Fetch images and save them to the database
// syncImagesToDatabase(url);

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/", catsRoutes);

// Define the port
const port = process.env.PORT || 5000;

// Start the server
app.listen(port, () => {
  console.log(`Server is running at port : ${port}`);
});
