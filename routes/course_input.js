require('dotenv').config();
const express = require('express')
    // var bodyParser = require('body-parser')
var con = require('../module/db');
const path = require('path')
const app = express();
const router = express.Router();
var async = require('async');
// var mysql = require("mysql");
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var multer = require('multer');

//s3的帳號密碼於.env
const { BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET } = process.env;

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
router.post("/education/class_input", mixupload, function(req, res) {

    console.log(JSON.stringify(req.body))
    var access_token = req.body.user_token;
    var course_title = req.body.course_title;
    var course_teacher_intro = req.body.course_teacher_intro;
    var course_intro = req.body.course_intro;
    var course_field = req.body.field;
    var for_who = req.body.for_who;
    var main_image = req.files.main_image[0].key;
    var chapter_num = Number(req.body.chapter_num);


    async.waterfall([
        (next) => {
            var mysql_user_name = `select name,user_id from user where access_token = ?`;
            con.query(mysql_user_name, access_token, function(err1, result_user_name) {
                var user_name = result_user_name[0].name;
                var user_id = result_user_name[0].user_id;
                if (err1) throw err1;
                next(null, user_name, user_id)
            });
        },
        (user_name, user_id, next) => {
            var insert_course_sql = {
                course_title: `${course_title}`,
                course_teacher: `${user_name}`,
                course_teacher_id: `${user_id}`,
                course_teacher_intro,
                course_intro,
                course_field,
                for_who,
                main_image,
            }
            var mysql_course_input = `INSERT INTO new_course SET ?`;
            con.query(mysql_course_input, insert_course_sql, function(err1, result_course_input) {
                if (err1) throw err1
            });
            next(null, user_name)
        },
        (user_name, next) => {
            var mysql_course_id = `SELECT course_id FROM new_course WHERE course_title = ? and course_teacher = ?`;
            console.log("title : " + course_title)
            console.log("user_nameeeeee : " + user_name)
            con.query(mysql_course_id, [course_title, user_name], function(err2, result_course) {
                console.log(result_course)
                var course_id = result_course[0].course_id
                    // console.log(course_id)
                next(null, course_id)
            });
        },
        (course_id, next) => {

            for (var i = 0; i < chapter_num; i++) {
                var chapter_title = req.body.chapter_title[i]
                var insert_sql = {
                    course_id,
                    chapter_id,
                    chapter_title,
                }
                var mysql_chapter_input = `INSERT INTO new_chapter set ?`;
                con.query(mysql_chapter_input, insert_sql, function(err3, result_chapter_input) {
                    if (err3) throw err3
                });
            }
            next(null, course_id)
        },
        (course_id, next) => {
            var mysql_chapter_auto_id = `select chapter_auto_id from new_chapter where course_id = ?`;
            con.query(mysql_chapter_auto_id, course_id, function(err2, result_chapter_auto_id) {
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

                var section_title = req.body.section_title[i];
                var section_intro = req.body.section_intro[i];
                // var chapter_auto_id = each_video_chapter_auto_id_arr[i];
                // var section_id = i + 1;
                var video = req.files.class_video[i].key;

                var insert_section_sql = {
                    course_id,
                    chapter_auto_id: each_video_chapter_auto_id_arr[i],
                    section_id: i + 1,
                    section_title,
                    section_intro,
                    video,
                }
                console.log(insert_section_sql);
                var mysql_section_input = `INSET INTO final_section SET ?;`
                con.query(mysql_section_input, insert_section_sql, function(err4, result_section_input) {
                    if (err4) throw err4
                        // console.log("input section successful")
                });
            }
            next(null)
            res.redirect("/index.html")
        },
    ], (err, rst) => {
        if (err) return err;
        process.stdout.on('error', function(err) {
            if (err.code == "EPIPE") {
                process.exit(0);
            }
        });
    });
})

module.exports = router;