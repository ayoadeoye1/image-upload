import express from 'express';
import uploads from '../middlewares/multer-upload.js';
import cloudinary from '../middlewares/cloudinary.js';
import dotenv from 'dotenv';
import Image from '../models/img-upd.js';


dotenv.config()

const router = express.Router();


router.post('/upload', uploads.single('image'), async(req, res) =>{ 
    
    try {
        const resC = await cloudinary.uploader.upload(req.file.path)
        
        const dbD = new Image({
            name: req.originalname,
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
        const { c_id, _id} = image
        await cloudinary.uploader.destroy(c_id);
        await Image.deleteOne(_id) 
        res.status(201).json('image deleted')
    } catch (error) {
        console.log(error)
    }

})

export default router;