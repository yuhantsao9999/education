require('dotenv').config();
const express = require('express')
    // var mysql = require('../module/db');
    // const path = require('path')
var course = require('../dao/course')
const app = express();
const router = express.Router();
// var async = require('async');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var multer = require('multer');

//s3的帳號密碼於.env
const { IAM_USER_KEY, IAM_USER_SECRET } = process.env;

aws.config.update({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET
});
const s3 = new aws.S3();

// 從根目錄使用router
app.use('/', router);


//使用multer將影片傳到assets並幫影片命名
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'assets')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(-4))
//     },
// })
// var upload = multer({ storage: storage })

// router.use(express.static(path.join(__dirname, 'public')))

//s3取代multer
var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cad-education-project/class-video-picture',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(-4))
        }
    })
})

var mixupload = upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'class_video', maxCount: 10 }]);
router.post("/education/class_input", mixupload, async function(req, res) {
    try {
        let result = await course.course_input(req);
        console.log(result)
        if (result == "ok") {
            // res.json({ status: "Success" })
            return res.redirect("/profile_teacher.html");
        } else {
            return res.redirect("/course_input.html");
            // res.json({ status: "input error" })
        }
    } catch {
        // res.json({ status: "error" })
        return "error"
    }
})
module.exports = router;