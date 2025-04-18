// Import Express
const express = require("express");

// Create a new router
const router = express.Router();

// Import the cats controller
const controller = require("../controllers/cats.controller.js");

// ─────────────────────────────────────────────
// Define routes and link them to controller functions
// ─────────────────────────────────────────────
router.get("/", controller.showHomePage);
router.get("/cats", controller.fetchAllCats);
router.get("/cats/count", controller.fetchCatsCount);
router.get("/cats/random", controller.fetchRandomCats);
router.get("/cats/:id", controller.fetchCatById);
router.put("/cats/:id/score", controller.updateCatScore);

// Export the router
module.exports = router;
