 const { json } = require("express")
const express = require("express")
const { ProductModel } = require("../models/Product.model")

 const productRouter = express.Router()


    productRouter.get("/product", async (req,res) => {
            try{
              // const userId = req.body.userId
              const product = await ProductModel.find().populate("postedby",["name","email","image"])
              .populate("comments.postedby",["name","_id","image","username"])
              console.log(product)
               res.send(product)
            }
            catch(err){
              console.log(err)
            }
      
    })

   //---------- my post -------------//


   productRouter.get("/mypost", async (req,res) => {
    try{
      const  productData = await ProductModel.find({userId:req.body.userId}).populate("postedby",["name","email","image","username"]) 
         res.send(productData)
    }
    catch(err){
      console.log(err)
      res.send("not authrized")
    }
})

    // ------------------------- Post ------------------------- //
    productRouter.post("/product/create", async (req,res) => {
           const payload= req.body
            const userId = req.body.userId
            try{
              const product = await ProductModel.create({...payload,postedby:userId})
                 await product.save()
              //  console.log(payload)
               res.send({"msg" :"data created sucessfully"})
            }catch(err){
                console.log(err)
                res.send({"msg" :"Something went wrongs"})
            }
    })

    
// ------------- Patch req ------------ //

    productRouter.patch("/product/edit/:prodId" , async (req,res) =>{
              const prodId = req.params.prodId
              const userId = req.body.userId
              const payload=req.body
              try{
                 const productdata = await ProductModel.findOne({_id:prodId})
                   if(userId!==productdata.userId){
                     res.send("you are not authorized")
                   }else{
                       const updatedproduct = await ProductModel.findByIdAndUpdate({_id:prodId},payload)
                       res.send({"msg" :"data updated sucessfully" })
                   }
              }catch(err){
                console.log(err)
                res.send({"msg" :"Something went wrongs"})
              }

    })

// ------------- Delete req ------------ //
    

    productRouter.delete("/product/delete/:prodId" , async (req,res) =>{
        const prodId = req.params.prodId
        const userId = req.body.userId
        
        try{
           const productdata = await ProductModel.findOne({_id:prodId})
             if(userId!==productdata.userId){
               res.send("you are not authorized")
             }else{
                 await ProductModel.findOneAndDelete({_id:prodId})
                 res.send({"msg" :"data Deleted sucessfully" })
             }
        }catch(err){
          console.log(err)
          res.send({"msg" :"Something went wrongs"})
        }

})

  productRouter.put("/likes/:postId" ,(req,res) =>{
         const userId = req.body.userId
        ProductModel.findByIdAndUpdate(req.params.postId, {
            $push:{likes:userId}
         }, {
          new:true
         }).exec((err,result) =>{
           if(err){
            return res.status(422).json({error:err})
           }
           else{
             res.json(result)
           }
         })  
  })



  productRouter.put("/unlikes/:postId" ,(req,res) =>{
    const userId = req.body.userId
    ProductModel.findByIdAndUpdate(req.params.postId, {
       $pull:{likes:userId}
    }, {
     new:true
    }).exec((err,result) =>{
      if(err){
       return res.status(422).json({error:err})
      }
      else{
        res.json(result)
      }
    })   
})


productRouter.put("/comment/:postId" ,(req,res) => {
   const userId = req.body.userId
  const  comment ={
      text:req.body.text,
      postedby:userId
  } 
  ProductModel.findByIdAndUpdate(req.params.postId, {
     $push:{comments:comment}
  }, {
   new:true
  }).populate("comments.postedby",["name","_id","image","username"]) 
  .populate("postedby",["name","_id","image","username"])
  .exec((err,result) =>{
    if(err){
     return res.status(422).json({error:err})
    }
    else{
      res.json(result)
    }
  })   
})
 
// ---------- like ---------- //

// productRouter.put("/likes/:prodId" , async (req,res) =>{
//   try{
//       const prodId= req.params.prodId
//        const post = await ProductModel.findById(prodId)
  
//         //  if (post.likes.filter(like => like.userId === post.likes.userId).length>0 ){
//         //   return res.json(400).json({msg:"Post already liked"})
//         //  }
//         //  const prodd= req.params.prodId
//           post.likes.unshift({userId:req.userId})
//             // post.likes.push({userId:req.body.userId})
//             //  post.likes.push({userId:req.body.userId})
//           await post.save();
//           res.json(post.likes)
//     }catch(err){
//       console.log(err)
//       res.status(500).send("Server Error")
//     }
// })








 module.exports={productRouter}