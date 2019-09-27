const express = require('express')
var bodyParser = require('body-parser')
var con = require('../module/db');
const app = express();
const router = express.Router();
var async = require('async');
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var multer = require('multer');

//s3的帳號密碼
const BUCKET_NAME = '';
const IAM_USER_KEY = '';
const IAM_USER_SECRET = '';

aws.config.update({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET
});
const s3 = new aws.S3();

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());


// 從根目錄使用router
app.use('/', router);

//course detail api
router.get("/course_update/", function(req, res) {
    var course_id = req.query.course_id;
    // console.log(title)
    var mysql_course = `select * from new_course where course_id='${course_id}'`;
    con.query(mysql_course, function(err, result_course) {
        if (err) throw err
            // console.log("heyyyyyyyyy : " + result_course) //所有課程資訊
        var course_id = result_course[0].course_id;
        var title = result_course[0].course_title;
        var intro = result_course[0].course_intro;
        var teacher = result_course[0].course_teacher;
        var mysql_chapter = `select * from new_chapter where course_id='${course_id}'`;
        con.query(mysql_chapter, function(err, result_chapter) {
            if (err) throw err
                // console.log(result_chapter) //所有章節資訊
            var mysql_section = `select * from final_section where course_id='${course_id}'`;
            con.query(mysql_section, function(err, result_section) {
                // console.log("result_section : " + JSON.stringify(result_section))
                if (err) throw err
                    // console.log(result_section) //所有節的資訊
                var obj = {};
                obj['Course_id'] = result_course[0].course_id; //添加名稱
                obj['Course_title'] = result_course[0].course_title;
                obj['Course_field'] = result_course[0].course_field;
                obj['Course_intro'] = result_course[0].course_intro;
                obj['Course_teacher'] = result_course[0].course_teacher;
                obj['main_image'] = result_course[0].main_image;
                obj['star_number'] = result_course[0].star_number;
                obj['average_star'] = result_course[0].average_star;
                obj['comment_number'] = result_course[0].comment_number;
                obj["Course_detail"] = []
                for (var i = 0; i < result_chapter.length; i++) {
                    var chp_obj = {}
                    chp_obj['Chapter_id'] = result_chapter[i].chapter_id
                    chp_obj['Chapter_auto_id'] = result_chapter[i].chapter_auto_id
                    chp_obj['Chapter_title'] = result_chapter[i].chapter_title
                    chp_obj['Chapter_detail'] = []
                    for (var j = 0; j < result_section.length; j++) {
                        if (result_section[j].chapter_auto_id == chp_obj['Chapter_auto_id']) {
                            var obj_tmp = {}
                            obj_tmp['Section_id'] = result_section[j].section_id
                            obj_tmp['Video_id'] = result_section[j].video_id
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
                    // console.log("testtttttt : " + JSON.stringify(test))
                res.send(test)
            });
        });
    });
})


//使用multer將影片傳到assets並幫影片命名
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'assets')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(-4))
    },
})
var upload = multer({ storage: storage })





//s3取代multer
// var upload = multer({
//     storage: multerS3({
//         s3: s3,
//         bucket: 'cad-education-project/class-video-picture',
//         metadata: function(req, file, cb) {
//             cb(null, { fieldName: file.fieldname });
//         },
//         key: function(req, file, cb) {
//             cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(-4))
//         }
//     })
// })

var mixupload = upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'class_video', maxCount: 10 }]);
router.post("/course_update/insertMysql", mixupload, function(req, res) {
    var access_token = req.body.user_token;
    var course_id = req.body.course_id;
    // console.log("course_id : " + course_id)
    console.log(JSON.stringify(req.body))
    var old_image_path_arr = req.body.old_image_path_arr;
    // var main_image = req.files.main_image[0].key;
    var chapter_num = Number(req.body.chapter_num);
    // var each_chapter_section_num_arr = req.body.each_chapter_section_num_arr;



    async.waterfall([
        (next) => {
            if (old_image_path_arr.length == 28) {
                //沒更新
                console.log("11111111  沒更新");
                next(null)
                    // res.send("(๑•̀ㅂ•́)و✧ ٩(๑•̀ω•́๑)۶")
            } else {
                //更新
                console.log("22222222  更新")
                var new_image_path = req.files.main_image[0].filename
                var new_image_path_sql = `update new_course set main_image='${new_image_path}' where course_id='${course_id}'`;
                con.query(new_image_path_sql, function(err1, new_image_path_result) {
                    if (err1) throw err1;
                    // res.send("(๑•̀ㅂ•́)و✧ ٩(๑•̀ω•́๑)۶")
                    next(null)
                })
            }
        },
        (next) => {
            var chapter_auto_id = req.body.chapter_auto_id_arr
            for (i = 0; i < chapter_auto_id.length; i++) {
                var chapter_sql = `update new_course set chapter_auto_id='${new_image_path}' where course_id='${course_id} and chapter_auto_id='${chapter_auto_id}';`
                    //     con.query(video_time_sql, function(err1, video_time__result) {
                    //         if (err1) throw err1;
                    //         console.log(JSON.stringify(video_time__result))
                    //         var progress_arr = []
                    //         for (i = 0; i < video_time__result.length; i++) {
                    //             console.log(video_time__result[i].video_time)
                    //             console.log(video_time__result[i].video_duration)
                    //             var progress = (video_time__result[i].video_time / video_time__result[i].video_duration)
                    //             console.log("progress : " + progress)
                    //             if (isFinite(progress)) {
                    //                 // isNaN(progress) ||
                    //                 var progress = progress * 100
                    //                 progress_arr.push(Math.round(progress));
                    //             } else {
                    //                 progress_arr.push("0");
                    //             }
                    //         }
                    //         console.log("progress_arr : " + progress_arr)
                    //         next(null, user_id)

                //     });
            }
            res.send("A___________A")
        },
    ], (err, rst) => {
        if (err) return err;
    });
})


module.exports = router;