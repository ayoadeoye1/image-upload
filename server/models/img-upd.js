import mongoose from "mongoose";

const ImageShm = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    c_url: {
        type: String,
        required: true
    },
    c_id: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true,
        default: new Date()
    }
})

export default mongoose.model('Image', ImageShm);