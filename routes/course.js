const express = require('express')
var bodyParser = require('body-parser')
var con = require('../module/db');
const path = require('path')
const app = express();
const router = express.Router();
var async = require('async');
// var mysql = require("mysql");
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var multer = require('multer');

//s3的帳號密碼
// const BUCKET_NAME = 'my-first-education-project';
// const IAM_USER_KEY = 'AKIAWUNAWR5D2K6QYK4J';
// const IAM_USER_SECRET = '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';

// aws.config.update({
//     accessKeyId: IAM_USER_KEY,
//     secretAccessKey: IAM_USER_SECRET
// });
// const s3 = new aws.S3();

// 從根目錄使用router
app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET intro.html
router.get('/', (req, res) => {
    res.send('course_input');
});

// GET course.html
router.get('/', (req, res) => {
    res.send('course');
});



//使用multer將影片傳到assets並幫影片命名
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'assets')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.mp4')
    },
})
var upload = multer({ storage: storage })

router.use(express.static(path.join(__dirname, 'public')))

//s3取代multer
// var upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'my-first-education-project',
//         metadata: function(req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function(req, file, cb) {
//             cb(null, 'video/' + file.fieldname + '-' + Date.now() + ".mp4")
//         }
//     })
// })

// var mixupload = upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'main_video', maxCount: 1 }]);
router.post("/education/class_introduction", upload.array("class_video"), function(req, res) {
    console.log(req.body)

    var course_title = req.body.course_title;
    var course_teacher = req.body.course_teacher;
    var course_intro = req.body.course_intro;
    var count = parseInt(req.body.count);

    async.waterfall([
        (next) => {
            var mysql_course_input = `INSERT INTO course (title,intro,teacher) Values('${course_title}','${course_intro}','${course_teacher}')`;
            con.query(mysql_course_input, function(err1, result_course_input) {
                console.log('successful_course_input')
                next(err1)
            });
        },
        (next) => {
            var mysql_course = `select course_id from course where title = '${course_title}'`;
            con.query(mysql_course, function(err2, result_course) {
                var course_id = result_course[0].course_id
                next(err2, course_id)
            });
        },
        (course_id, next) => {
            var chapter_number = req.body.chapter_id.length //計算chapter的數量
            var chapter_real_number = req.body.chapter_id[chapter_number - 1]
            var chapter_id_arr = []
            for (i = 0; i < chapter_number; i++) {
                console.log("for loop " + i)
                if ((i > 0) && (req.body.chapter_id[i] == req.body.chapter_id[i - 1])) {
                    continue;
                }
                var chapter_id = req.body.chapter_id[i]
                var chapter_title = req.body.chapter_title[i]
                chapter_id_arr.push(chapter_id)
                console.log("course id : " + course_id)
                console.log("chapter id : " + chapter_id)
                console.log("chapter title : " + chapter_title)
                var mysql_chapter_input = `INSERT INTO chapter (course_id,chapter_id,chapter_title) 
                Values('${course_id}','${chapter_id}','${chapter_title}')`;
                con.query(mysql_chapter_input, function(err3, result_chapter_input) {
                    console.log('successful_chapter_input')
                });
            }
            console.log("chapter_id_arr: " + chapter_id_arr)
            next(null, course_id)
        },
        (course_id, next) => {
            for (var i = 0; i < count + 1; i++) {
                var chapter_id = req.body.chapter_id[i]
                var section_id = req.body.section_id[i]
                var section_title = req.body.section_title[i]
                var section_intro = req.body.section_intro[i]
                console.log(section_intro)
                var video = req.files[i].filename
                var mysql_section_input = `insert into new_section (course_id,chapter_id,section_id,section_title,section_intro,video)
                values('${course_id}','${chapter_id}','${section_id}','${section_title}','${section_intro}','${video}');`
                con.query(mysql_section_input, function(err4, result_section_input) {
                    if (err4) throw err4
                    console.log("input section successful")
                });
            }
            next(null)
            res.send("successful")
        },
    ], (err, rst) => {
        if (err) return err;
    });
})


//course detail api  (同video.js)
router.get("/education/classinfo", function(req, res) {
    var title = req.query.title;
    var mysql_course = `select * from course where title='${title}'`;
    con.query(mysql_course, function(err, result_course) {
        if (err) throw err
        console.log(result_course) //所有課程資訊
        var course_id = result_course[0].course_id;
        var title = result_course[0].title;
        var intro = result_course[0].intro;
        var teacher = result_course[0].teacher;
        var mysql_chapter = `select * from chapter where course_id='${course_id}'`;
        con.query(mysql_chapter, function(err, result_chapter) {
            if (err) throw err
            console.log(result_chapter) //所有章節資訊
            var mysql_section = `select * from new_section where course_id='${course_id}'`;
            con.query(mysql_section, function(err, result_section) {
                if (err) throw err
                console.log(result_section) //所有節的資訊
                var obj = {};
                obj['Course_id'] = result_course[0].course_id; //添加名稱
                obj['Course_title'] = result_course[0].title;
                obj['Course_intro'] = result_course[0].intro;
                obj['Course_teacher'] = result_course[0].teacher;
                obj["Course_detail"] = []
                for (var i = 0; i < result_chapter.length; i++) {
                    var chp_obj = {}
                    chp_obj['Chapter_id'] = result_chapter[i].chapter_id
                    chp_obj['Chapter_title'] = result_chapter[i].chapter_title
                    chp_obj['Chapter_detail'] = []
                    for (var j = 0; j < result_section.length; j++) {
                        if (result_section[j].chapter_id == chp_obj['Chapter_id']) {
                            var obj_tmp = {}
                            obj_tmp['Section_id'] = result_section[j].section_id
                            obj_tmp['Section_title'] = result_section[j].section_title
                            obj_tmp['Section_intro'] = result_section[j].section_intro
                            obj_tmp['Video'] = result_section[j].video
                            chp_obj['Chapter_detail'].push(obj_tmp)
                        }
                    }
                    obj["Course_detail"].push(chp_obj)
                }
                var test = {};
                test["data"] = obj
                console.log(test)
                res.send(test)
            });
        });
    });
})

module.exports = router;