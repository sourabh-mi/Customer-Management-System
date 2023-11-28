const Blogs=require('../models/blogs')



exports.myblogpage=async(req,res)=>{
    
    const username = req.session.username
    const record = await Blogs.find({ userName: { $in: [req.session.username] } })
    res.render('myBlogs.ejs', { username, record })
}

exports.addBlogsForm = (req, res) => {
    res.render('addBlogs.ejs')
}

exports.CatchAddBlogsFormData = (req, res) => {
    const { title, username, description } = req.body
    const record = new Blogs({
        title: title,
        description: description,
        userName: username
    })
    record.save()
    res.redirect('/myBlogs')
}

exports.deleteBloge = async (req, res) => {
    const id = req.params.id
    await Blogs.findByIdAndDelete(id)
    res.redirect('/myBlogs')
}

exports.allBlogsPage = async (req, res) => {
    const username = req.session.username
    const record = await Blogs.find()
    res.render('allBlogs.ejs', { username, record })
}



