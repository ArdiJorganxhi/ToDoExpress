const db = require("../models");
const Task = db.tasks;

exports.addTask = async function (req, res) {
  let { content } = req.body;

  let checkIfTaskExists = await Task.findOne({
    where: {
      content: content,
    },
  });
  if (checkIfTaskExists) {
    return res.status(500).send({ message: "Task already exists!" });
  }
  let task = Task.create({
    user_id: req.user.dataValues.id,
    content: content,
  });

  return res.status(200).send({ message: "Task is created!" });
};

exports.findAllTasks = async function (req, res) {
  let tasks = await Task.findAll();

  return res.status(200).send(tasks);
};

exports.findTaskById = async function (req, res) {
  let { id } = req.params;

  let task = await Task.findOne({
    where: {
      id: id,
    },
  });

  if (task == null) {
    return res.status(400).send({ message: "Task doesn't exist!" });
  }

  return res.status(200).send(task);
};

exports.deleteTask = async function (req, res) {
  let { id } = req.params;
  let task = Task.update({ isActive: true }, { where: { id: id } });
  if (task == null) {
    return res.status(500).send({ message: "Task doesn't exist!" });
  }

  return res.status(200).send({ message: "Task is deleted successfully!" });
};
