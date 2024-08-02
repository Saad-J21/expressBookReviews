const express = require("express");
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
  //Write your code here
  if (!req.body.username || !req.body.password)
    res.status(400).json({ message: "Provide username and password!" });
  else if (users.find((user) => user.username === req.body.username))
    res.status(409).json({ message: "This username is already in use!" });
  else {
    users.push({ username: req.body.username, password: req.body.password });
    res.status(201).json({ message: "Customer registered. You can login" });
  }
});

// Get the book list available in the shop
// public_users.get("/", function (req, res) {
//   //Write your code here
//   return res.status(200).json({ books });
// });
public_users.get("/", (req, res) => {
  const fetchBooks = () => new Promise((resolve) => resolve(books));
  fetchBooks().then((data) => {
    return res.status(200).json({ books: data });
  });
});

// Get book details based on ISBN
// public_users.get("/isbn/:isbn", function (req, res) {
//   //Write your code here

//   return res.status(200).json(books[req.params.isbn]);
// });
public_users.get("/isbn/:isbn", function (req, res) {
  //Write your code here
  const fetchBook = () =>
    new Promise((resolve) => resolve(books[req.params.isbn]));
  fetchBook().then((data) => {
    return res.status(200).json(data);
  });
});

// Get book details based on author
// public_users.get("/author/:author", function (req, res) {
//   //Write your code here
//   const booksKeys = Object.keys(books);
//   let booksByAuthor = [];
//   for (let i = 0; i < booksKeys.length; i++) {
//     const book = books[booksKeys[i]];
//     if (book["author"] === req.params.author) {
//       booksByAuthor.push({
//         isbn: i + 1,
//         title: book.title,
//         reviews: book.reviews,
//       });
//     }
//   }
//   return res.status(200).json({ booksByAuthor });
// });
public_users.get("/author/:author", function (req, res) {
  //Write your code here
  const fetchBook = () =>
    new Promise((resolve) => {
      const booksKeys = Object.keys(books);
      let booksByAuthor = [];
      for (let i = 0; i < booksKeys.length; i++) {
        const book = books[booksKeys[i]];
        if (book["author"] === req.params.author) {
          booksByAuthor.push({
            isbn: i + 1,
            title: book.title,
            reviews: book.reviews,
          });
        }
      }
      return resolve(booksByAuthor);
    });
  fetchBook().then((data) => {
    return res.status(200).json({ booksByAuthor: data });
  });
});

// Get all books based on title
// public_users.get("/title/:title", function (req, res) {
//   //Write your code here
//   const booksKeys = Object.keys(books);
//   let booksByTitle = [];
//   for (let i = 0; i < booksKeys.length; i++) {
//     const book = books[booksKeys[i]];
//     if (book["title"] === req.params.title) {
//       booksByTitle.push({
//         isbn: i + 1,
//         author: book.author,
//         reviews: book.reviews,
//       });
//     }
//   }
//   return res.status(200).json({ booksByTitle });
// });
public_users.get("/title/:title", function (req, res) {
  //Write your code here
  const fetchBook = () =>
    new Promise((resolve) => {
      const booksKeys = Object.keys(books);
      let booksByTitle = [];
      for (let i = 0; i < booksKeys.length; i++) {
        const book = books[booksKeys[i]];
        if (book["title"] === req.params.title) {
          booksByTitle.push({
            isbn: i + 1,
            author: book.author,
            reviews: book.reviews,
          });
        }
      }
      return resolve(booksByTitle);
    });
  fetchBook().then((data) => {
    return res.status(200).json({ booksByTitle: data });
  });
});

//  Get book review
public_users.get("/review/:isbn", function (req, res) {
  //Write your code here
  return res.status(200).json(books[req.params.isbn]["reviews"]);
});

module.exports.general = public_users;
