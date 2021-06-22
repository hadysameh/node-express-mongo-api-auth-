const jwt = require('jsonwebtoken')
const UserModel = require('./../models/User')
const isAuth = (req,res,next)=>{
    jwt.verify(token, process.env.jwtSecret, function(err, decoded) {
        UserModel.checkIfEmailExists(decoded,(isEmailExist,user)=>{
            if(isEmailExist){
                req.user=user
                next()
            }else{
                res.json({
                    isUser:isEmailExist
                })
            }
        })
      });
}

module.exports=isAuth