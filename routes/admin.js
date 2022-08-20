const express=require("express");
const admin=express.Router();
const App=require("../models/App")
const User=require("../models/User")
const getDate=require("../tools/tools")
//Add new App
admin.post("/admin/api/trds3f2333/addApp/",async (req,res)=>{//&bundle=com.example.app&url={url}&price={price} + image
const newApp=new App({
    bundle:req.body.bundle||"",
    name:req.body.name||"",
    url:req.body.url||"https://www.google.com.ua/",
    price:req.body.price||400,
    image_link:req.body.image_link||"",
    type:req.body.type||"application",
    redirect_traff_url:req.body.redirect_traff_url||"",
    redirect_traff_percent:req.body.redirect_traff_percent||0,
    google_play_url:`https://play.google.com/store/apps/details?id=${req.body.bundle}`

    
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
    App.findOne({_id:req.body.app_id},async function (err, doc){
   
       doc.status=req.body.status; 
  
   try{
    await doc.save();
    res.json(doc)
    } 
    catch(err){ 
        console.log(err);
    }
  });


    })
    admin.put("/admin/api/trds3f2333/deleteAppById/",(req,res)=>{//&app_id=111
        
      App.findOneAndDelete({_id:req.body.id},async function(err,doc){
          try{
            res.json(doc)
          }
          catch(err){
              res.json({message:"no app"})
          }
      });
    
    
        })
    //change app visibility
admin.put("/admin/api/trds3f2333/changeAppVisibility/",(req,res)=>{//&app_id=111
    App.findOne({_id:req.body.app_id},async function (err, doc){
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
        admin.put("/admin/api/trds3f2333/setUserConfirmApp/",(req,res)=>{//&app_id=111
            App.findOne({bundle:req.body.bundle},async function (err, doc){
               doc.user_confirm=req.body.confirmId;
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
        //approve App userIdTelegram
          admin.put("/admin/api/trds3f2333/approveApp/",async(req,res)=>{//bundle=com.example.app
            const appFind= await App.findOne({bundle:req.body.bundle});
            
            User.findOne({userIdTelegram:appFind.user_confirm},async function (err, doc){
                if(appFind.sold===true){
                    res.json({
                        message:"App sold"
                    })
                    return ;
                }
                const date=new Date();
               doc.apps=[...doc.apps,appFind._id];
                appFind.dateConfirm=getDate()+" "+ date.getHours()+":"+date.getMinutes()
               appFind.sold=true;
               appFind.visibility_public=false;
               appFind.confirm_app=false;
          


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
            admin.put("/admin/api/trds3f2333/cancelApproveApp/",async(req,res)=>{//bundle=com.example.app
                const appFind= await App.findOne({bundle:req.body.bundle});
                User.findOne({userIdTelegram:appFind.user_confirm},async function (err, doc){
                    if(appFind.sold===true){
                        res.json({
                            message:"App sold"
                        })
                        return ;
                    }
                   
                   appFind.sold=false;
                   appFind.visibility_public=true;
                   appFind.confirm_app=false;
                   appFind.user_confirm="";
    
    
                    try{
                     await doc.save();
                     await appFind.save();
                     res.json(doc)//доробити повернення 
                     }
                     catch(err){
                         console.log(err);
                     }
                   });
               
    
    
                }) 
            admin.put("/admin/api/trds3f2333/setUrl/",(req,res)=>{
                App.findOne({_id:req.body.id},async function (err, doc){
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
                    admin.put("/admin/api/trds3f2333/setNaming/",(req,res)=>{
                        const naming=req.body.naming;
                        App.findOne({_id:req.body.id},async function (err, doc){
                           doc.naming.push({
                            name:naming.split("-")[0],
                            name_ref:naming.split("-")[1]
                           })
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
                    admin.put("/admin/api/trds3f2333/setRedirectUrl/",(req,res)=>{
                        App.findOne({_id:req.body.id},async function (err, doc){
                           doc.redirect_traff_url=req.body.url;
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

                            admin.put("/admin/api/trds3f2333/setImageUrl/",(req,res)=>{
                                App.findOne({_id:req.body.id},async function (err, doc){
                                   doc.image_link=req.body.url;
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
                                    admin.put("/admin/api/trds3f2333/setPrice/",(req,res)=>{
                                        App.findOne({_id:req.body.id},async function (err, doc){
                                           doc.price=req.body.price;
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

                            admin.put("/admin/api/trds3f2333/setRedirectProcent/",(req,res)=>{
                                App.findOne({_id:req.body.id},async function (err, doc){
                                   doc.redirect_traff_percent=req.body.percent;
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
                                    admin.put("/admin/api/trds3f2333/setRedirectGeo/",(req,res)=>{
                                        App.findOne({_id:req.body.id},async function (err, doc){

                                           doc.redirect_traff_urls=req.body.geo==""?[]:req.body.geo.split(",")
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
                                            admin.put("/admin/api/trds3f2333/deleteRedirect/",(req,res)=>{
                                                App.findOne({_id:req.body.id},async function (err, doc){
        
                                                   doc.redirect_traff_urls=[];
                                                   doc.redirect_traff_url="";

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
                        App.findOne({_id:req.body.app_id},async function (err, doc){
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
                        if(app===null) {res.json({message:"app dont found"}) 
                        return;}
                       
                        const result={
                            url:(app.installs%app.redirect_traff_percent===0)&&app.installs!=0?app.redirect_traff_url:app.url,
                            push:{
                                text:app.notification_text,
                                start:app.notification_start,
                                interval:app.notification_interval,
                                max_count:app.max_count
                            },
                            save_last_url:app.save_last_url
                        }
                        res.json(result)
                    })
                    admin.get("/admin/api/trds3f2333/getInfo/",async (req,res)=>{
                        let result={}
                        const bundle=req.query.bundle;
                        const geo=req.query?.geo;
                        const naming=req.query?.naming;
                        const incInstall=async()=>{
                            const date=getDate();
                                    ++app.installs
                                    let indexDate=app.date.find((el,index)=>{
                                        if(el.date_N===date){
                                            return true;
                                        }
                                    })
                                    if(indexDate===undefined){
                                        app.date.push({date_N:date,installs:1})
                                       } else{
                                           ++app.date[app.date.indexOf(indexDate)].installs
                                       }
                                 let index=app.geo.find((el,index)=>{
                                     if(el.geo_it===geo){
                                         return true;
                                     }
    
                                    }); 
                                   if(index===undefined){
                                    app.geo.push({geo_it:geo,installs:1}) 
                                   } else{
                                       ++app.geo[app.geo.indexOf(index)].installs
                                   }
    
                                    try{
                                     await app.save();
                                     
                                     }
                                     catch(err){
                                         console.log(err);
                                        
                                     }
                        }
                        let finalUrL="";
                        const app= await App.findOne({bundle:bundle})
                        if(app==null){
                            result={
                                url:"",
                                push:{
                                    text:"",
                                    start:"",
                                    interval:"",
                                    max_count:""
                                },
                                save_last_url:false
                            }
                            res.json(result) 
                        return
                              
                        
                        }

                        
                        const redirectFinalProcent=Math.round(100/app.redirect_traff_percent);
                       
                        if(app.installs%redirectFinalProcent===0&&app.redirect_traff_percent!=0&&app.redirect_traff_url!=""){
                            const date=getDate();
                            incInstall()
                    
                            if(app.redirect_traff_urls.includes(geo)||app.redirect_traff_urls.length===0){
                                result={
                                    url:app.redirect_traff_url,
                                    url_invisible:app.url,
        
                                    push:{
                                        text:app.notification_text,
                                        start:app.notification_start,
                                        interval:app.notification_interval,
                                        max_count:app.max_count
                                    },
                                    save_last_url:app.save_last_url 
                                }
                                res.json(result) 
                            return

                            }else{
                                
                                result={
                                    url:app.url,
                                    push:{
                                        text:app.notification_text,
                                        start:app.notification_start,
                                        interval:app.notification_interval,
                                        max_count:app.max_count
                                    },
                                    save_last_url:app.save_last_url
                                }
                                res.json(result)
                            return
                            }
                            

                           
                        }else{                            

                            if(app.naming.length===0){
                                incInstall()
                                result={
                                    url:app.url,
                                    push:{
                                        text:app.notification_text,
                                        start:app.notification_start,
                                        interval:app.notification_interval,
                                        max_count:app.max_count
                                    },
                                    save_last_url:app.save_last_url
                                }
                                res.json(result)
                            return
                            }else {
                                const namingCurrent=app.naming.filter(el=>el.name==naming);
                                console.log(namingCurrent);
                                if(namingCurrent.length!=0){
                                    console.log("test");
                                    incInstall()
                            
                                    result={
                                        url:namingCurrent[0].name_ref,
                                        push:{
                                            text:app.notification_text,
                                            start:app.notification_start,
                                            interval:app.notification_interval,
                                            max_count:app.max_count
                                        },
                                        save_last_url:app.save_last_url
                                    }
                                    res.json(result)
                                return
                                }else { 
                                    result={
                                        url:"",
                                        push:{
                                            text:app.notification_text,
                                            start:app.notification_start,
                                            interval:app.notification_interval,
                                            max_count:app.max_count
                                        },
                                        save_last_url:app.save_last_url
                                    }
                                    res.json(result)
                                return  
                                }
                            }


                        }

                        // if(app.naming.length===0){
                        //     result={
                        //         url:app.url,
                        //         push:{
                        //             text:app.notification_title,
                        //             start:app.notification_start,
                        //             interval:app.notification_interval,
                        //             max_count:app.max_count
                        //         },
                        //         save_last_url:app.save_last_url
                        //     }
                        //     res.json(result)
                        // return
                        // }
                        // result={
                        //     url:finalUrL,
                        //     url_invisible:app.url,

                        //     push:{
                        //         text:app.notification_title,
                        //         start:app.notification_start,
                        //         interval:app.notification_interval,
                        //         max_count:app.max_count
                        //     },
                        //     save_last_url:app.save_last_url
                        // }
                        
                    })


                   
                            admin.put("/admin/api/trds3f2333/cleanInstals/",(req,res)=>{
                                App.findOne({_id:req.body.app_id},async function (err, doc){
                                   doc.installs=0;
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
                                    //
                                    admin.put("/admin/api/trds3f2333/installSuccess/",(req,res)=>{
                                        const geo_it=req.body.geo;
                                        const date=getDate();
                                        
                                        App.findOne({bundle:req.body.bundle},async function (err, doc){
                                            ++doc.installs
                                            let indexDate=doc.date.find((el,index)=>{
                                                if(el.date_N===date){
                                                    return true;
                                                }
                                            })
                                            if(indexDate===undefined){
                                                doc.date.push({date_N:date,installs:1})
                                               } else{
                                                   ++doc.date[doc.date.indexOf(indexDate)].installs
                                               }
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
                                             res.json({
                                                 message:true
                                             })
                                             }
                                             catch(err){
                                                 console.log(err);
                                                 res.json({
                                                    flag:false
                                                })
                                             }
                                           });
                                            }) 

                                            admin.put("/admin/api/trds3f2333/addGeoUrl/",(req,res)=>{
                                                const geo_it=req.body.geo;
                                                const geo_url=req.body.geo_url;
                                                const bundle=req.body.bundle;
                                                let indexUrl;
                                                try{
                                                App.findOne({bundle:bundle},async function (err, doc){
                                                    if(!doc){
                                                        return res.json({
                                                            flag:false
                                                        })
                                                        return
                                                    }
                                                    const geoItem=doc.redirect_traff_urls.find((el,index)=>{
                                                        if(el.geo===geo_it){
                                                            indexUrl=index;
                                                            return true;
                                                        }
                                                    })
                                                    if(geoItem===undefined){
                                                        doc.redirect_traff_urls.push({
                                                            geo:geo_it,
                                                            geo_traf_url:geo_url
                                                        })
                                                    }else{
                                                        
                                                        doc.redirect_traff_urls[indexUrl].geo_traf_url=geo_url
                                                    }
                                                    try{
                                                        await doc.save();
                                                        res.json(doc)
                                                        }
                                                        catch(err){
                                                            console.log(err);
                                                            res.json({
                                                                flag:false
                                                            })
                                                        }

                                                 
                                                   });}
                                                   catch(er)
                                                   {
                                                       console.log(er);
                                                   }
                                                    }) 
        


                                                    admin.get("/admin/api/trds3f2333/getConfirmApp/",async (req,res)=>{
                                                        const app= await App.find({confirm_app:true})
                                                       await res.json(app)
                                                    })
                                                    admin.get("/admin/api/trds3f2333/getActiveApp/",async (req,res)=>{
                                                        const app= await App.find({status:"active",sold:false,confirm_app:false,visibility_public:true})
                                                        await res.json(app)
                                                    })
                                                    admin.get("/admin/api/trds3f2333/getAppInUse/",async (req,res)=>{
                                                        const app= await App.find({sold:true,visibility_public:false})
                                                        await res.json(app)
                                                    })
                                                    admin.get("/admin/api/trds3f2333/getAppHide/",async (req,res)=>{
                                                        const app= await App.find({sold:false,visibility_public:false,status:"active"})
                                                        await res.json(app)
                                                    })
                                                    admin.get("/admin/api/trds3f2333/getBanApp/",async (req,res)=>{
                                                        const app= await App.find({status:"ban"})
                                                        await res.json(app)
                                                    })
                                                    admin.get("/admin/api/trds3f2333/PendingApp/",async (req,res)=>{
                                                        const app= await App.find({status:"pending"})
                                                        await res.json(app)
                                                    })
                                                    admin.get("/admin/api/trds3f2333/getModerateApp/",async (req,res)=>{
                                                        const app= await App.find({status:"moderating"})
                                                        await res.json(app)
                                                    })
                                                    admin.get("/admin/api/trds3f2333/StateApp/",async (req,res)=>{
                                                        const app= await App.find({});
                                                        const state={
                                                            confirmApp:[],
                                                            activeApp:[],
                                                            inuseApp:[],
                                                            hideApp:[],
                                                            banApp:[],
                                                            pendingApp:[],
                                                            moderateApp:[]
                                                        }
                                                        try{
                                                        state.confirmApp=app.filter(el=>el.confirm_app===true)||[];
                                                        state.activeApp=app.filter(el=>el.sold===false&&el.status==="active"&&el.confirm_app===false&&el.visibility_public===true)||[];
                                                        state.inuseApp=app.filter(el=>el.sold===true&&el.status==="active"&&el.visibility_public===false)||[];
                                                        state.hideApp=app.filter(el=>el.sold===false&&el.status==="active"&&el.visibility_public===false)||[];
                                                        state.banApp=app.filter(el=>el.status==="ban")||[];
                                                        state.pendingApp=app.filter(el=>el.status==="pending")||[];
                                                        state.moderateApp=app.filter(el=>el.status==="moderating")||[];
                                                        }
                                                        catch(e){
                                                            console.log(e);
                                                        }


                                                        await res.json(state)
                                                    })



                                                    admin.put("/admin/api/trds3f2333/hideApp/",(req,res)=>{
                                                        App.findOne({_id:req.body.app_id},async function (err, doc){
                                                           doc.visibility_public=false;
                                                           doc.status="active"
                                                            try{
                                                             await doc.save();
                                                             res.json(doc)
                                                             }
                                                             catch(err){
                                                                 console.log(err);
                                                                 res.json({
                                                                     message:"app do not found"
                                                                 })
                                                             }
                                                           });
                                                         
                                                            }) 
                                                            admin.put("/admin/api/trds3f2333/moderateApp/",(req,res)=>{
                                                                App.findOne({_id:req.body.app_id},async function (err, doc){
                                                                   doc.visibility_public=false;
                                                                   doc.status="moderating",
                                                                   doc.url=""
                                                                   doc.installs=0
                                                                   doc.moderate_date=getDate()
                                                                    try{
                                                                     await doc.save();
                                                                     res.json(doc)
                                                                     }
                                                                     catch(err){
                                                                         console.log(err);
                                                                         res.json({
                                                                             message:"app do not found"
                                                                         })
                                                                     }
                                                                   });
                                                                 
                                                                    }) 



                                                            admin.put("/admin/api/trds3f2333/showApp/",(req,res)=>{
                                                                App.findOne({_id:req.body.app_id},async function (err, doc){
                                                                   doc.visibility_public=true;
                                                                   doc.status="active"
                                                                   
                                                                    try{
                                                                     await doc.save();
                                                                     res.json(doc)
                                                                     }
                                                                     catch(err){
                                                                         console.log(err);
                                                                         res.json({
                                                                             message:"app do not found"
                                                                         })
                                                                     }
                                                                   });
                                                                 
                                                                    }) 

                                                            admin.put("/admin/api/trds3f2333/shareAppToUser/",async(req,res)=>{//bundle=com.example.app
                                                                const appFind= await App.findOne({_id:req.body.app_id});
                                                                let flag=true;

                                                                const user=await User.find()
                                                                

                                                                for(let i=0;i<user.length;i++){
                                                                    if(user[i].share_app.filter(el=>req.body.app_id==el).length===0) {
                                                                    try{
                                                                   
                                                                    user[i].share_app.push(appFind);
                                                                    await user[i].save();}
                                                                    
                                                                    catch(err){
                                                                        console.log(err);
                                                                        flag=false;
                                                                    }
                                                                    
                                                                }  
                                                                }
                                                               
                                                            res.json({
                                                                        flag:flag
                                                                    })
                                                               
                                                     
                                                    
                                                                }) 
                                                                admin.put("/admin/api/trds3f2333/clearShareApp/",async (req,res)=>{
                                                                    let flag=true;
                                                                    const user=await User.find()
                                                                    for(let i=0;i<user.length;i++){ 
                                                                        try{
                                                                
                                                                        user[i].share_app=[];
                                                                        await user[i].save();
                                                                        }
                                                                        catch(err){
                                                                            console.log(err);
                                                                            flag=false
                                                                        }
                                                                        
                                                                
                                                                    }
                                                                    res.json({
                                                                        flag:flag
                                                                    })
                                                                   
                                                                        }) 
                                                                        admin.put("/admin/api/trds3f2333/clearShareAppbyId/",async (req,res)=>{
                                                                            const userIdTelegram=req.body.app_id;
                                                                            const user=await User.findOne({userIdTelegram:userIdTelegram})
                                                                            user.share_app=[];
                                                                            try{
                                                                                user.save();

                                                                            }catch(e){
                                                                                console.log(e);
                                                                            }
                                                                           
                                                                                }) 

                                                                        admin.put("/admin/api/trds3f2333/imageLink/",(req,res)=>{
                                                                            App.findOne({bundle:req.body.id},async function (err, doc){
                                                                               doc.image_link=req.body.image_link;
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
            

module.exports=admin