const jwt = require('jsonwebtoken');
const User = require('./../models/User')


class UserController{

    static login(req,res){
        User.checkIfEmailExists(req.body.email,(isEmailExists,user)=>{
            if(isEmailExists){
                user.comparePassword(req.body.password,(err,isMatch)=>{
                    
                    if(isMatch)
                    {
                        let token =jwt.sign({email:req.body.email},process.env.jwtSecret)
                        res.status(200).send({
                            user,
                            token
                        });
                    }
                    else{
                        res.status(400).json({status:'wrong password'});
                    }
                })
            }
            else{
                res.status(400).json({status:'email was not found please regiser first'});
            }
        })
        
    }

    static register(req,res){
        // console.log(req.body)
        User.checkIfEmailExists(req.body.email,(isEmailExists,user)=>{
            if(isEmailExists){
                res.status(400).json({status:'this email is already registered please login'});
            }
            else{
                if(req.body.password==req.body.repassword){
                    // console.log('tring to register')
                    const newUser = new User({
                        email:req.body.email,
                        password:req.body.password
                    })
                    // console.log(newUser)
                    let token =jwt.sign({email:req.body.email},process.env.jwtSecret)
                    // console.log('token created')
                    // console.log(token)
                    newUser.save().then(user=>{
                        // console.log('tring to save new user')
                        res.json({
                            user,
                            token
                        })
                    })
                }
                else{
                    res.json({
                        status:'please re-enter the correct password'
                    })
                }
                
            }
        })
    }
}

module.exports={UserController}