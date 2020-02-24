const express = require('express');
const router = express.Router();
const { Book } = require("../models/Book");
const multer = require('multer');
var ffmpeg = require('fluent-ffmpeg');


var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}_${file.originalname}`)
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname)
        if (ext !== '.png') {
            return cb(res.status(400).end('only png is allowed'), false);
        }
        cb(null, true)
    }
})

var upload = multer({ storage: storage }).single("file")
//=================================
//             Video
//=================================

router.post('/uploadfiles', (req, res) => {
    // 비디오를 서버에 저장한다.
    upload(req, res, err => {
        if(err) {
            return res.json({success:false, err})
        }
        return res.json({success:true, url: res.req.file.path, fileName: res.req.file.filename})
    })
})

router.post('/uploadBook', (req, res) => {
    console.log(req.body)
    const book = new Book(req.body)
    
    book.save((err,doc)=>{
        if(err) return res.json({success:false,err})
        console.log(doc)
        res.status(200).json({success:true})
    })
})
router.get('/getbooks', (req, res) => {

   //책을 DB에 가져와서 클라이언트에 보낸다
   Book.find()
        .populate('writer')
        .exec((err, books)=>{
            if(err)return res.status(400).send(err);
            res.status(200).json({success:true, books})
        })
})




module.exports = router;
