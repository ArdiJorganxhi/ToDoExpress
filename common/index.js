require('dotenv').config();
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET;

function verifyLogin(req, res, next){

    let header = req.header('Authorization');
    
    if(!header){
      return res.status(401).send({message: 'Unauthorized!'})
    };

    let token = header.replace('Bearer ','')
    
    jwt.verify(token, jwtSecret, function(err,decoded){

      if(err){
        return res.status(401).send({message: "Unauthorized"})
      }
      next();
    })
}

function verifyToken(req, res, next){
  verifyLogin(req, res, () => {
    if (req.user.id === req.params.id) {
        next();
    }
    else {
        res.status(403).json("You are not authorized to do that!");
    }
});
}


module.exports.verifyLogin = verifyLogin;
