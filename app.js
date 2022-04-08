const express = require('express');
const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
SECRET = "RESTAPI"
var cors = require('cors')

PORT = 5000
const loginRoutes = require("./routes/auth")
const userRoutes = require("./routes/users")
const postRoutes = require("./routes/posts")

const app = express(); 


mongoose.connect('mongodb+srv://vaman55:vaman12345@cluster0.u95fx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{ useNewUrlParser: true }).then( () => console.log("MongoDB Connected")).catch( (err) => console.log("MongoDB error"))

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

const whitelist =[
    "http://localhost:3000"
]
app.use(cors({
    origin:(origin,callback)=>{
        if (whitelist.indexOf(origin)!==-1||!origin){
            callback(null,true)
        }else{
            callback(new Error("Not allowed"))
        }
    },optionsSucsessStatus:200
}))



app.use("/posts",(req,res,next)=>{

    var token = req.headers.authorization.split("Bearer ")[1];
    if(!token){
        return res.status(401).json({
            status:"failed",
            message:"token is missing"
        })
    }
    jwt.verify(token,SECRET,function(err,decoded){  
        if(err){
            return res.status(401).json({
                status:"failed",
                message:"invalid token"
            })
        }
        else{
            req.user = decoded.data
            next();
        }
    })
})


app.use("/",loginRoutes)
app.use("/users",userRoutes)
app.use("/",postRoutes)


app.listen(PORT,()=>{  
    console.log(`server listening on port ${PORT}`);
})
