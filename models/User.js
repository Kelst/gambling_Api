const mongoose=require("mongoose");
const Schema=mongoose.Schema;

const UserSchema=new Schema({
   userName:{type:String,required:true},
   userIdTelegram:{type:String,required:true},
   userTelegram_nik:{ type:String,default:""} ,
   installs_all:{type:Number,default:0},
   apps:[{ type: Schema.Types.ObjectId, ref: 'App' ,default:[]}],
   share_app:[{ type: Schema.Types.ObjectId, ref: 'App' ,default:[]}]
})
module.exports=mongoose.model("User",UserSchema)
 