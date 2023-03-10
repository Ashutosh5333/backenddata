const jwt = require("jsonwebtoken")
const bcrypt= require("bcrypt")
const express = require("express");
const { Usermodel } = require("../models/User.model");

  const UserRouter = express.Router()


//   UserRouter.post("/signup", async(req,res) => {
//     const {email,password,name}= req.body;
//        const userPresent = await Usermodel.findOne({email})
//          if(userPresent){
//            res.send("user is alredy present")
//            return 
//          }
//      try{
//        bcrypt.hash(password, 4, async function(err, hash) {
//            const user = new Usermodel({email,password:hash,name})
//            await user.save()
//            res.send("Signup sucesfully")
//        })
//      }
//      catch(err){
//        console.log(err)
//        res.send("Something went wrong ply try again later")
//      }
//   })
  
  
//   UserRouter.post("/login", async(req,res) =>{
//     const {email,password,name,_id,image} = req.body;
    
//     try{
      
//      const user = await Usermodel.find({email})
//         // console.log(user)
//        if(user.length > 0){
//           const hashed_password = user[0].password;
//           // console.log("hash",hashed_password)
//           bcrypt.compare(password,hashed_password,function(err, result){
//               if(result){
//                   const token= jwt.sign({userId:user[0]._id}, "hush");
//                   res.send({"msg":"Login sucessfull", "token":token , data:{email,name,_id,image} })
//               }
//               else{
//                 res.send("Please check password")
//               }
  
//           }) }
//           else{
//             res.send("first registered")
//           }
//     }
//     catch{
//       res.send("authentication failed 3")
//     }
//   })

  module.exports={
     UserRouter
  }