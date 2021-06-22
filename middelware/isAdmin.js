const is_Admin= (req,res,next)=>{
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