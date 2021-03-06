module.exports = (users, secret) => {
  let express = require("express");
  let router = express.Router();

  //JSON Web Token used for encapsulating a user's identity - it's like a password, but temporary
  //JWTs are not visible for end-users, they only know they are logged in to a website
  const jwt = require("jsonwebtoken");
  
  //Bcrypt is the library that help us hashing the passwords, that it's using salting mechanism to improve security
  //Salt is just a random value added to normal password 
  const bcrypt = require("bcryptjs");

  //Post user credentials
  router.post("/", (req, res) => {
    // TODO: Implement user account creation
    res.status(501).json({ msg: "POST new user not implemented" });
  });

  //Update user's credentials
  router.put("/", (req, res) => {
    // TODO: Implement user update (change password, etc).
    res.status(501).json({ msg: "PUT update user not implemented" });
  });

  // This route takes a username and a password and create an auth token
  router.post("/authenticate", (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
      let msg = "Username or password missing!";
      console.error(msg);
      res.status(401).json({ msg: msg });
      return;
    }

    const user = users.find(user => user.username === username);
    if (user) {
      // If the user is found
      bcrypt.compare(password, user.hash, (err, result) => {
        if (result) {
          // If the password matched
          const payload = { username: username };
          const token = jwt.sign(payload, secret, { expiresIn: "1h" });

          res.json({
            msg: `User '${username}' authenticated successfully`,
            token: token
          });
        } else res.status(401).json({ msg: "Password mismatch!" });
      });
    } else {
      res.status(404).json({ msg: "User not found!" });
    }
  });

  return router;
};
