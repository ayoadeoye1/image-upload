import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
// import cors from 'cors';
import path from 'path';

import router from './routes/img-upd.js'

dotenv.config()

const app = express();

// const MONGO_URI = 
const EntryPoint = async() =>{
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI) 
        conn && console.log('DB connected!')
    } catch (error) {
      console.log(`error connection: ${error}`)  
    }
}

EntryPoint();

// app.use(cors())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({  extended: false }))
app.use(express.static(path.join('build')))

app.use('/api', router)

app.get('/', (req, res) => {
    res.sendFile(path.join('build', 'index.html'))
})

app.listen(process.env.PORT || 8000, () =>{
    console.log(`listening on port ${process.env.PORT}...`)
})