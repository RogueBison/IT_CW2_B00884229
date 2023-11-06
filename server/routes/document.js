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
    const db_connect = await dbo.getDb("sample_mflix");
    const result = await db_connect.collection("users").find({}).toArray();
    res.json(result);
  } catch (err) {
    throw err;
  }
});

documentRoutes.route("/document/add").post(async function (req, response) {
  try {
    let db_connect = dbo.getDb();
    let myobj = {
      name: req.body.name,
      email: req.body.email,
    };

    const result = await db_connect.collection("users").insertOne(myobj);

    response.json(result);
  } catch (err) {
    console.error(err);
    response.status(500).json({ error: "An error occurred while adding a document." });
  }
});

documentRoutes.route("/update/:id").post(async function (req, response) {
  try {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        name: req.body.name,
        email: req.body.email,
      },
    };

    const result = await db_connect.collection("users").updateOne(myquery, newvalues);

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

    const result = await db_connect.collection("users").deleteOne(myquery);

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