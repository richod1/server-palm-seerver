// const bookModel=require("../models/book.model.js") book model can be applied to optimize app
const express=require("express")
const router=express.Roter();
const validation=require("../middleware/validation")
const {fileUpload}=require("../util/fileUploads")
const userAuth=require("../middleware/auth.js")
const {CalcLateAndFine}=require("../middleware/CalcLateAndFine.js")
const bookValidator=require("../validator/bookValidator.js")
const bookController=require("../controller/bookController.js")
// book routes


router.post('/',userAuth,fileUpload('path')
,validation(bookValidator.bookSchema),bookController.addbook)

router.get("/",userAuth,bookController.getAllbooks)

router.get("/books/:id",userAuth,bookController.getBookById)

router.post('/issue',userAuth,validation(bookValidator.issueBookSchema),
bookController.issueBooks)

router.post("/return",userAuth,validation(bookValidator.returnBookSchema),
bookController.returnBook)

router.get("/issue",userAuth,bookController.getIssuedBooks)

router.get("/searchbook/:letters",userAuth,bookController.getAllBooksByName)


router.get("/search/:bookName",userAuth,validation(bookValidator.searchBookSchema),
bookController.searchIssuedBooks)

router.get('/nonreturn',userAuth,CalcLateAndFine,bookController.getNonReturnBooks)

module.exports=router;

