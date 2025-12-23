// Import nanoid library to generate unique short IDs
const { nanoid } = require("nanoid");

// Import the URL model (MongoDB schema)
const URL = require("../models/url");

/**
 * Controller to generate a new short URL
 * This function is called when the user sends a URL to shorten
 */
async function handleGenerateNewShortURL(req, res) {
  // Get the request body sent by the client
  const body = req.body;

  // If URL is not provided, return an error response
  if (!body.url) {
    return res.status(400).json({ error: "url is required" });
  }

  // Generate a unique short ID of length 8
  const shortId = nanoid(8);

  // Save the URL data in the database
  await URL.create({
    shortId: shortId, // short URL ID
    redirectURL: body.url, // original long URL
    visitHistory: [], // stores click timestamps later
  });

  // Send the generated short ID back to the client
  return res.json({ id: shortId });
}

/**
 * Controller to get analytics for a short URL
 * Shows how many times the URL was clicked
 */
async function handleGetAnalytics(req, res) {
  // Get shortId from URL parameters
  const shortId = req.params.shortId;

  // Find the URL document in the database
  const result = await URL.findOne({ shortId });

  // Send analytics data to the client
  return res.json({
    totalClicks: result.visitHistory.length, // total number of visits
    analytics: result.visitHistory, // detailed visit data
  });
}

// Export the functions so they can be used in routes
module.exports = {
  handleGenerateNewShortURL,
  handleGetAnalytics,
};
