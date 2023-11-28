const Reg=require('../models/reg')
const nodemailer=require('nodemailer')
const bcrypt=require('bcrypt')

exports.login=(req,res)=>{
    res.render('login.ejs',{message:''})
    }
 exports.registerform=(req,res)=>{
        res.render('register.ejs',{message:''})  
}

exports.signup=async(req,res)=>{
    const{email,pass}=req.body
const convertedpass=await bcrypt.hash(pass,10)
    const logincheck=await Reg.findOne({login:email})
    if(logincheck==null){   
const record=await new Reg({login:email,password:convertedpass})
record.save()
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: "eng23742@gmail.com",
      pass: "phbyafleulnfyxis",
    },
  });
console.log('connected to smtp server')
const info = await transporter.sendMail({
    from: 'eng23742@gmail.com', // sender address
    to: "ar754430@gmail.com", // list of receivers
    subject: "verfication link has been sended to your account", // Subject line
    text: "please check and click the activation link", // plain text body
    html:`<a href=http://localhost:5000/emailactivation/${record.id}>Activation Link<a/>`, // html body
  });
 res.render('register.ejs',{message:'Activation link has been sent to your register email id'})
    }else{
      res.render('register.ejs',{message:'Email id is already registered'})
    }    
}
  
exports.emailactivation=async(req,res)=>{
  const id=req.params.id
  await Reg.findByIdAndUpdate(id,{status:'active'})
  res.render('emailverifymessage.ejs') 
}


exports.logincheck=async(req,res)=>{
  //console.log(req.body)

  const{username,pass}=req.body
  const record=await Reg.findOne({login:username})
  //console.log(record)
  if(record!==null){
    const passwordcheck=await bcrypt.compare(pass,record.password)
    //console.log(passwordcheck)
    if(passwordcheck){
      req.session.username=username
      req.session.userid=record.id
      req.session.isAuth=true
      req.session.role=record.role
      if(record.status=='active'){
      if(record.login=='admin@gmail.com'){
        res.redirect('/admin/dashboard')
      }else{
          res.redirect('/profiles')
      }
    }else{
      res.render('login.ejs',{message:'Your account is Suspended.Please valid your email first'})
    }
  }else{
    res.render('login.ejs',{message:'Wrong password'}) 
  } 
  }else{
    res.render('login.ejs',{message:'Wrong username'})
  }
}
exports.dashboard=(req,res)=>{
  const username=req.session.username
  res.render('admin/dashboard.ejs',{username})
}
exports.logout=(req,res)=>{
  req.session.destroy
res.redirect('/')
}
exports.adminusers=async(req,res)=>{
  const username=req.session.username
  const record=await Reg.find()
  res.render('admin/users.ejs',{username,record})
}
exports.usersprofiles=async(req,res)=>{
  const username=req.session.username
  const record=await Reg.find({img:{$nin:["default.png"]}})
  res.render('usersprofiles.ejs',{username,record})
}
exports.userupdateform=async(req,res)=>{
   const username=req.session.username
  const record=await Reg.findOne({login:username})
  res.render('updateform.ejs',{username,record})
}

exports.profileupdate=async(req,res)=>{
  const{Fname,Lname,gender,about,add,mobile}=req.body
  const id=req.session.userid
  
  if(req.file){
    const filename=req.file.filename
  await Reg.findByIdAndUpdate(id,{Firstname:Fname,Lastname:Lname,gender:gender,img:filename,desc:about,address:add,mobile:mobile})
  }else{
    await Reg.findByIdAndUpdate(id,{Firstname:Fname,Lastname:Lname,gender:gender,desc:about,address:add,mobile:mobile})
  }
  res.redirect('/profileupdate')
}

exports.statusupdate=async(req,res)=>{
  const id=req.params.id
  const record=await Reg.findById(id)
  let newstatus=null
  if(record.status=='suspended'){
    newstatus='active'
  }else{
    newstatus='suspended'
  }
await Reg.findByIdAndUpdate(id,{status:newstatus})
res.redirect('/admin/users')
}
exports.contactdetails=async(req,res)=>{
  const id=req.params.id
  const record=await Reg.findById(id)
  res.render('contactdetails.ejs',{username:req.session.username,record})
}
exports.forgotform=(req,res)=>{
  res.render('forgotform.ejs',{message:''})
}
exports.forgotsendlink=async(req,res)=>{
  const {username}=req.body
  const record=await Reg.findOne({login:username})
  if(record==null){
    res.render('forgotform.ejs',{message:'Email not found'})
  }else{
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: "eng23742@gmail.com",
        pass: "phbyafleulnfyxis",
      },
    });
  console.log('connected to smtp server')
  const info = await transporter.sendMail({
    from: 'eng23742@gmail.com', // sender address
    to: username, // list of receivers
    subject: "Password Change link form xyz.com", // Subject line
    text: "please click below to generate new Password.", // plain text body
    html:`<a href=http://localhost:5000/forgotchangepasswordform/${record.id}>Click to generate new password.<a/>`, // html body
  });
 console.log('email send')
 res.render('forgotform.ejs',{message:'Link has been send to your registered email id'})
  }
}
exports.forgotpasswordchangeform=(req,res)=>{
  res.render('forgotpasswordform.ejs',{message:''})
}
exports.forgotchangepassword=async(req,res)=>{
  const id=req.params.id
  const{npass,cpass}=req.body
  if(npass==cpass){
  const convertedpass= await bcrypt.hash(npass,100)
  await Reg.findById(id,{password:convertedpass})
  res.render('forgotmessage.ejs')
  }else{
    res.render('forgotpasswordform.ejs',{message:'Password Not Matched'})
  }
}