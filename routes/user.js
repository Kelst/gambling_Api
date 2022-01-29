const express=require("express");
const admin=express.Router();
const User=require("../models/User")

admin.post("/admin/user/api/trds3f2333/addUser/",async(req,res)=>{

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
admin.get("/admin/user/api/trds3f2333/getUserApps/",async(req,res)=>{
 const userN= await User.findOne({userIdTelegram:req.body.userIdTelegram}).populate("apps")
res.json(userN.apps)
})

admin.get("/admin/user/api/trds3f2333/getUser/",async(req,res)=>{
    const userN= await User.findOne({userIdTelegram:req.body.userIdTelegram}).populate("apps")
   res.json(userN.apps)
   })




module.exports=admin