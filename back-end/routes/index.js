// Require necessary NPM packages
const express = require("express");

// Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /
 * Description: Get the Root Route
 */
router.get("/", (req, res) => {
  res.json({
    message: "Welcome to Blogy",
  });
});

router.get("/test", (req, res) => {
  console.log("index.js");
  res.json({
    message: "test to index.js",
  });
});

// router.get("/Messages", (req, res) => {
//   console.log("index.js");
//   res.json(res);
// });

// Export the Router so we can use it in the server.js file
module.exports = router;
