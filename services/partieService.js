var partie=require("../models/partieModel")
var joueur=require("../models/joueurModel")
var socket = require("socket.io")
function socketIO(server){
    const io=  socket(server)
    io.on('connection',(socket)=>{
        console.log('user connected');
        socket.broadcast.emit("msg","A new user is connected")
    //test
    socket.on('afficherStat',async (data)=>{
        console.log("Afficher stat");
        console.log(data);
        await joueur.findById(data.id1).then(
            (data,err)=>{
                if(err){
                    console.log(err);}else{
                       console.log(data);
                       io.emit("msg",JSON.stringify(data))
                    }
                }  
        )
        await joueur.findById(data.id2).then(
            (data,err)=>{
                if(err){
                    console.log(err);}else{
                       console.log(data);
                       io.emit("msg",JSON.stringify(data))
                    }
                }  
        )
    })
    socket.on('addPartie',async (data)=>{
        console.log(data);
      await  new partie({
            nom:data.nom,
            joueur_1: data.id1,
            joueur_2: data.id2,
            etat: "en cours"
        }).save((err,data)=>{
            if(err){
            console.log(err);}else{
            console.log(data);
           // res.json(data)
        }
        })
    })
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

async function add(req,res,next){
    console.log(req.params);
   await new partie({
        nom:req.params.nom,
        joueur_1: req.params.joueur_1,
        joueur_2: req.params.joueur_2,
        etat: "en cours"
    }).save((err,data)=>{
        if(err){
        console.log(err);}else{
        console.log(data);
        res.json(data)}
    })
    

}

list=(req,res,next)=>{
    partie.find((err,data)=>{
        if(err){
        console.log(err);}else{
        console.log(data);
        res.json(data)}
    })
}

const updatePartie = (req,res,next)=>{
    partie.findByIdAndUpdate(req.params.id,{nom: req.body.nom,joueur_1: req.body.joueur_1,joueur_2: req.body.joueur_2, etat: req.body.etat}).then(
        (data,err)=>{
            if(err){
                console.log(err);}else{
                console.log(data);
                res.json(data)}
            }  
    )

}
const deletePartie = (req,res,next)=>{
   const user= partie.findByIdAndDelete(req.params.id).then(
    (data,err)=>{
        if(err){
            console.log(err);}else{
            console.log(data);
            res.json(data)}
        }  
)
       

    
}

module.exports={ socketIO, add,list,updatePartie, deletePartie}
