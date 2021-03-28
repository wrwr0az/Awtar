require("dotenv").config();
// Require necessary NPM packages
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// Instantiate Express Application Object
const app = express();

/*
for new LOGIN CODE
*/

const cookieParser = require("cookie-parser");
const { verify } = require("jsonwebtoken");
const { hash, compare } = require("bcrypt");
const {
  createAccessToken,
  createRefreshToken,
  sendAccessToken,
  sendRefreshToken,
} = require("./tokens.js");
const { isAuth } = require("./isAuth.js");
const { fakeDB } = require("./fakeDB.js");

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

/*** Middleware ***/

// Add `bodyParser` middleware which will parse JSON requests
// into JS objects before they reach the route files.
//
// The method `.use` sets up middleware for the Express application
app.use(express.json());

//Don't forget to install cors (npm i cors)
// const cors = require("cors");

const PORT = process.env.PORT || 5000;
//Make sure to add to your whitelist any website or APIs that connect to your backend.
var whitelist = [`http://localhost:${PORT}`, "https://awtar.herokuapp.com"];

// var corsOptions = {
//   origin: function (origin, callback) {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       var message =
//         "The CORS policy for this application does not allow access from origin " +
//         origin;
//       callback(new Error(message), false);
//     }
//   },
// };

// app.use(cors(corsOptions));

const Message = require("./models/services.js");
const User = require("./models/users.js");
const Cookies = require("js-cookie");

// Require Route Files
const indexRouter = require("./routes/index");
const MessagesRouter = require("./routes/messages");
const UserRouter = require("./routes/login");

// Require DB Configuration File
const db_url = require("./db");
// const { refreshToken } = require("./front-end/src/api.js");

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

// was get
// app.post("/api/login/", async (req, res) => {
//   console.log("THIS FROM SERVER.js Line 42: ");
//   let data = "";
//   const { userName, password } = req.body;
//   User.findOne({ userName: userName }, (err, user) => {
//    if (err) {
//        console.log("Error from server.js line 45: ", err);
//     res.json(false);
//      } else if (user.password === req.params.pass) {
//       // Cookies.set("name", "value");
//       // console.log(Cookies.get());
//       res.json(user.userName);
//       console.log(
//         "user name is: " + user.userName + ", password is: " + user.password
//        );
//      } else {
//        res.json(false);
//        console.log("user name or password is incorrect");
//      }

//      console.log("User data is: ", user.userName);
//    });
// });

// 1. Register a user
app.post("/api/register", async (req, res) => {
  let { name, email, mobileNumber, userName, password } = req.body;

  name = name ? name : "";
  email = email ? email : "";
  mobileNumber = mobileNumber ? mobileNumber : "";

  try {
    // 1. Check if the user exist
    const user = await User.findOne({ userName: userName });
    if (user) throw new Error("userName already exist");
    // 2. If not user exist already, hash the password
    if (password === "") throw new Error("Password can't be empty");
    const hashedPassword = await hash(password, 10);
    // 3. Insert the user in "database"
    // fakeDB.push({
    //   id: fakeDB.length,
    //   email,
    //   password: hashedPassword,
    // });
    const insertUser = await User.insertMany({
      name,
      email,
      mobileNumber,
      userName,
      password: hashedPassword,
    });
    res.send({ message: "User Created" });
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

const cors = require("cors");
app.use(
  cors({
    origin: "http://localhost:5000",
    credentials: true,
  })
);

// New CODE for LOGIN
// 2. Login a user
app.post("/api/login/", async (req, res) => {
  console.log("THIS IS FROM SERVER.js Line 147: ");
  const { userName, password } = req.body;

  try {
    // 1. Find user in array. If not exist send error
    const user = await User.findOne({ userName: userName });
    if (!user) throw new Error("User does not exist");
    // 2. Compare crypted password and see if it checks out. Send error if not
    // const valid = await compare(password, user.password);
    // if (!valid) throw new Error("Password not correct");

    const valid = user.password === password ? true : false;
    if (!valid) throw new Error("Password not correct");
    else {
      console.log("Password is correct");
    }
    // 3. Create Refresh- and Accesstoken
    const accesstoken = createAccessToken(user._id);
    const refreshtoken = createRefreshToken(user._id);
    // 4. Store Refreshtoken with user in "db"
    // Could also use different version numbers instead.
    // Then just increase the version number on the revoke endpoint
    // user.refreshtoken = refreshtoken;
    const updateRfreshToken = await User.updateOne(
      { _id: user._id },
      { $set: { refreshtoken: `${refreshtoken}` } }
    );

    // 5. Send token. Refreshtoken as a cookie and accesstoken as a regular response
    sendRefreshToken(res, refreshtoken);
    sendAccessToken(res, req, accesstoken);
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// 3. Logout a user
app.post("/api/logout/", (req, res) => {
  res.clearCookie("refreshtoken", { path: "/refresh_token" });
  // Logic here for also remove refreshtoken from db
  return res.send({
    message: "Logged out",
  });
});

// 4. Protected route
app.post("/api/protected", async (req, res) => {
  try {
    console.log(req.body);
    const userId = isAuth(req.body);
    if (userId !== null) {
      const data = true;
      res.send(data);
    }
  } catch (err) {
    res.send({
      error: `${err.message}`,
    });
  }
});

// 5. Get a new access token with a refresh token
app.post("/refresh_token", async (req, res) => {
  const token = req.cookies.refreshtoken;
  console.log("Token from RefreshToken POST", token);
  // If we don't have a token in our request
  if (!token) return res.send({ accesstoken: "" });
  // We have a token, let's verify it!
  let payload = null;
  try {
    payload = verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    return res.send({ accesstoken: "" });
  }
  // token is valid, check if user exist
  const user = await User.findOne({ _id: payload.userId });
  if (!user) return res.send({ accesstoken: "" });
  // user exist, check if refreshtoken exist on user

  /* في مشكلة في التوكين يتحدث كل شوية */
  // if (user.refreshtoken !== token) {
  //   return res.send({ accesstoken: "" });
  // }
  // token exist, create new Refresh- and accesstoken
  const accesstoken = createAccessToken(user._id);
  const refreshtoken = createRefreshToken(user._id);
  // update refreshtoken on user in db
  // Could have different versions instead!
  user.refreshtoken = refreshtoken;
  const updateRfreshToken = await User.updateOne(
    { _id: user._id },
    { $set: { refreshtoken: `${refreshtoken}` } }
  );
  // All good to go, send new refreshtoken and accesstoken
  sendRefreshToken(res, refreshtoken);
  return res.send({ accesstoken });
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
  // console.log("dir name is: ", __dirname);
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

// User.insertMany(
//   {
//     name: "Test",
//     email: "test@gmail.com",
//     mobileNumber: "001",
//     userName: "test",
//     password: "test",
//   },
//   (err, user) => {
//     if (err) {
//       console.log("userError:", err);
//     }
//     console.log("user add to database", user);
//     mongoose.connection.close();
//   }
// );
