import multer from 'multer'
import path from 'path'
const __dirname = path.resolve()

const excelFilter = (req, file, cb) => {
    if (file.mimetype.includes('excel') || file.mimetype.includes('spreadsheetml')) {
        cb(null, true)
    } else {
        cb('Please upload only excel file.', false)
    }
}

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + '\\uploads\\')
    },
    filename: (req, file, cb) => {
        console.log(file.originalname)
        cb(null, `${Date.now()}-${file.originalname}`)
    },
})

var uploadFile = multer({ storage: storage, fileFilter: excelFilter })
export { uploadFile }
