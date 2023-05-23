
const express = require("express")
const { ReelModel } = require("../models/Reel.model")


 const ReelRouter = express.Router()


    ReelRouter.get("/allReel", async (req,res) => {
        
            try{
              const AllReel = await ReelModel.find().populate("postedby",["name","email","image"])
              .populate("comments.postedby",["name","_id","image","username"])
          
               res.send(AllReel)
            }
            catch(err){
              console.log(err)
            }
      
    })


    

   //---------- my post -------------//

     ReelRouter.get("/myReel", async (req,res) => {
    try{
      const  MyReelData = await ReelModel.find({userId:req.body.userId}).populate("postedby",["name","email","image","username"]) 
         res.send(MyReelData)
    }
    catch(err){
      console.log(err)
      res.send("not authrized")
    }
   })

    // ------------------------- Post ------------------------- //

    ReelRouter.post("/Reel/create", async (req,res) => {
           const payload= req.body
            const userId = req.body.userId
            try{
              const Reels = await ReelModel.create({...payload,postedby:userId})
                 await Reels.save()
               res.send({"msg" :"Post sucessfully"})
            }catch(err){
                console.log(err)
                res.send({"msg" :"Something went wrongs"})
            }
    })

    
        // ------------- Patch req ------------ //


    ReelRouter.patch("/Reel/edit/:prodId" , async (req,res) =>{
              const prodId = req.params.prodId
              const userId = req.body.userId
              const payload=req.body
              try{
                 const productdata = await ReelModel.findOne({_id:prodId})
                   if(userId!==productdata.userId){
                     res.send("you are not authorized")
                   }else{
                       const updatedproduct = await Reelmodel.findByIdAndUpdate({_id:prodId},payload)
                       res.send({"msg" :"data updated sucessfully" })
                   }
              }catch(err){
                console.log(err)
                res.send({"msg" :"Something went wrongs"})
              }

    })


// ------------- Delete req ------------ //


    ReelRouter.delete("/Reel/delete/:prodId" , async (req,res) =>{
        const prodId = req.params.prodId
        const userId = req.body.userId
        
        try{
           const Reeldata = await Reelmodel.findOne({_id:prodId})
             if(userId!==Reeldata.userId){
               res.send("you are not authorized")
             }else{
                 await Reelmodel.findOneAndDelete({_id:prodId})
                 res.send({"msg" :"post Deleted sucessfully" })
             }
        }catch(err){
          console.log(err)
          res.send({"msg" :"Something went wrongs"})
        }

})


  // ReelRouter.put("/likes/:postId" ,(req,res) =>{
  //        const userId = req.body.userId
  //       Reelmodel.findByIdAndUpdate(req.params.postId, {
  //           $push:{likes:userId}
  //        }, {
  //         new:true
  //        }).exec((err,result) =>{
  //          if(err){
  //           return res.status(422).json({error:err})
  //          }
  //          else{
  //            res.json(result)
  //          }
  //        })  
  // })



//   ReelRouter.put("/unlikes/:postId" ,(req,res) =>{
//     const userId = req.body.userId
//     Reelmodel.findByIdAndUpdate(req.params.postId, {
//        $pull:{likes:userId}
//     }, {
//      new:true
//     }).exec((err,result) =>{
//       if(err){
//        return res.status(422).json({error:err})
//       }
//       else{
//         res.json(result)
//       }
//     })   
// })


// ReelRouter.put("/comment/:postId" ,(req,res) => {
//    const userId = req.body.userId
//   const  comment ={
//       text:req.body.text,
//       postedby:userId
//   } 
//   Reelmodel.findByIdAndUpdate(req.params.postId, {
//      $push:{comments:comment}
//   }, {
//    new:true
//   }).populate("comments.postedby",["name","_id","image","username"]) 
//   .populate("postedby",["name","_id","image","username"])
//   .exec((err,result) =>{
//     if(err){
//      return res.status(422).json({error:err})
//     }
//     else{
//       res.json(result)
//     }
//   })   
// })
 









 module.exports={ReelRouter}