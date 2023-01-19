const mongoose = require("mongoose")


const BugSchema = mongoose.Schema({
    title:String,
    category:[]
})

const  BugModel = mongoose.model("Bug",BugSchema)

module.exports={
   BugModel
}