const db = require('../models')
const User = db.users


exports.findAll = async function(req, res){

   let users = await User.findAll();

   return res.status(200).send(users);
}

exports.findById = async function(req, res){
   let { id } = req.params;
   let user = await User.findOne({
      where: {
          id: id,
      }
  });
   if(user == null){
      return res.status(500).send({message: "User doesn't exist!"})
   }
   return res.status(200).send(user);
}

exports.deleteUser = async function(req, res){
   let { id } = req.params;

   let user = await User.destroy({
      where: {
          id: id,
      }
  });
   if(user == null){
      return res.status(500).send({message: "User doesn't exist!"})
   }

   return res.status(200).send({message: "User is deleted!"})

}

