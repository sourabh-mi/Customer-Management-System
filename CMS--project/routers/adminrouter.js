const router=require('express').Router()
const Regc=require('../controllers/regcontroller')
const handlelogin=require('../helpers/handlelogin')
const admincheck=require('../helpers/admincheck')




router.get('/dashboard',handlelogin,admincheck,Regc.dashboard)
router.get('/users',handlelogin,Regc.adminusers)
router.get('/statusupdate/:id',Regc.statusupdate)





module.exports=router