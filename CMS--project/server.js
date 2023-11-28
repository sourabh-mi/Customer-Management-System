const express=require('express')
const app=express()
require('dotenv').config()
app.use(express.urlencoded({extended:false}))
const userRouter=require('./routers/userrouter')
const adminRouter=require('./routers/adminrouter')
const mongoose=require('mongoose')
mongoose.connect(`${process.env.DB_URL}/${process.env.DB_NAME}`)
const session=require('express-session')




app.use(session({
               secret:process.env.KEY,
               resave:false,
               saveUninitialized:false
}))
app.use('/admin' ,adminRouter)
app.use(userRouter)
app.use(express.static('public'))
app.set('view engine','ejs')
app.listen(process.env.PORT, ()=>{console.log(`server is running on PORT${process.env.PORT}`)})