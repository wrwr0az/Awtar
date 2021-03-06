// Creating a base name for the MongoDB
const mongooseBaseName = "Awtar";

// Create the MongoDB URI for Development and Test
const database = {
  development: `mongodb://localhost/${mongooseBaseName}-development`,
  test: `mongodb://localhost/${mongooseBaseName}-test`,
};

// Identify if development environment is Test or Development
// select DB based on wether a test file was executed before `server.js`
//process.env.TESTENV ? database.test :
const localDB = database.development;

// Environment variable MONGODB_URL will be available in
// Heroku production environment, otherwise use Test or Development DB
const currentDB = process.env.MONGODB_URL || localDB;

// Export the appropriate database based om the current environment
module.exports = currentDB;
