const mongoose=require('mongoose')


const regSchema=mongoose.Schema({
    login:String,
    password: String,
    Firstname:String,
    Lastname:String,
    gender:String,
    dob:Date,
    createDate:{type:Date,default:new Date()},
    status:{type:String,default:'suspended'},
    img:{type:String,default:'default.png'},
    desc:String,
    mobile:Number,
    address:String,
    role:{type:String,default:'public'}

})


module.exports=mongoose.model('reg',regSchema)