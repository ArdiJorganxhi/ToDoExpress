const db = require("../models");
const User = db.users;
const Task = db.tasks;

exports.findAll = async function (req, res) {
  let users = await User.findAll();

  return res.status(200).send(users);
};

exports.deleteUser = async function (req, res) {
  let { id } = req.params;

  let user = await User.destroy({
    where: {
      id: id,
    },
  });
  if (user == null) {
    return res.status(500).send({ message: "User doesn't exist!" });
  }

  return res.status(200).send({ message: "User is deleted!" });
};

exports.getTasks = async function (req, res) {
  let user = await User.findOne({
    where: {
      id: req.user.dataValues.id,
    },
  });

  if (user == null) {
    return res.status(500).send({ message: "User doesn't exist at all!" });
  }

  let tasks = await Task.findAll({
    where: {
      user_id: user.id,
      isActive: false,
    },
  });
  if (tasks == null) {
    return res
      .status(500)
      .send({ message: "This user doesn't have any tasks!" });
  }

  return res.status(200).send(tasks);
};
