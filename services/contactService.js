var contact=require("../models/contactModel")

function add(req,res,next){
    console.log(req.params);
    new contact({
        FullName:req.params.FullName,
        Phone: req.params.Phone
    }).save((err,data)=>{
        if(err){
        console.log(err);}else{
        console.log(data);
        res.json(data)}
    })
    

}

list=(req,res,next)=>{
    contact.find((err,data)=>{
        if(err){
        console.log(err);}else{
        console.log(data);
        res.json(data)}
    })
}

const updateContact = (req,res,next)=>{
    contact.findByIdAndUpdate(req.params.id,{FullName: req.body.FullName,Phone: req.body.phone}).then(
        (data,err)=>{
            if(err){
                console.log(err);}else{
                console.log(data);
                res.json(data)}
            }  
    )

}
const deleteContact = (req,res,next)=>{
   const user= contact.findByIdAndDelete(req.params.id).then(
    (data,err)=>{
        if(err){
            console.log(err);}else{
            console.log(data);
            res.json(data)}
        }  
)
       

    
}

module.exports={add,list,updateContact, deleteContact}
