const UserSchema=require('../models/user.model')
const jwt=require('jsonwebtoken')


const userAuth=async (req,res,next)=>{
    try{

        const token=req.header('token')
        const decode=jwt.verify(token,process.env.JWT_TOKEN)
        if(!decode.userId || !decode.userEmail){
            // create err bridge
          res.status(401).json({
            msg:"failed"
          })
        }else{
            const user=await UserSchema.findById(decode.userId)
            if(user && user.isActive){
                req.userId=decode.userId;
                next();
            }else{
               res.status(400).json({
                msg:"Failed"
               })
            }
        }
    }catch(err){
        res.status(500).json({
            msg:"Something went wrong"
        })
        console.log(err)
    }
}

module.exports=userAuth;