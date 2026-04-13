import multer from "multer"
import path from "path"

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/data/uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    const ext = path.extname(file.originalname)
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`
    cb(null, filename)
  }
})

export const upload = multer({storage: storage})
