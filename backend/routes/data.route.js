
const express = require("express")

const {BugModel}= require("../models/data.model")

const BugRouter = express.Router();


BugRouter.get("/data", async(req,res) =>{
    const Bug = await BugModel.find()
    res.send(Bug)
})


BugRouter.post("/create", async(req,res) =>{
     const payload = req.body;
      try{
      const newdata= new BugModel(payload)
        await newdata.save()
     res.send({"msg":"data created sucessfully"})
      }catch(err){
          console.log(err)
          res.send({"err":"Something went wrong"})
      }
})


// ================


BugRouter.patch("/update/:dataId", async(req,res) =>{
    const dataId = req.params.dataId
    const payload = req.body;

        await BugModel.findByIdAndUpdate({_id:dataId},payload)
        res.send({"msg":"update data created sucessfully"})
})
// ==============


BugRouter.delete("/delete/:dataId", async(req,res) =>{
    const dataId = req.params.dataId
     await BugModel.findByIdAndDelete({_id:dataId})
     res.send({"msg":"Delete data sucessfully"})
})


module.exports={BugRouter}
 