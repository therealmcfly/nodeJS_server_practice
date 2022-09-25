let { products } = require("../public/data");

const newProducts = products.map((product) => {
  const { id, name, price } = product;
  return { id, name, price };
});

const getProducts = (req, res) => {
  res.json(newProducts);
};

const getProduct = (req, res) => {
  const { productID } = req.params;
  const singleProduct = newProducts.find(
    (product) => product.id === Number(productID)
  );
  res.json(singleProduct);
};

module.exports = { getProducts, getProduct };
