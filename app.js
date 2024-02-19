var http=require("http")
var express=require("express")
var mongoose=require("mongoose")
var mongoConfig= require("./config/mongoConfig.json")
var contactRoutes= require("./controllers/conatctController")
var app=express()
app.use(express.json())
app.use("/contacts",contactRoutes)
mongoose.connect(mongoConfig.uri,{
    }).then(()=>{
        console.log("DB connected");
    }).catch(err=>{
        console.log(err);
    })
var server=http.createServer(app)
server.listen(3000,()=>{
    console.log("server started   ");
})