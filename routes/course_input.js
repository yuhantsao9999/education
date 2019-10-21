require('dotenv').config();
const express = require('express')
const course = require('../dao/course')
const router = express.Router();
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');

//s3的帳號密碼於.env
const { IAM_USER_KEY, IAM_USER_SECRET } = process.env;

aws.config.update({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET
});
const s3 = new aws.S3();


//s3取代multer
const upload = multer({
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

const mixupload = upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'class_video', maxCount: 10 }]);
router.post("/education/class_input", mixupload, async function(req, res) {
    try {
        let result = await course.course_input(req);
        if (result == "ok") {
            // res.json({ status: "Success" })
            return res.redirect("/profile_teacher.html");
        } else {
            return res.redirect("/profile_teacher");
            // res.json({ status: "input error" })
        }
    } catch (err) {
        // res.json({ status: "error" })
        return err
    }
})
module.exports = router;