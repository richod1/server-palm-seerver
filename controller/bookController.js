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
const returnBook=async(req,res,next)=>{
    const {bookId}=req.body;
    const issuedBookUser=req.userId;
    const issuedBook=await bookSchema.findOne(
        {_id:bookId,issuedBookUser})
    if(issuedBook){
        var late=moment().diff(issuedBook.returnDate,"days")
        if(late<0){
            late=0;
        }
        const fine=late*50;
        let returnedBook=await bookSchema.findByIdAndUpdate(bookId,{
            isIssued:false,late,fine
        },{new:true})
        if(returnedBook){
            await userSchema.findByIdAndUpdate({_id:issuedBookUser},{$push:{
                issuedBook:returnedBook
            }})

            await bookSchema.updateOne({_id:bookId},{$unset:{issuedDate:1,
                returnDate:1,late:1,fine:1,issuedBookUser:1}})
            res.status(200).json({
                msg:"Success!"
            })
        }
    }
    else{
        return res.status(500).json({
            msg:"Somthing is wrong"
        })
    }

}


module.exports={
    addbook,
    getAllbooks,
    getAllBooksByName,
    issueBooks,
    

}