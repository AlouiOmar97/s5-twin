var chat=require("../models/chatModel")
var socket = require("socket.io")
function socketIO(server){
    const io=  socket(server)
    io.on('connection',(socket)=>{
        console.log('user connected');
        socket.broadcast.emit("msg","A new user is connected")
    //test
        socket.on("sendMsg",async function (data){
           console.log(data);
             io.emit("msg",data.username+ ' : '+data.message)
           await  new chat({
                Content:data.message
            }).save((err,data)=>{
                if(err){
                console.log(err);}else{
                console.log(data);
                }
                
            })
            })
        socket.on("isTyping",(data)=>{
            socket.broadcast.emit("msg",data)
        })

        socket.on("disconnect",()=>{
            io.emit("msg","user is disconnected")

        })
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
