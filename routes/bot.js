const express=require("express");
const bot=express.Router();
const User=require("../models/User");
const App=require("../models/App");
const admin = require("./user");
//for bot
admin.get("/admin/bot/api/getUser/trds3f2333/:user_id",async (req,res)=>{
    const user_id=+req.params["user_id"];
    const userN= await User.findOne({userIdTelegram:user_id}).populate("apps");
    res.json(userN)
}) 
admin.get("/admin/bot/api/getAppsTypes/trds3f2333/",async (req,res)=>{
    res.json(["gambling","crypto","dating"])
});

admin.get("/admin/bot/api/trds3f2333/getApps/:type",async (req,res)=>{
    const type=req.params["type"];
    const apps= await App.find({type:type})
    res.json(apps)

}) 
admin.get("/admin/bot/api/trds3f2333/getApps/",async (req,res)=>{
    const apps= await App.find({})
    res.json(apps)
})
admin.get("/admin/bot/api/trds3f2333/getAppInfo/:app_id",async (req,res)=>{
    const app_id=req.params["app_id"];
    const apps= await App.find({_id:app_id})
    res.json(apps)
})

admin.get("/admin/bot/api/trds3f2333/getFreeApp/",async (req,res)=>{
    const apps= await App.find({sold:false,visibility_public:true})
    res.json(apps)
})  

module.exports=bot