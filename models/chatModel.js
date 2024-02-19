var mongoose=require("mongoose")
var Schema=mongoose.Schema

var Chat=new Schema({
    Content: String,
})

module.exports= mongoose.model("chat",Chat)