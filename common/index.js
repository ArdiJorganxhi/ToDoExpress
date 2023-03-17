const jwt = require('jsonwebtoken')
const jwtSecret = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFyZGlqb3JnYW54aGlAZ21haWwuY29tIiwicGFzc3dvcmQiOjEyMzQ1Nn0.mI_agQZmV-4vqUohrAFFuCtYmPiYql0A5RPT5UDD0E'

function verifyLogin(req, res, next){

    let header = req.header('Authorization');

    jwt.verify(header, jwtSecret, function(err, decoded) {
        if (err) {
          return res.status(401).send({message: "Unauthorized!"})
        }
        next();
      });

}


module.exports.checkLogin = this.checkLogin;
