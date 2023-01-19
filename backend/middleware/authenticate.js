const jwt = require("jsonwebtoken")


 const authenticate = (req, res, next) => {
   const  token = req.headers?.authorization?.split(" ")[1];

       if(token){
         const decoded = jwt.verify(token, "hush")
          if(decoded){
             console.log(decoded)
            next()
          }
          else{
            res.send("Please Login again")
          }
       } 
       else{
        res.send("Please Login")
       }

 }

  module.exports={authenticate}