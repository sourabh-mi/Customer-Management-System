const router=require('express').Router()
const Regc=require('../controllers/regcontroller')
const handlelogin=require('../helpers/handlelogin')
const upload=require('../helpers/multer')
const handlesub=require('../helpers/handlesub')
const BlogsC=require('../controllers/blogscontroller')



router.get('/',Regc.login)

router.get('/register',Regc.registerform)
router.post('/register',Regc.signup)
router.get('/emailactivation/:id',Regc.emailactivation)
router.post('/',Regc.logincheck)
router.get('/logout',Regc.logout)
router.get('/profiles',Regc.usersprofiles)
router.get('/profileupdate',handlelogin,Regc.userupdateform)
router.post('/profileupdate',upload.single('img'),Regc.profileupdate)
router.get('/contactdetail/:id',handlesub,Regc.contactdetails)
router.get('/forgot',Regc.forgotform)
router.post('/forgot',Regc.forgotsendlink)
router.get('/forgotchangepasswordform/:id',Regc.forgotpasswordchangeform)
router.post('/forgotchangepasswordform/:id',Regc.forgotchangepassword)
router.get('/myBlogs',BlogsC.myblogpage)
router.get('/addBlogs',BlogsC.addBlogsForm)
router.post('/addBlogs',BlogsC.CatchAddBlogsFormData)
router.get('/deleteBlog/:id',BlogsC.deleteBloge)
router.get('/allBlogs',BlogsC.allBlogsPage)










module.exports=router