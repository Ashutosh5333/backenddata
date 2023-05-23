const mongoose = require("mongoose")

const UserSchema = mongoose.Schema({
    name:String,
    email:String,
    password:String,
    image:{
        type:String,
        // default:"https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    role:{type:String,default:"user"},
    followers:{type:mongoose.Types.ObjectId,ref:"user"},
    following:{type:mongoose.Types.ObjectId,ref:"user"}

})

const Usermodel = mongoose.model("user",UserSchema)

module.exports ={Usermodel}