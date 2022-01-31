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
admin.get("/admin/user/api/trds3f2333/getUserApps/:userIdTelegram",async(req,res)=>{
    const userIdTelegram=req.params["userIdTelegram"];

 const userN= await User.findOne({userIdTelegram:userIdTelegram}).populate("apps")
res.json(userN.apps)
})

admin.get("/admin/user/api/trds3f2333/getUser/:userIdTelegram",async(req,res)=>{
    const userIdTelegram=req.params["userIdTelegram"];
    const userN= await User.findOne({userIdTelegram:userIdTelegram})
   res.json(userN.apps)
   })




module.exports=admin