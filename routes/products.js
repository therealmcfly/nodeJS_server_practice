const express = require("express");
const router = express.Router();

let { products } = require("../public/data");

const newProducts = products.map((product) => {
  const { id, name, price } = product;
  return { id, name, price };
});

router.get("/", (req, res) => {
  res.json(newProducts);
});

router.get("/:productID", (req, res) => {
  const { productID } = req.params;
  const singleProduct = newProducts.find(
    (product) => product.id === Number(productID)
  );
  res.json(singleProduct);
});

router.get("/", (req, res) => {
  res.json(newProducts);
});

router.get("/:productID", (req, res) => {
  const { productID } = req.params;
  const singleProduct = newProducts.find(
    (product) => product.id === Number(productID)
  );
  res.json(singleProduct);
});

module.exports = router;
