const express = require('express');
const router = express.Router();
const { Book } = require("../models/Book");
const { auth } = require("../middleware/auth");
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

router.post('/thumbnail', (req,res) => {
    let thumbsFilePath ="";
    let fileDuration ="";
    
    // 비디오 정보 가져오기
    ffmpeg.ffprobe(req.body.url, function(err, metadata){
        console.dir(metadata);
        console.log(metadata.format.duration);

        fileDuration = metadata.format.duration;
    })

    // 썸네일 생성
    ffmpeg(req.body.url)
        .on('filenames', function (filenames) {
            console.log('Will generate ' + filenames.join(', '))
            thumbsFilePath = "uploads/thumbnails/" + filenames[0];
        })
        .on('end', function () {
            console.log('Screenshots taken');
            return res.json({ success: true, thumbsFilePath: thumbsFilePath, fileDuration: fileDuration})
        })
        .screenshots({
            // Will take screens at 20%, 40%, 60% and 80% of the video
            count: 3,
            folder: 'uploads/thumbnails',
            size:'320x240',
            // %b input basename ( filename w/o extension )
            filename:'thumbnail-%b.png'
        });
})




module.exports = router;
