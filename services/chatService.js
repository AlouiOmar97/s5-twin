var chat=require("../models/chatModel")
var socket = require("socket.io")
function socketIO(server){
    const io=  socket(server)
    io.on('connection',(socket)=>{
        console.log('user connected');
        socket.emit("msg","A new user is connected")
    //test
    })
}

function add(req,res,next){
    console.log(req.params);
    new chat({
        Content:req.params.Content
    }).save((err,data)=>{
        if(err){
        console.log(err);}else{
        console.log(data);
        res.json(data)}
    })
    

}

list=(req,res,next)=>{
    chat.find((err,data)=>{
        if(err){
        console.log(err);}else{
        console.log(data);
        res.json(data)}
    })
}

const updateChat = (req,res,next)=>{
    chat.findByIdAndUpdate(req.params.id,{Content: req.body.Content}).then(
        (data,err)=>{
            if(err){
                console.log(err);}else{
                console.log(data);
                res.json(data)}
            }  
    )

}
const deleteChat = (req,res,next)=>{
   const user= chat.findByIdAndDelete(req.params.id).then(
    (data,err)=>{
        if(err){
            console.log(err);}else{
            console.log(data);
            res.json(data)}
        }  
)
       

    
}

module.exports={ socketIO,add,list,updateChat, deleteChat}
