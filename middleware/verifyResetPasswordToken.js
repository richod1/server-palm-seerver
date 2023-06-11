const jwt=require('jsonwebtoken')

// I know this code is redundent and I can make userAuth only takes a parameter which will be the secret key to verify with 
// but I will modify in many places so I will make a new file here , sorry for this dirty code -----> 2:30 AM   

const verifyResetPasswordToken = async(req,res,next)=>{
    try 
    {
        const token = req.header('token');
        jwt.verify(token,process.env.JWT_RESET_TOKEN, async(err,decoded)=>{
            
    if(err) {return res.status(401).json({
        msg:"failed"})
    }else{ 
              return res.status(201).json({
              msg:"success"})}
             
        // err ? next(new AppError("Invalid token",400)) : next()
    })  
    } 
    
    catch (error) 
    {
        return res.status(500).json({
            msg:"failed something went wromg!"
        })
    }
    next();
     
}

module.exports= verifyResetPasswordToken;