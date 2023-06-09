const express=require('express')
const router=express.Router();
const auth=require('../middleware/auth')
const userValidation=require('../validation/userValidator')
const userAuth=require('../middleware/auth.js')
const userController=require("../controller/userController")



//signup
router.post('/signup',)

//signin
router.post('/signin',()=>{

})


// get user auth
router.get('/',()=>{

})

//update user
router.put('/',()=>{

})

// delete user
router.delete('/',()=>{

})

router.get('/verify/:token',()=>{

})

// forget password
router.post('/forget_password',()=>{

})

// reset password
router.patch('/reset_password',()=>{

})

// change password
router.put('/changePassword',()=>{

})

router.patch('/logout',()=>{

})

