const jwt=require('jsonwebtoken')
const UserSchema=require('../models/user.model')
const generateToken=require('../util/generateToken')
const bcrypt=require('bcrypt')
const {sendEmail}=require('../email/user.email.js')
// const {generateToken}=require('../util/generateToken')
const {verificationHTML}=require('../email/template/userEmailVerificationHTML')
const {resetPasswordHTML}=require('../email/template/userForgetPasswordHTML')

// signup controller
const signup=async(req,res,next)=>{
    const {name,email,phone,password}=req.body;
    const emailExist=await UserSchema.findOne({email})

    if(emailExist)
    return res.status(400).json({
        msg:"Email already exist!!"
    })

    const hash=bcrypt.hash(8,password)
    const user=await UserSchema.insertMany(
        {email,password:hash,name,phone})
    // generate the token for user registration
        const token=generateToken(
            {email},process.env.JWT_TOKEN,{expiresIn:'30m'})

            // send a custom email
            sendEmail({email,html:verificationHTML(token)})
            res.status(201).json({
            msg:"success",data:user
            })
}

const signIn=async(req,res,next)=>{
    const {email,password}=req.body;

    const user=await UserSchema.findOne({email})
    if(!user || !user.isVerified){
        await bcrypt.compare(password,user.password)
        return res.status(400).json({
            msg:"Password or Email incorrect"
        })
    }else{
        let token = generateToken({userId:user._id , userEmail: user.email ,
             isDeleted:user.isDeleted , isVerified:user.isVerified},
            process.env.JWT_TOKEN,{expiresIn:'6h'})

    await UserSchema.updateOne({email},{isActive:true})
    return res.status(200).json({
        msg:"User loggin successfully",data:token
    })
    }
    next();
}

const verifyUser=async(req,res,next)=>{
    const {token}=req.params;
    const decode=jwt.verify(token,process.env.JWT_TOKEN)

    var user=await UserSchema.findOneAndUpdate({email:decode.email},
        {isVerified:true},{new:true})
    if(!user){
        return res.status(400).json({msg:error.message})
    }else{
        return res.redirect("http://localhost/api/login")
    }

}

const getUserData=async(req,res,next)=>{
const userId=req.userId;
const user=await UserSchema.findById(userId)
if(!user){
    return res.status(400).json({
        msg:"failed to get user"
    })

}
return res.status(200).json({
    msg:"user data success",data:user
})

}


const updateUser=async(req,res,next)=>{
    const {name,phone}=req.body;
    const userId=req.userId;
    const user=await UserSchema.findAndUpdate({_id:userId},
        {name,phone},{new:true})

    if(!user){
        return res.status(400).json(
            {msg:"failed to update user"})
    }
    return res.status(200).json({
        msg:"User updated"
    })
}

const deleteUser=async(req,res,next)=>{
    const userId=req.userId;
    const user=await UserSchema.deleteOne({_id:userId})
    if(!user){
        return res.status(400).json({
            msg:"faild to delete user"
        })
    }
    return res.status(200).json({
        msg:"User deleted successfully"
    })
}

const softDeleteUser=async(req,res,next)=>{
const userId=req.userId;
const user=await UserSchema.updateOne({_id:userId},
    {isDeleted:true},{new:true})

if(!user){
    return res.status(400).json({
        msg:"failed!"
    })
}
return res.status(201).json({
    msg:"user deleted successfully"
})
next()
}



// forgetPassword
const forgetPassword=async(req,res,next)=>{
    const {email}=req.email;
    const token=generateToken({email},process.env.JWT_RESET_TOKEN,
        {expiresIn:'5m'})
    var user=await UserSchema.findOneAndUpdate({email},{resetToken:token},
        {new:true})

    if(user){
        sendEmail({email,html:resetPasswordHTML(token)})
        return res.status(201).json({
            msg:"success"
        })
    }
    next()

}



// resetPassword
const resetPassword = async(req,res,next)=>{
    const token=header('token')
    const {password}=req.body;
    const hash=bcrypt.hash(password,8)
    const user=await UserSchema.findOne({resetToken:token});


    if(user){
        await UserSchema.updateOne({resetToken:token},
            {password:hash,$unset:{resetToken:1}})
            return res.status(201).json({
                msg:"success"
            })
    }
    next();

}


// changePassword

const changePassword=async(req,res,next)=>{
const {oldPassword,newPassword,confirmPassword}=req.body;
const userId=req.userId;
var user=await UserSchema.findOne(userId);
const hashing=await bcrypt.compare(oldPassword,user.password)
if(!hashing){
    return res.status(400).json({
        msg:"failed!"
    })
}
const hash=bcrypt.hash(newPassword,8)
const updateUser=await UserSchema.updateOne(
    {_id:userId},{password:hash})

    return res.status(200).json({
        msg:"success",data:updateUser
    })
      next();
}


//logOut
const logout=async(req,res,next)=>{
const _id=req.userId;
const user=await UserSchema.findByIdAndUpdate({_id},{isActive:false})
if(user){
    return res.status(200).json({
        msg:"Success"
    })
}
next()
}



module.exports={
    signup,
    signIn,
    verifyUser,
    getUserData,
    updateUser,
    deleteUser,
    softDeleteUser,
    forgetPassword,
    resetPassword,
    changePassword,
    logout,

}