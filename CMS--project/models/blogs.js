const mongoose=require('mongoose')



    const blogsSchema = mongoose.Schema({
        title: String,
        description: String,
        date: { type: Date, default: new Date() },
        username: String
    })




module.exports=mongoose.model('blogs',blogsSchema)