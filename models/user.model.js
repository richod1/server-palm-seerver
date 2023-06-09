const mongoose=require('mongoose')


const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minLength:[3,"name is too short"],
        maxLength:[20,"name is too long"]
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    
    },
    phone:{
        type:String,
        maxLength:10,
        minLength:9,
    },
    isDeleted:{
        default:false,
        type:boolean
    },
    isVerified:{
        type:boolean,
        default:false
    },
    isActive:{
        type:bookean,
        default:false
    },
    resetToken:{
        type:String,
    },
    issuedBook:{
        type:Array,
        default:[]
    }
    
    },
    {timestamps:true})
    
    module.exports=mongoose.model('user',UserSchema)