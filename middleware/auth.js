const UserSchema=require('../models/user.model')
const jwt=require('jsonwebtoken')


const userAuth=async (req,res,next)=>{
    try{

        const token=req.header('token')
        const decode=jwt.verify(token,process.env.JWT_TOKEN)
        if(!decode.userId || !decode.userEmail){
            // create err bridge
            next()
        }else{
            const user=await UserSchema.findById(decode.userId)
            if(user && user.isActive){
                req.userId=decode.userId;
                next();
            }else{
                // create error bridge
                next()
            }
        }
    }catch(err){
        console.log(err)
    }
}

module.exports=userAuth;