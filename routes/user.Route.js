const express=require('express')
const router=express.Router();
const auth=require('../middleware/auth')
const verifyResetPasswordToken=require("../middleware/verifyResetPasswordToken")
// const userValidation=require('../validation/userValidator')
const userAuth=require('../middleware/auth.js')
const userController=require("../controller/userController")
const validation=require("../middleware/validation")
const userValidator=require("../validator/userValidator")


//signup
router.post('/signup',validation(userValidator.signUpSchema),
userController.signup)

//signin
router.post('/signin',validation(userValidator.signInSchema),
userController.signIn)


// get user auth
router.get('/',userAuth,userController.getUserData)

//update user
router.put('/',userAuth,validation(userValidator.updateUserSchema),
userController.updateUser)

// delete user
router.delete('/',userAuth,userController.deleteUser)

// user delete
router.patch('/',userAuth,userController.softDeleteUser)

// usere update

router.get('/verify/:token',userController.updateUser)

// forget password
router.post('/forget_password',validation(userValidator.emailSchema),
userController.forgetPassword)

// reset password
router.patch('/reset_password',verifyResetPasswordToken,validation(userValidator.passwordSchema),
userController.changePassword)

// change password
router.put('/changePassword',userAuth,validation(userValidator.changePasswordSchema),
userController.changePassword)

router.patch('/logout',userAuth,userController.logout)

