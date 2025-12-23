// Import mongoose to connect Node.js with MongoDB
const mongoose = require("mongoose");

/**
 * Function to connect to MongoDB
 * @param {string} url - MongoDB connection string
 * @returns {Promise} - Resolves when connection is successful
 */
async function connectToMongoDB(url) {
  // Connect mongoose to MongoDB using the provided URL
  return mongoose.connect(url);
}

// Export the function so it can be used in app.js or server.js
module.exports = {
  connectToMongoDB,
};
