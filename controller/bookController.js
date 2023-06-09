const userSchema=require("../models/user.model.js")
const bookSchema=require("../models/book.model.js")
const moment=require("moment")

const addbook=async (req,res,next)=>{
const {name,category,publisher}=req.body;
const book=await bookSchema.insertMany({name,category,publisher,
    bookPhoto:req.file.filename})
if(book){
    return res.status(200).json({
        msg:"book addedd success"
    })
}
next()

}

const getAllbooks=async (req,res,next)=>{
    const books=await bookSchema.find().sort({createdAt:-1})
    return res.status(200).json({
        msg:"success",data:books
    })
    next()
}

const getAllBooksByName= async(req,res,next)=>{
let {letter}=req.body;
const books=await bookSchema.find({name:{$regex:letter,$options:'i'}}).sort()
.exec();
res.status(200).json({
    msg:"success",data:books
})
}

const issueBooks=async(req,res,next)=>{
    const {bookId,issuedDurationInDays}=req.body;
    var issuedBookUser=req.userId;
    const book=await bookSchema.findById(bookId);

    if(book && !book.isIssued){
        const issuedBook=await bookSchema.findByIdAndUpdate({_id:bookId},
        {issuedBookUser,isIssued:true,issueDate:moment(),returnDate:moment()
            .add(issuedDurationInDays,'days')},{new:true})
    
    if(issuedBook){
        return res.status(200).json({
            msg:"success"
        })
    }
    }
    else{
        return res.status(401).json({
            msg:error.message
        })
    }
    next();

}


/**
 * I WILL ADD THE OTHE CONTROLLERS GETN NEW OS CONTINUE LATER**/



module.exports={
    addbook,
    getAllbooks,
    getAllBooksByName,
    issueBooks,
    

}