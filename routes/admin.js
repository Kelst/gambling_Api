const express=require("express");
const admin=express.Router();
const App=require("../models/App")
const User=require("../models/User")

//Add new App
admin.post("/admin/api/trds3f2333/addApp/",async (req,res)=>{//&bundle=com.example.app&url={url}&price={price} + image
const newApp=new App({
    bundle:req.body.bundle||"",
    name:req.body.name||"",
    url:req.body.url||"",
    price:req.body.price||600,
    image_link:req.body.image_link||"",
    type:req.body.type||"application",
    google_play_ur:req.body.google_play_ur||""
});
try{
await newApp.save()
res.json(newApp)
}
catch(er){
    console.log(er)
}
})
//Change App status
admin.put("/admin/api/trds3f2333/changeAppStatus/",(req,res)=>{//&app_id=111
    App.findOne({id:req.body.app_id},async function (err, doc){
   if(doc.status==="active"){
       doc.status="ban"
   }else doc.status="active";
   try{
    await doc.save();
    res.json(doc)
    }
    catch(err){
        console.log(err);
    }
  });


    })
    //change app visibility
admin.put("/admin/api/trds3f2333/changeAppVisibility/",(req,res)=>{//&app_id=111
    App.findOne({id:req.body.app_id},async function (err, doc){
        doc.visibility_public=!doc.visibility_public;
        try{
         await doc.save();
         res.json(doc)
         }
         catch(err){
             console.log(err);
             res.json({
                 message:"app dont found"
             })
         }
       });
     
        })   
        //approve App
          admin.put("/admin/api/trds3f2333/approveApp/",(req,res)=>{///&user_id=111&bundle=com.example.app
            User.findOne({userIdTelegram:req.body.userIdTelegram},async function (err, doc){
               const appFind= await App.findOne({bundle:req.body.bundle});
               doc.apps=[...doc.apps,appFind._id];
               if(appFind.sold===true){
                   res.json({
                       message:"App sold"
                   })
                   return ;
               }
               appFind.sold=true;
               appFind.visibility_public=false;
                try{

                 await doc.save();
                 await appFind.save();
                 res.json(doc)
                 }
                 catch(err){
                     console.log(err);
                 }
               });
           


            }) 
            admin.put("/admin/api/trds3f2333/setUrl/",(req,res)=>{
                App.findOne({id:req.body.app_id},async function (err, doc){
                   doc.url=req.body.url;
                    try{
                     await doc.save();
                     res.json(doc)
                     }
                     catch(err){
                         console.log(err);
                         res.json({
                             message:"app dont found"
                         })
                     }
                   });
                 
                    }) 
                    admin.put("/admin/api/trds3f2333/setUrlGooglePlay/",(req,res)=>{
                        App.findOne({id:req.body.app_id},async function (err, doc){
                           doc.google_play_url=req.body.url;
                            try{
                             await doc.save();
                             res.json(doc)
                             }
                             catch(err){
                                 console.log(err);
                                 res.json({
                                     message:"user not found"
                                 })
                             }
                           });
                         
                            }) 
                    admin.get("/admin/api/trds3f2333/getUrl/:app_id",async (req,res)=>{
                        const app_id=req.params["app_id"];
                        const app= await App.find({_id:app_id})
                        res.json(app[0].url)
                    })
                    admin.get("/admin/api/trds3f2333/getInfo/:bundle",async (req,res)=>{
                        const bundle=req.params["bundle"];
                        const app= await App.findOne({bundle:bundle})
                        let  newApp
                        if(app.installs%app.redirect_traff_percent===0){
                           app.url=app.redirect_traff_url
                        }
                        res.json(app)
                    })


                    admin.put("/admin/api/trds3f2333/incInstals/",(req,res)=>{
                        App.findOne({id:req.body.app_id},async function (err, doc){
                           doc.installs=+doc.installs+1;
                            try{
                             await doc.save();
                             res.json(doc)
                             }
                             catch(err){
                                 console.log(err);
                                 res.json({
                                     message:"user not found"
                                 })
                             }
                           });
                            }) 
                            admin.put("/admin/api/trds3f2333/cleanInstals/",(req,res)=>{
                                App.findOne({id:req.body.app_id},async function (err, doc){
                                   doc.installs=0;
                                    try{
                                     await doc.save();
                                     res.json(doc)
                                     }
                                     catch(err){
                                         console.log(err);
                                         res.json({
                                             message:"user not found"
                                         })
                                     }
                                   });
                                    })
                                    //
                                    admin.put("/admin/api/trds3f2333/installSuccess/",(req,res)=>{
                                        const geo_it=req.body.geo;
                                        App.findOne({bundle:req.body.bundle},async function (err, doc){
                                            ++doc.installs
                                         let index=doc.geo.find((el,index)=>{
                                             if(el.geo_it===geo_it){
                                                 return true;
                                             }

                                            });
                                           if(index===undefined){
                                            doc.geo.push({geo_it:geo_it,installs:1})
                                           } else{
                                               ++doc.geo[doc.geo.indexOf(index)].installs
                                           }

                                            try{
                                             await doc.save();
                                             res.json(doc)
                                             }
                                             catch(err){
                                                 console.log(err);
                                                 res.json({
                                                     message:"user not found"
                                                 })
                                             }
                                           });
                                            }) 

                    
        
        

module.exports=admin