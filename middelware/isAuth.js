const jwt = require('jsonwebtoken')
const UserModel = require('./../models/User')
const isAuth = (req,res,next)=>{
    jwt.verify(token, process.env.jwtSecret, function(err, decoded) {
        UserModel.checkIfEmailExists(decoded,(isEmailExist)=>{
            if(isEmailExist){
                next()
            }else{
                res.json({
                    isUser:isEmailExist
                })
            }
        })
      });
}