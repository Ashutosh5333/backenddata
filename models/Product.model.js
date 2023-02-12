 const mongoose = require("mongoose")

 const ProductSchema= mongoose.Schema({
     description:String,
     image:[]
 },{
    timestamps:true
 })

 const ProductModel = mongoose.model("Product",ProductSchema)

 module.exports={
    ProductModel
 }