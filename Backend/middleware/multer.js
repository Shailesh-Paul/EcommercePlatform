import multer from "multer";
import path from 'path'
import fs from 'fs'

const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
   destination: (req, file, cb) => {
    cb(null, "uploads/");
  }
});

const upload = multer({ storage });

export default upload;
