//External libraries
const express = require("express");
const bodyParser = require("body-parser"); //useful to take data in from the request and send that data to a database
const cors = require("cors");
const morgan = require("morgan"); // Log out all http requests to the console
const checkJwt = require("express-jwt"); // Check for access tokens automatically
const bcrypt = require("bcryptjs"); // Used for hashing passwords!

//Configuration
const appName = "Express API Template";
const app = express(); // Get the express app.
const port = process.env.PORT || 8080; // Pick either port 8080 or the port in the PORT env variable.

//Using the depencies
//server.use(bodyParser.json()); // Parse JSON from the request body
app.use(bodyParser.json());
app.use(cors()); // Enable Cross Origin Resource Sharing across all routes. Basically open up your API to everyone.
app.use(morgan("combined"));
app.use(express.static("../client/build")); // Only needed when running build in production mode
//const io = require("socket.io").listen(server);

/***************************Users middlewares ***********************************************/
// Open paths that do not need login. Any route not included here is protected!

let openPaths = [{ url: "/api/users/authenticate", methods: ["POST"] }];

// Validate the user using authentication. checkJwt checks for auth token.
const secret = "book is useful";
app.use(checkJwt({ secret: secret }).unless({ path: openPaths }));

// This middleware checks the result of checkJwt

app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    // If the user didn't authorize correctly
    res.status(401).json({ error: err.message }); // Return 401 with error message.
  } else {
    next(); // If no errors, send request to next middleware or route handler
  }
});


/*************************** Users **********************************************************/
// Next time I will store users in MongoDB using Mongoose instead of this.
const users = [
  // There are 2 types of users - admin and client 
  // The passwords are in clear text for testing purposes
  { id: 0, username: "admin", password: "123", admin: true },
  { id: 1, username: "client", password: "123", admin: false }
];


// Creating more test data: We run through all users and add a hash of their password to each.
//Hashing is an output value that it should come from an input user value and it makes impossible to read the declared password

users.forEach(user => {
  bcrypt.hash(user.password, 10, function(err, hash) {
    user.hash = hash; // The hash has been made, and is stored on the user object.
    delete user.password; // The clear text password is no longer needed
    //console.log(`Hash generated for ${user.username}`, user); // For testing purposes
  });
});

/**** Start! ****/

// Require and connect the books
require("./Models/db")
  .connectDb()
  .then(async dbObject => {
    await dbObject.randomBooks(); // Fill in test data if needed.

    /****************Routes */

    let libraryRouter = require("./Routes/library_router")(dbObject);
    app.use("/api/categories", libraryRouter);

    let usersRouter = require("./Routes/users_router")(users, secret);
    app.use("/api/users", usersRouter);

    // When DB connection is ready, open the API for access
    app.listen(port, () => {
      console.log(`${appName} API running on port ${port}!`);
    });
  })
  .catch(error => console.error(error));
