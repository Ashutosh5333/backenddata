 const mongoose = require("mongoose")
//  const {ObjectId} = mongoose.Schema.Types

 const ProductSchema= mongoose.Schema({
     description:String,
     title:String,
     pic:String,
     userId:String,
     postedby:{type:mongoose.Types.ObjectId,ref:"user",required:true}
 },{
    timestamps:true
 })

 const ProductModel = mongoose.model("Product",ProductSchema)

 module.exports={
    ProductModel
 }