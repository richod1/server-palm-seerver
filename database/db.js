const mongoose=require('mongoose')
require("dotenv").config()

const dbConnection=()=>{
    mongoose.set('strictQuery',true)
    mongoose.connect(process.env.DB_URL).then(()=>{
        console.log("Db connected success")
    })
}

module.exports=dbConnection;