const db = require('../models')
const User = db.users
const Op = db.Sequelize.Op


exports.register = (req, res) => {
    const user = {
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password
    };

    User.create(user)
    .then(data => {
        console.log(data)
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message:
            err.message || "An error occured during registration!"
        })
    })
}