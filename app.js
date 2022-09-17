const express = require("express");
const path = require("path");

const app = express();

// const name = path.resolve("index.html");
// console.log(name);

// app.get("/", (req, res) => {
//   res.status(200).send("Home Page");
// });

// app.get("/about", (req, res) => {
//   res.status(200).send("About Page");
// });

app.use(express.static("./html"));

app.all("*", (req, res) => {
  res.status(400).send("<h1>Invalid Path</h1>");
});

app.listen(5000, () => {
  console.log("server is running");
});
