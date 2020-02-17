const express = require("express");
const mysql = require("mysql");

const app = express();

// Create Connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "secret",
  database: "nodemysql"
});

// Connect
db.connect(err => {
  if (err) throw err;
  console.log("Mysql connected");
});

app.get("/createdb", (req, res) => {
  let query = "CREATE DATABASE nodemysql";

  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Database Created...");
  });
});

app.get("/createpoststable", (req, res) => {
  let query =
    "CREATE TABLE posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY (id))";

  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post Table Created.");
  });
});

// Insert post 1
app.get("/addpost1", (req, res) => {
  let post = {
    title: "Post 1",
    body: "This is post 1"
  };

  let query = "INSERT INTO posts SET ?";
  db.query(query, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post one added");
  });
});

// Insert post 2
app.get("/addpost2", (req, res) => {
  let post = {
    title: "Post 2",
    body: "This is post 2"
  };

  let query = "INSERT INTO posts SET ?";
  db.query(query, post, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send("Post Two added");
  });
});

// Get posts
app.get("/getposts", (req, res) => {
  let query = "SELECT * FROM posts";
  db.query(query, (err, results) => {
    if (err) throw err;
    console.log(results);
    res.send("Post Fetched");
  });
});

// Select post
app.get("/getpost/:id", (req, res) => {
  let query = `SELECT * FROM posts WHERE id = ${req.params.id}`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`post ${req.params.id} fetched`);
  });
});

// Update post
app.get("/updatepost/:id", (req, res) => {
  let newTitle = "Updated Title";
  let query = `UPDATE posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`post ${req.params.id} updated`);
  });
});

// Delete Post
app.get("/deletepost/:id", (req, res) => {
  let query = `DELETE FROM posts WHERE id = ${req.params.id}`;
  db.query(query, (err, result) => {
    if (err) throw err;
    console.log(result);
    res.send(`post ${req.params.id} deleted`);
  });
});

app.listen("3000", () => {
  console.log("server run on port 3000");
});
