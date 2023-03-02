
const express = require("express")
const { ProductModel } = require("../models/Product.model")
const { Usermodel } = require("../models/User.model")
const profileRouter = express.Router()


 profileRouter.get("/user/:Id", (req,res) =>{
       Usermodel.findOne({_id:req.params.Id})
       .select("-password")
        .then((user) =>{
            ProductModel.find({postedby:req.params.Id})
            .populate("postedby",["name","_id","email","image"])
            .exec((err,pos) =>{
                 if(err){
                    return res.status(422).json({error:err})
                 }
                 res.json({user,pos})
            })
        }).catch((err) =>{
            return res.status(404).json({error:"User not found"})
        })
 })



 module.exports={
    profileRouter 
 }