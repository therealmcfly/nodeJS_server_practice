const express = require("express");
const app = express();

// made middleware
const logger = require("./logger");
const authorize = require("./authorize");

let { products, people } = require("./public/data");
const newProducts = products.map((product) => {
  const { id, name, price } = product;
  return { id, name, price };
});

//created middleware
app.use(logger);
// app.use("/api", authorize);
//static assets middleware
app.use(express.static("./public"));
// parse form data middleware
app.use(express.urlencoded({ extended: false }));
// parse json middleware
app.use(express.json());

app.post("/login", (req, res) => {
  const { name } = req.body;
  if (name) {
    res.send(`Welcome ${name}`);
  } else {
    res.status(404).send("Please Provide a Name");
  }
});

app.get("/api/people", (req, res) => {
  res.status(200).json({ success: true, data: people });
});

app.post("/api/people", (req, res) => {
  const { name } = req.body;
  if (!name) {
    res
      .status(400)
      .json({ success: false, msg: "please provide a name value" });
    console.log("Post Failed : Name value was not submited");
  } else {
    const newPeople = [
      ...people,
      {
        id: people.length + 1,
        name,
      },
    ];
    people = newPeople;
    res.status(201).send({ success: true, data: people });
    console.log("Post Successful");
  }
});

app.put("/api/people/:id", (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  if (!people.find((person) => person.id == Number(id))) {
    res.status(400).json({
      success: false,
      msg: `The person id '${Number(id)}' does not exist in the people data`,
    });
    console.log(`PUT Failed : id '${Number(id)}' does not exist`);
  } else if (!name) {
    res.status(400).json({
      success: false,
      msg: `Please input a name value to update`,
    });
    console.log(`PUT Failed : A name value to update was not provided`);
  } else {
    const updatedPeople = people.map((person) => {
      if (person.id === Number(id)) {
        const updatedPerson = { ...person, name };
        return updatedPerson;
      } else {
        return person;
      }
    });
    people = updatedPeople;
    console.log(updatedPeople);
    res.status(201).send({ success: true, data: people });
    console.log(
      `PUT Successful : Updated name value of person id '${Number(
        id
      )}' to "${name}"`
    );
  }
});

app.delete("/api/people/:id", (req, res) => {
  const { id } = req.params;
  if (!people.find((person) => person.id == Number(id))) {
    res.status(400).json({
      success: false,
      msg: `The person id '${Number(id)}' does not exist in the people data`,
    });
    console.log(`DELETE Failed : id '${Number(id)}' does not exist`);
  } else {
    const updatedPeople = people.filter((person) => person.id !== Number(id));
    people = updatedPeople;
    console.log(updatedPeople);
    res.status(201).send({ success: true, data: people });
    console.log(`DELETE Successful : Deleted person id '${Number(id)}'`);
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
