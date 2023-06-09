

const moment=require('moment')
const bookModel=require("../models/book.model.js")



 const calcLateAndFine = async(req,res,next)=>{
    const issuedBookUser = req.userId;
    const nonReturnedBooks = await bookModel.find({
        issuedBookUser,
        isIssued: true,
      });
    
      // Calculate the late and fine for each non-returned book
      nonReturnedBooks.forEach((book) => {
      const late = (moment().diff((book.returnDate), 'days'));
      console.log(moment())
        book.late = Math.max(late, 0);
        book.fine = book.late * 50;
      });
    
    await Promise.all(nonReturnedBooks.map((book) => book.save()));
    next()  
}

module.exports=calcLateAndFine;

