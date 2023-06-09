const nodemailer=require('nodemailer')


export const sendEmail = async(options)=>{
    let transporter = nodemailer.createTransport({
        service:"gmail",
        auth: {
          user: process.env.EMAIL_USER, // generated ethereal user
          pass: process.env.EMAIL_PASS // generated ethereal password
        },
      });
    
      
// modify from and subject later from env

      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: `"Elonsol Library 👻" <mostafaahmed21121997@gmail.com>`, // sender address
        to: options.email, // list of receivers
        subject: "Elonsol Library ✔", // Subject line
        html: options.html  // html body
      });
}