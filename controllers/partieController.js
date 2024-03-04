var express= require("express")
var router=express.Router()
var partieService=require("../services/partieService")
var validation = require('../middleware/validation')
var {list}=require("../services/partieService")
router.get("/list",list)
router.get("/add/:nom/:joueur_1/:joueur_2", partieService.add)
router.get('/test',(req,res)=>{res.render('partie')})
/*
//router.put("/update/:id",partieService.updatepartie)
router.get("/delete/:id",partieService.deletepartie)
router.get('/test',(req,res)=>{res.render('chat')})*/
module.exports= router