require('dotenv').config()
const express = require("express");
const app = express()
const mongoose = require("mongoose");
const cors = require('cors');
const multer = require('multer')
const uuidv1 = require('uuid/v1');
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/')
        },
        filename: function (req, file, cb) {
            cb(null, uuidv1() + ".jpg")
        }
    })
})


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection
db.on('error', (err) => console.error(err));
db.once('open', () => console.log('Connected to Database'))

app.use(cors())
app.use(express.json())

// Citater
const citatRouter = require('./routes/citatRouter')
app.use('/citater', citatRouter)

// Kategorier
const kategoriRouter = require('./routes/kategoriRouter')
app.use('/kategorier', kategoriRouter)

app.post('/images/upload', upload.single('avatar'), function (req, res, next) {
    res.sendStatus(200);
})

const port = process.env.PORT || 5000;

app.listen(port, () => `Server running on port: ${port}`);