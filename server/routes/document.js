const express = require("express");
 
// documentRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /document.
const documentRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will get a list of all the film documents.
documentRoutes.route("/document").get(async function (req, res) {
  try {
    const db_connect = await dbo.getDb("book_review_cw2");
    const result = await db_connect.collection("Books").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

// This section will help you get a single record by id
documentRoutes.route("/document/:id").get(async function (req, res) {
  try {
    let db_connect = dbo.getDb();
    let myquery = { _id: new ObjectId(req.params.id) };
    let result = await db_connect.collection("Books").findOne(myquery);

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching the record." });
  }
});


documentRoutes.route("/document/add").post(async function (req, response) {
  try {
    let db_connect = dbo.getDb();
    let myobj = {
      title: req.body.title,
      authors: req.body.authors,
      genres: req.body.genres,
      rating: req.body.rating,
      description: req.body.description,
      year: req.body.year,
    };

    const result = await db_connect.collection("Books").insertOne(myobj);

    response.json(result);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "An error occurred while adding a document." });
  }
});

documentRoutes.route("/update/:id").post(async function (req, response) {
  try {
    let db_connect = dbo.getDb();
    let myquery = { _id: new ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        title: req.body.title,
        authors: req.body.authors,
        genres: req.body.genres,
        rating: req.body.rating,
        description: req.body.description,
        year: req.body.year,
      },
    };

    const result = await db_connect.collection("Books").updateOne(myquery, newvalues);

    console.log("1 document updated");
    response.json(result);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "An error occurred while updating a document." });
  }
});

documentRoutes.route("/:id").delete(async (req, response) => {
  try {
    let db_connect = dbo.getDb();
    let myquery = { _id: new ObjectId(req.params.id) };

    const result = await db_connect.collection("Books").deleteOne(myquery);

    if (result.deletedCount === 1) {
      console.log("1 document deleted");
      response.json({ message: "Document deleted successfully." });
    } else {
      response.status(404).json({ error: "Document not found." });
    }
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "An error occurred while deleting a document." });
  }
});


module.exports = documentRoutes;