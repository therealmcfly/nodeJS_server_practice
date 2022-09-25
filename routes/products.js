const express = require("express");
const router = express.Router();

const { getProducts, getProduct } = require("../controllers/product");

router.get("/", getProducts);

router.get("/:productID", getProduct);

module.exports = router;
