const multer=require("multer")
const {v4,uuidv4}=require("uuid")

const fileUpload=(fieldName)=>{
    const storage=multer.diskStorage({
        destination:(req,res,cb)=>{
            cb(null,uuidv4()+"-"+ file.originalname)

        }
    })

    const upload=({storage})
    return upload.single(fieldName)
}

module.exports=fileUpload;