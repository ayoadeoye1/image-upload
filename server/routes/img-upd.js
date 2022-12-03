import express from 'express';
import uploads from '../middlewares/multer-upload.js';
import cloudinary from '../middlewares/cloudinary.js';
import dotenv from 'dotenv';
import Image from '../models/img-upd.js';
// import Grid from 'gridfs-stream';

dotenv.config()

const router = express.Router();


router.post('/upload', uploads.single('image'), async(req, res) =>{ 
    // console.log(req.file.path);
    // console.log(req.body.name);
    try {
        const resC = await cloudinary.uploader.upload(req.file.path)
        
        const dbD = new Image({
            name: resC.original_filename,
            c_url: resC.secure_url,
            c_id: resC.public_id
        })

        const saved = dbD.save();
        console.log(saved)
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({error_throwed: error})
    }
})

router.get('/photos', async (req, res)=>{
    const photo = await Image.find();
    res.status(200).send(photo)
})

router.delete('/delete/:id', async(req, res)=>{
    const iid = req.params.id
    
    try {
        const image = await Image.findOne({_id: iid})
        const { name, c_id, _id} = image
        console.log(_id)
        const del = cloudinary.uploader.destroy(name, c_id);
        del && await Image.deleteOne(_id) 
        res.status(201).json('image deleted')
    } catch (error) {
        console.log(error)
    }

})

export default router;