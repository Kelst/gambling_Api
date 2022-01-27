const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const AppSchema=new Schema({
    bundle:String,
    name:{type:String,default:"Test Name"},
    price:Number,
    url:{type:String,default:""},
    type:{
        type:String,
        enum:["gambling","crypto","dating","application"],
        default:"application"
    },
    google_play_url:{type:String,default:""},
    image_link:{type:String,default:""},
    description:{type:String,default:""},
    visibility_public :{type:Boolean,default:true},
    status:{
        type:String,
        enum:["active","ban"],
        default:"active"
    },
    sold :{type:Boolean,default:false},
    redirect_traff_url:{type:String,default:""},
    redirect_traff_percent:{type:Number,default:0},
    installs:{type:Number,default:0},
    notification_image:{type:String,default:""},
    notification_title:{type:String,default:""},
    notification_text:{type:String,default:""},
    notification_interval :{type:Number,default:600},
    notification_start :{type:Number,default:600},
    geo:{
        type:[{geo_it:String,installs:0}],
        
    }

})
module.exports=mongoose.model("App",AppSchema)
