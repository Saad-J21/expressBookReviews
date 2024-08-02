const express = require("express");
const jwt = require("jsonwebtoken");
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
  //returns boolean
  //write code to check is the username is valid
};

const authenticatedUser = (username, password) => {
  //returns boolean
  //write code to check if username and password match the one we have in records.
  const user = users.find((u) => u.username === username);
  return user.username === username && user.password === password;
};

//only registered users can login
regd_users.post("/login", (req, res) => {
  //Write your code here
  const { username, password } = req.body;
  if (authenticatedUser(username, password)) {
    // Generate JWT access token
    let accessToken = jwt.sign(
      {
        data: password,
      },
      "access",
      { expiresIn: 60 * 60 }
    );

    // Store access token and username in session
    req.session.authorization = {
      accessToken,
      username,
    };
    return res.status(200).send("User successfully logged in");
  } else {
    return res
      .status(208)
      .json({ message: "Invalid Login. Check username and password" });
  }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Invalid isbn!" });
  const reviews = book["reviews"];
  reviews[req.session.authorization.username] = req.query.review;
  console.log(books);
  return res
    .status(200)
    .send("The review for the book with ISBN has been added/updated.");
});
regd_users.delete("/auth/review/:isbn", (req, res) => {
  //Write your code here
  const book = books[req.params.isbn];
  if (!book) return res.status(404).json({ message: "Invalid isbn!" });
  const reviews = book["reviews"];
  console.log(reviews);
  delete reviews[req.session.authorization.username];
  console.log(reviews);
  console.log(books);
  return res
    .status(200)
    .send(
      `Reviews for the ISBN posted by the user ${req.session.authorization.username} deleted.`
    );
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
