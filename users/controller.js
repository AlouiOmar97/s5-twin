var express= require("express")
var router=express.Router()
var userService=require("./userService")
var {list}=require("./userService")
router.get("/add/:name/:pwd",userService.add)
router.get("/list",list)

module.exports= router