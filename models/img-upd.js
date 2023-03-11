import mongoose from "mongoose";

const ImageShm = new mongoose.Schema({
    name: {
        type: String,
        required: false
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
        default: new Date()
    }
})

export default mongoose.model('Image', ImageShm);