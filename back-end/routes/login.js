// Require necessary NPM packages
const express = require("express");
const mongoose = require("mongoose");

// Require Mongoose Model for Message
const User = require("../models/users");

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/*
  C.R.U.D - Actions Table

  Create          CREATE
  Read
    Read All      INDEX
    Read By ID    SHOW
  Update          UPDATE
  Delete          DESTROY
*/

/**
 * Action:        SHOW
 * Method:        GET
 * URI:           articles/:id
 * Description:   Get An Article by Article ID
 */

// another way (using Callback, and without extra thing)
router.get("/login/:user", (req, res) => {
  console.log("PARAMS:", req.params);
  // mongoose.Types.ObjectId ('4ed3ede8844f0f351100000c')
  User.find(req.params.user, (err, foundArticle) => {
    if (err) {
      res.json(err);
    } else {
      res.json(foundArticle);
    }
  });
});

/**
 * Action:        INDEX
 * Method:        GET
 * URI:           /articles
 * Description:   Get All Articles
 */
router.get("/monitoring/login", (req, res) => {
  res.json("Test");
});

// Export the Router so we can use it in the server.js file
module.exports = router;
