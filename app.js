const express=require("express")
const app=express()
const port=3000;
const cors=require("cors")
require('dotenv').config()
const userRouter=require("./routes/user.Route")
const bookRouter=require("./routes/book.Route")
const dbConnection=require("./database/db.js")


app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))


// database connect
dbConnection();

// endpoint
app.get("/api",(req,res)=>{
    res.send("api is open")
})

//user endpoint
app.use("/user",userRouter)



//book endpoint
app.use("/book",bookRouter)

//error point
app.all('*',(req,res,next)=>{
    next()
})

app.listen(port,(err)=>{
    if(err) throw new Error(err)
    console.log(`server is up and running on port ${port}`)
})