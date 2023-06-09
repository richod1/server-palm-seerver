const bookModel=require("../models/book.model.js")
const express=require("express")
const router=express.Roter();
const userAuth=require("../middleware/auth.js")
const {CalcLateAndFine}=require("../middleware/CalcLateAndFine.js")
const bookValidator=require("../validator/bookValidator.js")
const bookController=require("../controller/bookController.js")
// book routes


router.post('/',)

router.get("/",)

router.get("/books/:id")

router.post('/issue')

router.post("/return")

router.get("/issue")

router.get("/searchbook/:letters")


router.get("/search/:bookName")

router.get('/nonreturn')

module.exports=router;

