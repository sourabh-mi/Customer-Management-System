function handlesub(req,res,next){
    if(req.session.role=='Pvt'){
        next()
    }else{
        res.render('subcriptionmessage.ejs')
    }
}
module.exports=handlesub