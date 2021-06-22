const mongoose = require('mongoose')
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

let userSchema = new schema({
    firstName :{
        type:String,
        required:true
    },
    lasttName :{
        type:String,
        required:true
    },
    email :{
        type:String,
        required : true,
        unique: true 

    },
    password:{
        type:String,
        required:true
    },
    isAdmin:{
        type:Boolean,
        default:false
    }
},
{
    timestamps:true
})



userSchema.pre('save',function(next){
    const user = this;
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds,(err,salt)=>{
        if(err) {
            console.log(err)
            return next(err)
        }
        try{
            bcrypt.hash(user.password,salt,(err,hash)=>{
                if (err) { 
                    console.log(err)
                    return next(err); 
                }
                user.password = hash;
                // console.log(user)
                next()
            })
        }
        catch(e){
            console.log(e)
        }
        
    })
})

userSchema.statics.checkIfEmailExists=function(email, callback){
    const user = this;
    user.findOne({email},function(err,user) { 
        if(err){
            callback(false,null)
        }
        else if(user){
            // console.log(user)
            callback(true,user)
        }
        else{
            callback(false,null)
        }
        
    })
}

userSchema.methods.comparePassword=function(candidatePassword, callback){
    bcrypt.compare(candidatePassword,this.password,(err,isMatch)=>{
        if (err) { 
            // console.log(err)
            return callback(err); }
        console.log(isMatch)
        callback(null, isMatch);
    })
}


userSchema.index({ email: 1 }); 

// User = mongoose.model('UserModel',userSchema)
module.exports = User = mongoose.model('User',userSchema)