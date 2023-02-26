 const mongoose = require("mongoose")


 const ProductSchema= mongoose.Schema({
     description:String,
     title:String,
     pic:[],
     userId:String,
     likes:[{type:mongoose.Types.ObjectId,ref:"user"}],
     comments:[{
      text:String,
      postedby:{type:ObjectId,ref:"user"}
     }],
     postedby:{type:mongoose.Types.ObjectId,ref:"user",required:true}
 },{
    timestamps:true
 })

 const ProductModel = mongoose.model("Product",ProductSchema)

 module.exports={
    ProductModel
 }