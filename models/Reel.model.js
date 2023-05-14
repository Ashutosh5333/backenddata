const mongoose = require("mongoose")


const ReelSchema= mongoose.Schema({
    avtarsrc:String,
    url:String,
    song:String,
    channel:String,
    userId:String,
    likes:[{type:mongoose.Types.ObjectId,ref:"user"}],
    comments:[{
     text:String,
     postedby:{type:mongoose.Types.ObjectId,ref:"user"}
    }],
    postedby:{type:mongoose.Types.ObjectId,ref:"user",required:true}
},{
   timestamps:true
})


const ReelModel = mongoose.model( "Reel", ReelSchema)

module.exports={
    ReelModel
}