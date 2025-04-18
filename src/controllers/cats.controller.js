// Import the model
// This allows us to separate the logic for data fetching and processing from the route handling
const model = require("../models/cats.model.js");

// Export functios from the model to be used by the routes
// Each exported function corresponds to specific  endpoint and cals the respective model function
exports.showHomePage = model.showHomePage;
exports.fetchAllCats = model.fetchAllCats;
exports.fetchCatById = model.fetchCatById;
exports.fetchRandomCats = model.fetchRandomCats;
exports.fetchCatsCount = model.fetchCatsCount;
exports.updateCatScore = model.updateCatScore;
