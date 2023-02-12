const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:String
})

const Usermodel = mongoose.model("user",UserSchema)

module.exports ={Usermodel}