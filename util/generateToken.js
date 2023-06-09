const jwt=require('jsonwebtoken')


const generateToken=(payload,privatekey,expiresDate)=>{
    var token=jwt.sign(payload,privatekey,expiresDate)
    return token
}

module.exports=generateToken;