const Person = require("../models/Person");
const fs = require("fs");
exports.create = async (req, res) => {
  try {
    const { name } = req.body;
    // console.log(data);
    const newData = {
      name: name,
      pic: req.file.filename,
    };
    console.log(req.file);
    res.json(await new Person(newData).save());
  } catch (err) {
    console.log(err);
    res.status(400).send("Create Person Failed");
  }
};
exports.list = async (req, res) => {
  res.json(await Person.find({}).sort({ createdAt: -1 }).exec());
};
exports.read = async (req, res) => {
  const persons = await Person.findOne({ _id: req.params.id }).exec();
  res.json(persons);
};
exports.update = async (req, res) => {
  const { name } = req.body;
  try {
    const updated = await Person.findOneAndUpdate(
      { _id: req.params.id },
      { name: name },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    console.log(err);
    res.status(400).send("Update Person Failed");
  }
  res.send("hello update person");
};
exports.remove = async (req, res) => {
  try {
    const deleted = await Person.findOneAndDelete({
      _id: req.params.id,
    });
    await fs.unlink(`./public/uploads/${deleted.pic}`, err => {
      if (err) {
        console.log(err);
      } else {
        console.log("remove success");
      }
    });
    // console.log(deleted);
    res.json(deleted);
  } catch (err) {
    console.log(err);
    res.status(400).send("Remove Person Failed");
  }
  //   res.send("hello remove person");
};
