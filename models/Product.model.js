 const mongoose = require("mongoose")

 const ProductSchema= mongoose.Schema({
     name:String,
     Brand:String,
     category:[],
     Price:Number,
     Image:String
 })

 const ProductModel = mongoose.model("Product",ProductSchema)

 module.exports={
    ProductModel
 }