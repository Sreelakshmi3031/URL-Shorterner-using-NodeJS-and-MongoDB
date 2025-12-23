// Import Express framework
const express = require("express");

// Import MongoDB connection function
const { connectToMongoDB } = require("./connect");

// Import URL routes
const urlRoute = require("./routes/url");

// Import URL model to interact with database
const URL = require("./models/url");

// Create Express app
const app = express();

// Define port number
const PORT = 8001;

/**
 * Connect to MongoDB database
 * If connection is successful, log a message
 */
connectToMongoDB("mongodb://localhost:27017/url-shortener").then(() =>
  console.log("Mongodb connected")
);

// Middleware to parse JSON request bodies
app.use(express.json());

/**
 * Route handler for URL-related routes
 * All routes inside urlRoute will start with /url
 * Example:
 * POST /url
 * GET  /url/analytics/:shortId
 */
app.use("/url", urlRoute);

/**
 * Redirect Route
 * This route handles short URLs
 * Example:
 * http://localhost:8001/abc123xy
 */
app.get("/:shortId", async (req, res) => {
  // Get shortId from URL
  const shortId = req.params.shortId;

  // Find the URL in database and update visit history
  const entry = await URL.findOneAndUpdate(
    { shortId }, // find by shortId
    {
      // push visit timestamp into visitHistory array
      $push: {
        visitHistory: {
          timestamp: Date.now(),
        },
      },
    }
  );

  // Redirect user to the original URL
  res.redirect(entry.redirectURL);
});

/**
 * Start the server
 */
app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
