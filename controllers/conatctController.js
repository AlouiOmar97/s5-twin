var express= require("express")
var router=express.Router()
var contactService=require("../services/contactService")
var validation = require('../middleware/validation')
var {list}=require("../services/contactService")
router.get("/add/:FullName/:Phone",validation, contactService.add)
router.get("/list",list)
router.put("/update/:id",contactService.updateContact)
router.delete("/delete/:id",contactService.deleteContact)

module.exports= router