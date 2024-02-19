var user=require("./userModel")

function add(req,res,next){
    console.log(req.params);
    new user({
        name:req.params.name,
        pwd: req.params.pwd
    }).save((err,data)=>{
        if(err){
        console.log(err);}else{
        console.log(data);
        res.json(data)}
    })
    

}

list=(req,res,next)=>{
    user.find((err,data)=>{
        if(err){
        console.log(err);}else{
        console.log(data);
        res.json(data)}
    })
}

module.exports={add,list}
