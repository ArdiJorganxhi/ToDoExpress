require("dotenv").config();
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;
const bcrypt = require("bcryptjs");
var salt = bcrypt.genSaltSync(10);
var jwt = require("jsonwebtoken");
const jwtSecret = process.env.JWT_SECRET;

exports.register = async function (req, res) {
  let { name, surname, email, password } = req.body;

  var passwordHash = bcrypt.hashSync(password, salt);

  let checkIfUserExists = await User.findOne({
    where: { email: email },
  });
  if (checkIfUserExists) {
    res.status(400).send({ message: "User already exists!" });
  }

  let user = User.create({
    name: name,
    surname: surname,
    email: email,
    password: passwordHash,
  });

  return res.status(200).send({ message: "User is created!" });
};

exports.login = async function (req, res) {
  let { email, password } = req.body;

  let user = await User.findOne({
    where: {
      email: email,
    },
  });

  console.log(user);

  if (!user) {
    return res.status(400).send({ message: "User doesn't exist!" });
  }

  let passwordCheck = bcrypt.compareSync(password, user.password);

  if (!passwordCheck) {
    return res.status(400).send({ message: "Passwords do not match!" });
  }

  let token = jwt.sign({ ...user }, jwtSecret, { expiresIn: 60 * 60 });

  return res.status(200).send(token);
};
