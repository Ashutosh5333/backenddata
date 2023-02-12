 const express = require("express")
const { ProductModel } = require("../models/Product.model")

 const productRouter = express.Router()


    productRouter.get("/product", async (req,res) => {
           const userId = req.body.userId
         const product = await ProductModel.find({userId:userId})
          console.log(product)
          res.send(product)
        //   res.send("welcome to product page")
    })

    productRouter.post("/product/create", async (req,res) =>{
           const payload= req.body
            try{
              const product = await ProductModel.create(payload)
                 await product.save()
               console.log(payload)
               res.send({"msg" :"data created sucessfully"})
            }catch(err){
                console.log(err)
                res.send({"msg" :"Something went wrongs"})
            }
    })

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

    
    productRouter.delete("/product/delete/:prodId" , async (req,res) =>{
        const prodId = req.params.prodId
        const userId = req.body.userId
        const payload=req.body
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



 module.exports={productRouter}