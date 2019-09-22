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
const BUCKET_NAME = 'cad-education-project';
const IAM_USER_KEY = 'AKIAWUNAWR5DUULICIEH';
const IAM_USER_SECRET = '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';

aws.config.update({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET
});
const s3 = new aws.S3();

// 從根目錄使用router
app.use('/', router);
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// GET intro.html
router.get('/', (req, res) => {
    res.send('course_input');
});

// GET course_input.html
router.get('/', (req, res) => {
    res.send('course_input');
});


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
router.post("/education/class_input", mixupload, function(req, res) {

    // console.log(JSON.stringify(req.body))
    var access_token = req.body.user_token;
    var course_title = req.body.course_title;
    var course_teacher_intro = req.body.course_teacher_intro;
    console.log(course_teacher_intro)
    var course_intro = req.body.course_intro;
    var course_field = req.body.field;
    var for_who = req.body.for_who;
    var main_image = req.files.main_image[0].key;
    var chapter_num = Number(req.body.chapter_num);


    async.waterfall([
        (next) => {
            var mysql_user_name = `select name,user_id from user where access_token = '${access_token}'`;
            con.query(mysql_user_name, function(err1, result_user_name) {
                var user_name = result_user_name[0].name;
                var user_id = result_user_name[0].user_id;
                if (err1) throw err1;
                next(null, user_name, user_id)
            });
        },
        (user_name, user_id, next) => {
            var mysql_course_input = `INSERT INTO new_course (course_title,course_teacher,course_teacher_id,course_teacher_intro,course_intro,course_field,for_who,main_image) 
                        Values('${course_title}','${user_name}','${user_id}','${course_teacher_intro}','${course_intro}','${course_field}','${for_who}','${main_image}')`;
            con.query(mysql_course_input, function(err1, result_course_input) {
                if (err1) throw err1
            });
            next(null, user_name)
        },
        (user_name, next) => {
            var mysql_course_id = `select course_id from new_course where course_title = '${course_title}' and course_teacher='${user_name}'`;
            con.query(mysql_course_id, function(err2, result_course) {
                var course_id = result_course[0].course_id
                    // console.log(course_id)
                next(null, course_id)
            });
        },
        (course_id, next) => {
            var chapter_id_arr = []
            for (var i = 0; i < chapter_num; i++) {
                // console.log("for loop " + i)
                // if ((i > 0) && (req.body.chapter_id[i] == req.body.chapter_id[i - 1])) {
                //     continue;
                // }
                // chapter_id_arr.push(i)
                var chapter_title = req.body.chapter_title[i]
                var mysql_chapter_input = `INSERT INTO new_chapter (course_id,chapter_id,chapter_title) 
                            Values('${course_id}','${i+1}','${chapter_title}')`;
                con.query(mysql_chapter_input, function(err3, result_chapter_input) {});
            }
            next(null, course_id)
        },
        (course_id, next) => {
            var mysql_chapter_auto_id = `select chapter_auto_id from new_chapter where course_id = '${course_id}'`;
            con.query(mysql_chapter_auto_id, function(err2, result_chapter_auto_id) {
                var chapter_auto_id_arr = [];
                for (i = 0; i < result_chapter_auto_id.length; i++) {
                    chapter_auto_id_arr.push(result_chapter_auto_id[i].chapter_auto_id)
                }
                // console.log(result_chapter_auto_id)
                // console.log(chapter_auto_id_arr)
                next(null, course_id, chapter_auto_id_arr)
            });
        },
        (course_id, chapter_auto_id_arr, next) => {
            //  計算section數量
            var each_chapter_section_num = (req.body.each_chapter_section_num)
            var each_chapter_section_num_arr = each_chapter_section_num.split(",")
            var section_num = 0
            for (var i = 0; i < each_chapter_section_num_arr.length; i++) {
                section_num += Number(each_chapter_section_num_arr[i])
            }
            // console.log("各個chapter的section數量 : " + each_chapter_section_num_arr) //1,2
            // console.log("section總數目 : " + section_num) //3
            // console.log("auto_id arr : " + chapter_auto_id_arr) //7,8


            var each_video_chapter_auto_id_arr = []
            for (var i = 0; i < each_chapter_section_num_arr.length; i++) {
                for (var j = 0; j < each_chapter_section_num_arr[i]; j++) {
                    each_video_chapter_auto_id_arr.push(chapter_auto_id_arr[i]);
                }
            }

            // for (var i = 0, k = 0; i < section_num; i++) {
            //     each_video_chapter_auto_id_arr.push(chapter_auto_id_arr[k])
            //     if (each_video_chapter_auto_id_arr.length == each_chapter_section_num_arr[i] + each_chapter_section_num_arr[i - 1]) {
            //         //TODO:會少計算到前面已經push的數量
            //         k++;
            //     }
            // }
            for (var i = 0; i < section_num; i++) {

                var section_title = req.body.section_title[i]
                var section_intro = req.body.section_intro[i]
                    // console.log(req.files)
                var video = req.files.class_video[i].key;

                var mysql_section_input = `insert into final_section (course_id,chapter_auto_id,section_id,section_title,section_intro,video)
                                    values('${course_id}','${each_video_chapter_auto_id_arr[i]}','${i+1}','${section_title}','${section_intro}','${video}');`
                con.query(mysql_section_input, function(err4, result_section_input) {
                    if (err4) throw err4
                        // console.log("input section successful")
                });
            }
            next(null)
            res.redirect("/index.html")
        },
    ], (err, rst) => {
        if (err) return err;
    });
})


//course detail api  (同video.js)
// router.get("/education/classinfo", function(req, res) {
//     var title = req.query.title;
//     var mysql_course = `select * from course where title='${title}'`;
//     con.query(mysql_course, function(err, result_course) {
//         if (err) throw err
//         console.log(result_course) //所有課程資訊
//         var course_id = result_course[0].course_id;
//         var title = result_course[0].title;
//         var intro = result_course[0].intro;
//         var teacher = result_course[0].teacher;
//         var mysql_chapter = `select * from chapter where course_id='${course_id}'`;
//         con.query(mysql_chapter, function(err, result_chapter) {
//             if (err) throw err
//             console.log(result_chapter) //所有章節資訊
//             var mysql_section = `select * from new_section where course_id='${course_id}'`;
//             con.query(mysql_section, function(err, result_section) {
//                 if (err) throw err
//                 console.log(result_section) //所有節的資訊
//                 var obj = {};
//                 obj['Course_id'] = result_course[0].course_id; //添加名稱
//                 obj['Course_title'] = result_course[0].title;
//                 obj['Course_intro'] = result_course[0].intro;
//                 obj['Course_teacher'] = result_course[0].teacher;
//                 obj["Course_detail"] = []
//                 for (var i = 0; i < result_chapter.length; i++) {
//                     var chp_obj = {}
//                     chp_obj['Chapter_id'] = result_chapter[i].chapter_id
//                     chp_obj['Chapter_title'] = result_chapter[i].chapter_title
//                     chp_obj['Chapter_detail'] = []
//                     for (var j = 0; j < result_section.length; j++) {
//                         if (result_section[j].chapter_id == chp_obj['Chapter_id']) {
//                             var obj_tmp = {}
//                             obj_tmp['Section_id'] = result_section[j].section_id
//                             obj_tmp['Section_title'] = result_section[j].section_title
//                             obj_tmp['Section_intro'] = result_section[j].section_intro
//                             obj_tmp['Video'] = result_section[j].video
//                             chp_obj['Chapter_detail'].push(obj_tmp)
//                         }
//                     }
//                     obj["Course_detail"].push(chp_obj)
//                 }
//                 var test = {};
//                 test["data"] = obj
//                 console.log(test)
//                 res.send(test)
//             });
//         });
//     });
// })

module.exports = router;