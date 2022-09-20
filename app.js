const express = require("express");
const app = express();

// made middleware
const logger = require("./logger");
const authorize = require("./authorize");

const { products, people } = require("./public/data");
const newProducts = products.map((product) => {
  const { id, name, price } = product;
  return { id, name, price };
});

//static assets middleware
app.use([express.static("./public"), logger]);
// parse form data middleware
app.use(express.urlencoded({ extended: false }));
// app.use("/api", authorize);
// parse json middleware
app.use(express.json());

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});
app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res
      .status(400)
      .json({ success: false, msg: "please provide a name value" });
  }
  res.status(201).send({ success: true, person: name });
});

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    res.send(`Welcome ${name}`);
  } else {
    res.status(404).send("Please Provide a Name");
  }
});

app.get("/api/products", (req, res) => {
  res.json(newProducts);
});

app.get("/api/products/:productID", (req, res) => {
  const { productID } = req.params;
  const singleProduct = newProducts.find(
    (product) => product.id === Number(productID)
  );
  res.json(singleProduct);
});

app.get("/api/v1/query", (req, res) => {
  const { search, limit } = req.query;
  let sortedProducts = [...products];
  if (search) {
    sortedProducts = sortedProducts.filter((product) => {
      return product.name.startsWith(search);
    });
  }
  if (limit) {
    sortedProducts = sortedProducts.slice(0, Number(limit));
  }
  if (sortedProducts.length < 1) {
    return res.status(200).send("no products match the search value");
    // return res.status(200).json({ success: true, data: [] });
  }
  return res.status(200).json(sortedProducts);
});

app.all("*", (req, res) => {
  res.status(400).send("<h1>Invalid Path</h1>");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000......");
});
