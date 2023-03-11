import multer from "multer";
import path from 'path';

export default multer({
    storage: multer.diskStorage({}),
    filePath: (req, file, cb) => {
        const extname = path.extname(file.originalname)
        if(extname !== 'jpg' && extname !== 'png' && extname !== 'jpeg'){
            cb(new Error('file format is not supported'), false)
        }
        req.originalname = file.originalname;
        cb(null, true);
    }
})
