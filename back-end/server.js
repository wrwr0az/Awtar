// Require necessary NPM packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// Instantiate Express Application Object
const app = express();

/*** Middleware ***/

// Add `bodyParser` middleware which will parse JSON requests
// into JS objects before they reach the route files.
//
// The method `.use` sets up middleware for the Express application
app.use(express.json());

//Don't forget to install cors (npm i cors)
const cors = require("cors");

const PORT = process.env.PORT || 5000;
//Make sure to add to your whitelist any website or APIs that connect to your backend.
var whitelist = [`http://localhost:${PORT}`, "https://awtar.herokuapp.com"];

var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      var message =
        "The CORS policy for this application does not allow access from origin " +
        origin;
      callback(new Error(message), false);
    }
  },
};

app.use(cors(corsOptions));

const Message = require("./models/services.js");
const User = require("./models/users.js");
const Cookies = require("js-cookie");

// Require Route Files
const indexRouter = require("./routes/index");
const MessagesRouter = require("./routes/messages");
const UserRouter = require("./routes/login");

// Require DB Configuration File
const db_url = require("./db");
console.log("db url is :", db_url);
// Establish Database Connection
mongoose.connect(db_url, { useNewUrlParser: true });
mongoose.connection.once("open", () => {
  console.log("Connected to Mongo");
});

// app.get("/api/", (req, res) => {
//   console.log("get /");
//   res.json("result from back-end server.js");
// });

app.get("/api/Messages", (req, res) => {
  console.log("get /Messages");

  Message.find({}, (err, messages) => {
    if (err) {
      console.log(err);
    }
    res.json(messages);
  });
});

app.get("/api/login/:user/:pass", (req, res) => {
  console.log("THIS FROM SERVER.js Line 42: ");
  let data = "";
  User.findOne({ userName: req.params.user }, (err, user) => {
    if (err) {
      console.log("Error from server.js line 45: ", err);
      res.json(false);
    } else if (user.password === req.params.pass) {
      // Cookies.set("name", "value");
      // console.log(Cookies.get());
      res.json(user.userName);
      console.log(
        "user name is: " + user.userName + ", password is: " + user.password
      );
    } else {
      res.json(false);
      console.log("user name or password is incorrect");
    }

    console.log("User data is: ", user.userName);
  });
});

const reactPort = 3000;
// Set CORS headers on response from this API using the `cors` NPM package.
// app.use(
//   cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}` })
// );

/*** Routes ***/

// Mount imported Routers

// app.use(indexRouter);
app.use("/api", MessagesRouter);
app.use("/api", UserRouter);

// app.use('/',indexRouter);
// app.use('/articles',articlesRouter);

/*** Routes ***/
// Define PORT for the API to run on

// Start the server to listen for requests on a given port
// app.listen(PORT, () => {
//   console.log(`Awtar => http://localhost:${PORT}`);
// });

//serves all our static files from the build directory.
app.use(express.static(path.join(__dirname, "front-end/build")));

// After all routes
// This code essentially serves the index.html file on any unknown routes.
app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "front-end/build", "index.html"));
  console.log("dir name is: ", __dirname);
});

app.listen(PORT);

/*
  C.R.U.D - Actions Table

  Create          CREATE
  Read
    Read All      INDEX
    Read By ID    SHOW
  Update          UPDATE
  Delete          DESTROY
*/

/*
const messages = [
  {
    name: "wrwr",
    email: "wrwr@wrwr.com",
    mobileNumber: "05111111111",
    location: "1",
    message: "11111111",
  },

  {
    name: "seerde",
    email: "seerde@seerde.com",
    mobileNumber: "052222222",
    location: "2",
    message: "22222222",
  },

  {
    name: "abdo",
    email: "abdo@abdo.com",
    mobileNumber: "05333333",
    location: "3",
    message: "3333333",
  },

  {
    name: "Jouza",
    email: "Jouza@gmail.com",
    mobileNumber: "054444444",
    location: "4",
    message: "4444444",
  },
];

// changed seedData to newVampires
Message.insertMany(messages, (err, message) => {
  if (err) {
    console.log(err);
  }
  console.log("added provided message data", message);
  mongoose.connection.close();
});

*/

// To insert User to Database
/*
User.insertMany(
  {
    name: "Abdulaziz",
    email: "az@gmail.com",
    mobileNumber: "0544",
    userName: "wrwr",
    password: "wrwr",
  },
  (err, user) => {
    if (err) {
      console.log("userError:", err);
    }
    console.log("user add to database", user);
    mongoose.connection.close();
  }
);
*/
