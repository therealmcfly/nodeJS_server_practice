const express = require("express");
const app = express();

const { products } = require("./public/data");
const newProducts = products.map((product) => {
  const { id, name, price } = product;
  return { id, name, price };
});

app.use(express.static("./public"));

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
  res.status(200).json(sortedProducts);
});

app.all("*", (req, res) => {
  res.status(400).send("<h1>Invalid Path</h1>");
});

app.listen(5000, () => {
  console.log("server is listening on port 5000......");
});
