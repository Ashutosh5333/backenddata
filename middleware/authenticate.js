const jwt = require("jsonwebtoken");
const { default: mongoose } = require("mongoose");
const  user = mongoose.model("user")
 console.log(user)

const authenticate = (req, res, next) => {
   const  token = req.headers?.authorization?.split(" ")[1];
  //  const  p = {_id}
       if(token){
         const decoded = jwt.verify(token, "hush")
          if(decoded){
             const userId= decoded.userId
             req.body.userId=userId
            //  console.log(decoded)
             
              // user.findById(p).then(userdata =>{
              //   req.user=userdata
              // })

            next()
          }
          else{
            res.send({msg:"you are not authenticated login please"})
          }
       } 
       else{
        res.send({msg:"you are not authenticated"})
       }

 }

  module.exports={authenticate}