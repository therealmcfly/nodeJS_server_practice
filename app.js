const express = require("express");
const app = express();

// made middleware
const logger = require("./logger");
const authorize = require("./authorize");

//router module
const people = require("./routes/people");
const products = require("./routes/products");
//created middleware
app.use(logger);
// app.use("/api", authorize);
//static assets middleware
app.use(express.static("./public"));
// parse form data middleware
app.use(express.urlencoded({ extended: false }));
// parse json middleware
app.use(express.json());

//router middlewares
app.use("/api/people", people);
app.use("/api/products", products);

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    res.send(`Welcome ${name}`);
  } else {
    res.status(404).send("Please Provide a Name");
  }
});

// app.get("/api/v1/query", (req, res) => {
//   const { search, limit } = req.query;
//   let sortedProducts = [...products];
//   if (search) {
//     sortedProducts = sortedProducts.filter((product) => {
//       return product.name.startsWith(search);
//     });
//   }
//   if (limit) {
//     sortedProducts = sortedProducts.slice(0, Number(limit));
//   }
//   if (sortedProducts.length < 1) {
//     return res.status(200).send("no products match the search value");
//     // return res.status(200).json({ success: true, data: [] });
//   }
//   return res.status(200).json(sortedProducts);
// });

app.all("*", (req, res) => {
  res.status(400).send("<h1>Invalid Path</h1>");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000......");
});
