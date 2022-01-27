const bodyParser = require("body-parser");
const express=require("express")
const mongoose=require("mongoose");
const cors=require("cors")
const admin=require("./routes/admin")
const user=require("./routes/user")
const bot=require("./routes/bot")
const fileUpload = require('express-fileupload');
require('dotenv/config')
const PORT=process.env.PORT || 3000

const app=express();
app.use(cors())
app.use(bodyParser.json())
app.use(admin)
app.use(user)
app.use(bot)
app.use(fileUpload({}));
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser:true},
    ()=>console.log("Connect DB")  
    )  
    ///

  
    app.listen(PORT,()=>{
        console.log("Server has been started on port "+PORT)
    })
    