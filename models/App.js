const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const AppSchema=new Schema({
    bundle:String,
    name:{type:String,default:"Test Name"},
    price:Number,
    confirm_app:{
        type:Boolean,
        default:false
    },
    user_confirm:{
        type:String,
        default:""
    },
    dateConfirm:{
        type:String,
        default:""
    }
    ,
    url:{type:String,default:""},
    type:{
        type:String,
        enum:["gambling","crypto","dating","application"],
        default:"application"
    },
    google_play_url:{type:String,default:""},
    image_link:{type:String,default:""},
    description:{type:String,default:""},// змінювати коли пройде в плайсторі.
    visibility_public :{type:Boolean,default:false},
    status:{
        type:String,
        enum:["active","ban","pending"],
        default:"pendding"
    },
    sold :{type:Boolean,default:false},
    redirect_traff_url:{type:String,default:""},
    redirect_traff_urls:{
        type:[String]
            
        
    },
    redirect_traff_percent:{type:Number,default:0},
    installs:{type:Number,default:0},
    notification_image:{type:String,default:""},
    notification_title:{type:String,default:"Title"},
    notification_text:{type:String,default:"Text"},
    notification_interval :{type:Number,default:600},
    notification_start :{type:Number,default:600},
    max_count:{type:Number,default:10},
    save_last_url:{type:Boolean,default:true},
    geo:{
        type:[{geo_it:String,installs:0}],
    },
    date:{
        type:[{date_N:String,installs:0}]
    }
        
})
module.exports=mongoose.model("App",AppSchema)
            