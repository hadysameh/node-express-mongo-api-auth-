const isAdmin= (req,res,next)=>{
    // console.log(req.user)
    if(req.user.isAdmin){
         next()
    }
    else{
        res.json({
            isAdmin:req.user.isAdmin
        })
    }
}
module.exports = isAdmin