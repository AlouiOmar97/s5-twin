var joueur=require("../models/joueurModel")

function add(req,res,next){
    console.log(req.params);
    new joueur({
        pseudo:req.params.pseudo,
        sante: 100,
        score: 0        
    }).save((err,data)=>{
        if(err){
        console.log(err);}else{
        console.log(data);
        res.json(data)}
    })
    

}

list=(req,res,next)=>{
    joueur.find((err,data)=>{
        if(err){
        console.log(err);}else{
        console.log(data);
        res.json(data)}
    })
}

const attaqueJoueur =async (req,res,next)=>{
    const {attaquant , victime } = req.params
    let scoreAt=0
    let santeVi=0
    await joueur.findById(attaquant).then(
        (data,err)=>{
            if(err){
                console.log(err);}else{
                   // console.log(data);
                scoreAt=parseInt(data.score) + 10
                console.log(scoreAt);
                console.log("###########################");
                }
            }  
    )
    await joueur.findById(victime).then(
        (data,err)=>{
            if(err){
                console.log(err);}else{
                  //  console.log(data);
                santeVi=parseInt(data.sante)-20
                }
            }  
    )
    //scoreAt=scoreAt+10
    await joueur.findByIdAndUpdate(attaquant,{score: scoreAt}).then(
        (data,err)=>{
            if(err){
                console.log(err);}else{
                //console.log(data);
                //res.json(data)
            }
            }  
    )
   // santeVi=santeVi-20
   console.log("sante"+santeVi);
    await joueur.findByIdAndUpdate(victime,{sante: santeVi}).then(
        (data,err)=>{
            if(err){
                console.log(err);}else{
                //console.log(data);
                res.json(data)}
            }  
    )

}

const updateJoueur = (req,res,next)=>{
    joueur.findByIdAndUpdate(req.params.id,{pseudo: req.body.pseudo,sante: req.body.sante,score: req.body.score}).then(
        (data,err)=>{
            if(err){
                console.log(err);}else{
                console.log(data);
                res.json(data)}
            }  
    )

}
const deleteJoueur = (req,res,next)=>{
   const user= joueur.findByIdAndDelete(req.params.id).then(
    (data,err)=>{
        if(err){
            console.log(err);}else{
            console.log(data);
            res.json(data)}
        }  
)
       

    
}

module.exports={add,list,updateJoueur, attaqueJoueur, deleteJoueur}
