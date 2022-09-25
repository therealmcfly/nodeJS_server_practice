const { people } = require("../public/data");

const getPeople = (req, res) => {
  res.status(200).json({ success: true, data: people });
};

const getPerson = (req, res) => {
  const { id } = req.params;
  if (!people.find((person) => person.id == Number(id))) {
    res.status(400).json({
      success: false,
      msg: `The person id '${Number(id)}' does not exist in the people data`,
    });
    console.log(`GET Failed : id '${Number(id)}' does not exist`);
  } else {
    const person = people.find((person) => person.id === Number(id));
    res.status(200).json({ success: true, data: person });
    console.log("GET Successful");
  }
};

const addPerson = (req, res) => {
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
};

const updatePerson = (req, res) => {
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
};

const deletePerson = (req, res) => {
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
};

module.exports = {
  getPeople,
  getPerson,
  addPerson,
  updatePerson,
  deletePerson,
};
