const express=require("express");
const admin=express.Router();
const User=require("../models/User")

admin.post("/admin/user/api/trds3f2333/addUser/",async(req,res)=>{

    const newUser=new User({
        userName:req.body.userName,
        userIdTelegram:req.body.userIdTelegram,
        userTelegram_nik:req.body.telegramNick
    })
    try{
        await newUser.save()
        res.json(newUser)
        }
        catch(er){
            console.log(er)
        }
})
admin.get("/admin/user/api/trds3f2333/getUserApps/:userIdTelegram",async(req,res)=>{
    const userIdTelegram=req.params["userIdTelegram"];

 const userN= await User.findOne({userIdTelegram:userIdTelegram}).populate("apps")
res.json(userN.apps)
})
admin.post("/admin/user/api/trds3f2333/findUser/",async(req,res)=>{
    const userName=req.body.userName;
 let userN= await User.findOne({userName:userName})
    res.json(userN)
})
admin.get("/admin/user/api/trds3f2333/getshareApps/:userIdTelegram",async(req,res)=>{
    const userIdTelegram=req.params["userIdTelegram"];

 const userN= await User.findOne({userIdTelegram:userIdTelegram}).populate("share_app")
res.json(userN.share_app)
})

admin.get("/admin/user/api/trds3f2333/getUser/:userIdTelegram",async(req,res)=>{
    const userIdTelegram=req.params["userIdTelegram"];
    const userN= await User.findOne({userIdTelegram:userIdTelegram})
    res.json(userN)

   })
   admin.get("/admin/user/api/trds3f2333/isUser/:userIdTelegram",async(req,res)=>{
    const userIdTelegram=req.params["userIdTelegram"];
    const userN= await User.findOne({userIdTelegram:userIdTelegram})
 if(!userN){
    res.json({isUser:false})
 }else res.json({isUser:true}) 

   })
   




module.exports=admin