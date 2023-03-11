const express = require("express")
const jwt = require("jsonwebtoken")
const bcrypt= require("bcrypt")
const cors = require("cors")
const { connection } = require("./config/db")
const {Usermodel} = require("./models/User.model")
const { BugRouter } = require("./routes/data.route")
const { authenticate } = require("./middleware/authenticate")
const { productRouter } = require("./routes/product.route")
const { profileRouter } = require("./routes/Profileuser.route")

const app = express()
app.use(express.json())

app.use(cors({
  origin:"*"
}))


app.get("/" , (req,res) => {
    res.send("welcome home")
})

app.get("/signupdata", async (req,res) =>{
    const user = await Usermodel.find()
    res.send(user)
})


app.post("/signup", async(req,res) => {
  const {email,password,name}= req.body;
     const userPresent = await Usermodel.findOne({email})
       if(userPresent){
         res.send("user is alredy present")
         return 
       }
   try{
     bcrypt.hash(password, 4, async function(err, hash) {
         const user = new Usermodel({email,password:hash,name})
         await user.save()
         res.send("Signup sucesfully")
     })
   }
   catch(err){
     console.log(err)
     res.send("Something went wrong ply try again later")
   }
})


app.post("/login", async(req,res) =>{
  const {email,password,name,_id,image} = req.body;
  
  try{
    
   const user = await Usermodel.find({email})
      // console.log(user)
     if(user.length > 0){
        const hashed_password = user[0].password;
        // console.log("hash",hashed_password)
        bcrypt.compare(password,hashed_password,function(err, result){
            if(result){
                const token= jwt.sign({userId:user[0]._id}, "hush");
                res.send({"msg":"Login sucessfull", "token":token , data:{email,name,_id,image} })
            }
            else{
              res.send("Please check password")
            }

        }) }
        else{
          res.send("first registered")
        }
  }
  catch{
    res.send("authentication failed 3")
  }
})

  app.put("/follow", (req,res) =>{
        // res.send("hello")
      // const followId = req.body.followId
      const userId = req.body.userId
         Usermodel.findByIdAndUpdate(req.body.followId,{
         $push:{followers:userId}
     },{
       new:true,
     }), (err,result) => {
          if(err){
             return res.status(422).json({error:err})
          }
           Usermodel.findByIdAndUpdate(userId,{
            $push:{following: req.body.followId}
        },{
          new:true 
        }).then(result =>{
          //  console.log(result)
          res.json(result)
        }).catch(err =>{
           return res.status(422).json({error:err})
        })
      }
 })



 app.put("/unfollow", async (req,res) =>{
  const userId = req.body.userId
      Usermodel.findByIdAndUpdate(req.body.unfollowId,{
     $pull:{followers:userId}
 },{
   new:true,
 }), (err,result) =>{
      if(err){
         return res.status(422).json({error:err})
      }
       Usermodel.findByIdAndUpdate(userId,{
        $pull:{following:req.body.unfollowId}
    },{
      new:true
    }).then(result =>{
      res.json(result)
    }).catch(err =>{
       return res.status(422).json({error:err})
    })
  }
})

    


app.use(authenticate)
app.use(productRouter)
app.use(BugRouter)
app.use(profileRouter)


app.listen(8000, async (req,res) =>{
      try{
        await connection;
        console.log("connected to database")
      }
      catch(err){
        console.log("something went wrong in connected")
        console.log(err)
      }

    console.log("listening on port 8000")
})


