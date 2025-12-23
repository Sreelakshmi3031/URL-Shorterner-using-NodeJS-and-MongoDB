// Import Express framework
const express = require("express");

// Import controller functions
// These contain the actual logic for each route
const {
  handleGenerateNewShortURL,
  handleGetAnalytics,
} = require("../controllers/url");

// Create a new router instance
// Router helps organize routes in separate files
const router = express.Router();

/**
 * POST /
 * This route is used to create a new short URL
 * Example request body:
 * {
 *   "url": "https://example.com"
 * }
 */
router.post("/", handleGenerateNewShortURL);

/**
 * GET /analytics/:shortId
 * This route returns analytics for a short URL
 * :shortId is a dynamic parameter
 * Example:
 * /analytics/abc123xy
 */
router.get("/analytics/:shortId", handleGetAnalytics);

// Export router so it can be used in the main app file
module.exports = router;
