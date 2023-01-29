
const express = require("express")

const {BugModel}= require("../models/data.model")

const BugRouter = express.Router();


BugRouter.get("/data", async(req,res) =>{
      try{
          const Bug = await BugModel.find({userId:req.body.userId})
          res.send(Bug)
      }catch(err){
        console.log(err)
        res.send("error in get bug data")
      }
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
    const userId=req.body.userId
    const payload = req.body;
      try{
        const bugdata= await BugModel.findOne({_id:dataId})  
          if(userId!==bugdata.userId){
            res.send("you are not authnticated")
          }else{
            await BugModel.findByIdAndUpdate({_id:dataId},payload)
            res.send({"msg":"update data created sucessfully"})
          }
      }catch(err){
        console.log(err)
        res.send({"msg":"item updated successfully"})
      }

       
})
// ==============


BugRouter.delete("/delete/:dataId", async(req,res) =>{
    const dataId = req.params.dataId
    const userId=req.body.userId
        try{
           const bugdata= await BugModel.findOne({_id:dataId})  
             if(userId !==bugdata.userId){
                res.send("you are not authroised")
             }else{
                await BugModel.findByIdAndDelete({_id:dataId})  
                res.send({"msg":"item deleted succesfully"})
             }
        }  catch(err){
            console.log(err)
            res.send("some error in delted data" )
        }
    
})


module.exports={BugRouter}
 