const express=require("express")
const app=express()
const port=3000;
const cors=require("cors")
require('dotenv').congig()



app.use(cors())
app.use(express.json())
app.use(express.static('uploads'))


// endpoint
app.get("/api",(req,res)=>{
    res.send("api is open")
})

//user endpoint



//book endpoint

//error point
app.all('*',(req,res,next)=>{
    next()
})

app.listen(port,(err)=>{
    if(err) throw new Error(err)
    console.log(`server is up and running on port ${port}`)
})