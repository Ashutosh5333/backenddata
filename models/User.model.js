const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:String,
    role:{type:String,default:"user"},
    followers:{type:mongoose.Types.ObjectId,ref:"user"},
    following:{type:mongoose.Types.ObjectId,ref:"user"}

})

const Usermodel = mongoose.model("user",UserSchema)

module.exports ={Usermodel}