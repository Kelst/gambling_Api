const express=require("express");
const admin=express.Router();
const User=require("../models/User")

admin.post("/admin/user/api/addUser/trds3f2333/",async(req,res)=>{

    const newUser=new User({
        userName:req.body.userName,
        userIdTelegram:req.body.userIdTelegram,
    })
    try{
        await newUser.save()
        res.json(newUser)
        }
        catch(er){
            console.log(er)
        }
})
admin.get("/admin/user/api/getUserApps/trds3f2333/",async(req,res)=>{
 const userN= await User.findOne({userIdTelegram:req.body.userIdTelegram}).populate("apps")
res.json(userN.apps)
})

admin.get("/admin/user/api/getUser/trds3f2333/",async(req,res)=>{
    const userN= await User.findOne({userIdTelegram:req.body.userIdTelegram}).populate("apps")
   res.json(userN.apps)
   })




module.exports=admin