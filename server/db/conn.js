const { MongoClient } = require("mongodb");
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);
 
var _db;
 
module.exports = {
  connectToServer: async function () {
      try {
          const db = await client.connect();
          // Verify we got a good "db" object
          if (db) {
              _db = db.db("book_review_cw2");
              console.log("Successfully connected to MongoDB.");
          }
          return _db;
      } catch (err) {
          throw err;
      }
  },

  getDb: function () {
      return _db;
  },
};