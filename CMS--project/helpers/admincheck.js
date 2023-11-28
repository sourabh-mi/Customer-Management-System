function admincheck(req,res,next){
if(req.session.username=='admin@gmail.com'){
    next()
}else{
    res.render('subcriptionmessage.ejs')
}
}
module.exports=admincheck;