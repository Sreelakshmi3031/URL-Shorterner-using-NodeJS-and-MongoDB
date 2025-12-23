// Import mongoose to work with MongoDB
const mongoose = require("mongoose");

/**
 * Define the schema (structure) for URL documents
 * This tells MongoDB how our data should look
 */
const urlSchema = new mongoose.Schema(
  {
    // Stores the generated short URL ID (e.g., "abc123xy")
    shortId: {
      type: String, // Must be a string
      required: true, // Cannot be empty
      unique: true, // Must be unique for each URL
    },

    // Stores the original long URL
    redirectURL: {
      type: String, // Must be a string
      required: true, // Cannot be empty
    },

    // Keeps track of each visit to the short URL
    // Each visit stores a timestamp
    visitHistory: [
      {
        timestamp: {
          type: Number, // Time in milliseconds (Date.now())
        },
      },
    ],
  },
  {
    // Automatically adds:
    // createdAt → when document was created
    // updatedAt → when document was last updated
    timestamps: true,
  }
);

// Create a model from the schema
// This model lets us interact with the "urls" collection
const URL = mongoose.model("url", urlSchema);

// Export the model so it can be used in other files
module.exports = URL;
