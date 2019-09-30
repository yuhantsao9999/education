require('dotenv').config();
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

const { BUCKET_NAME, IAM_USER_KEY, IAM_USER_SECRET } = process.env;

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
// var storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'assets')
//     },
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(-4))
//     },
// })
// var upload = multer({ storage: storage })





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
router.post("/course_update/insertMysql", mixupload, function(req, res) {
    var access_token = req.body.user_token;
    var course_id = req.body.course_id;
    var chapter_title = req.body.chapter_title;
    // console.log("course_id : " + course_id)
    console.log(JSON.stringify(req.files))
    var old_image_path_arr = req.body.old_image_path_arr;
    // var main_image = req.files.main_image[0].key;
    var chapter_num = Number(req.body.chapter_num);
    // console.log("s3---------------->   :    " + JSON.stringify(req))

    async.waterfall([
        (next) => {
            //圖片更新
            if (old_image_path_arr.length == 28) {
                //沒更新
                console.log("11111111  沒更新");
                next(null)
                    // res.send("(๑•̀ㅂ•́)و✧ ٩(๑•̀ω•́๑)۶")
            } else {
                //更新
                console.log("22222222  更新")
                var new_image_path = req.files.main_image[0].key
                var new_image_path_sql = `update new_course set main_image='${new_image_path}' where course_id='${course_id}'`;
                con.query(new_image_path_sql, function(err1, new_image_path_result) {
                    if (err1) throw err1;
                    // res.send("(๑•̀ㅂ•́)و✧ ٩(๑•̀ω•́๑)۶")
                    next(null)
                })
            }
        },
        (next) => {
            var origin_chapter_id_mysql = `SELECT chapter_auto_id FROM new_chapter where course_id='${course_id}'`
            con.query(origin_chapter_id_mysql, function(err2, origin_chapter_id) {
                if (err2) throw err2;
                var origin_chapter_id_arr = [];
                for (i = 0; i < origin_chapter_id.length; i++) {
                    origin_chapter_id_arr.push(origin_chapter_id[i].chapter_auto_id)
                }
                // console.log("origin_chapter_id_arr: " + origin_chapter_id_arr)
                next(null, origin_chapter_id_arr)
            })
        },
        (origin_chapter_id_arr, next) => {
            //進行chapter的更新
            var chapter_auto_id = (req.body.chapter_auto_id_arr).split(",");
            var auto_id_different = diff(origin_chapter_id_arr, chapter_auto_id);


            console.log("origin_chapter_id_arr : " + origin_chapter_id_arr);
            console.log("chapter_auto_id : " + chapter_auto_id);
            console.log("auto_id_different : " + auto_id_different)
            if (auto_id_different.length != 0) {
                var delete_chapter_sql = `DELETE FROM new_chapter   
                WHERE course_id='${course_id}' AND chapter_auto_id='${auto_id_different[0]}' ;`
                con.query(delete_chapter_sql, function(err4, delete_chapter_result) {
                    if (err4) throw err4;
                    console.log("delete")
                })
            }


            for (i = 0; i < chapter_auto_id.length; i++) {
                console.log("內容 : " + chapter_auto_id[i] + "  haha型態 : " + typeof(chapter_auto_id[i]))
                if (chapter_auto_id[i] == "") {
                    var insert_chapter_sql = `INSERT INTO new_chapter (chapter_title,chapter_id,course_id)
                    VALUES ('${chapter_title[i]}','${i+1}','${course_id}') ;`
                    con.query(insert_chapter_sql, function(err2, insert_chapter_result) {
                        if (err2) throw err2;
                        console.log("inserttttttt")
                    })
                } else {
                    var update_chapter_sql = `UPDATE new_chapter
                     SET 
                     chapter_title='${chapter_title[i]}',
                     chapter_id='${i+1}' 
                    WHERE course_id='${course_id}' AND chapter_auto_id='${chapter_auto_id[i]}';`
                    con.query(update_chapter_sql, function(err3, update_chapter_result) {
                        if (err3) throw err3;
                        console.log("updateeeeeee")
                    })
                }
            }
            next(null)
        },
        (next) => {
            var updte_chapter_id_mysql = `SELECT chapter_auto_id FROM new_chapter where course_id='${course_id}'`
            con.query(updte_chapter_id_mysql, function(err2, update_chapter_id) {
                if (err2) throw err2;
                var update_chapter_id_arr = [];
                for (i = 0; i < update_chapter_id.length; i++) {
                    update_chapter_id_arr.push(update_chapter_id[i].chapter_auto_id)
                }
                console.log("update_chapter_id_arr: " + update_chapter_id_arr)
                next(null, update_chapter_id_arr)
            })
        },
        (update_chapter_id_arr, next) => {
            var origin_vidoe_id_mysql = `SELECT video_id FROM final_section where course_id='${course_id}' ORDER BY section_id ASC`
            con.query(origin_vidoe_id_mysql, function(err7, origin_vidoe_id) {
                if (err7) throw err7;
                var origin_video_id_arr = [];
                for (i = 0; i < origin_vidoe_id.length; i++) {
                    origin_video_id_arr.push(origin_vidoe_id[i].video_id)
                }
                // console.log("origin_chapter_id_arr: " + origin_chapter_id_arr)
                next(null, update_chapter_id_arr, origin_video_id_arr)
            })
        },
        (update_chapter_id_arr, origin_video_id_arr, next) => {

            console.log("update_chapter_id_arr: " + update_chapter_id_arr)
                // var chapter_auto_id = (req.body.chapter_auto_id_arr).split(",");
            var each_chapter_section_num = (req.body.each_chapter_section_num).split(",");
            var each_video_src = (req.body.each_video_src).split(",");

            var section_title = req.body.section_title;
            var section_intro = req.body.section_intro;
            var video_id_arr = (req.body.video_id_arr).split(",");

            var video_id_different = diff(origin_video_id_arr, video_id_arr);
            console.log("origin_video_id_arr: " + origin_video_id_arr)
            console.log("video_id_arr: " + video_id_arr)
            console.log("video_id_different: " + video_id_different)
            if (video_id_different.length != 0) {
                var delete_video_id_sql = `DELETE FROM final_section   
                WHERE course_id='${course_id}' AND video_id='${video_id_different[0]}' ;`
                con.query(delete_video_id_sql, function(err8, delete_video_result) {
                    if (err8) throw err8;
                    console.log("------------delete video id : " + video_id_different[0] + "------------")
                })
            }

            var m = 0;

            for (var i = 0, k = 0; i < update_chapter_id_arr.length; i++) {
                for (var j = 0; j < each_chapter_section_num[i]; j++) {
                    if (video_id_arr[k] == "") {
                        var new_video_name = req.files.class_video[m].key
                        console.log("-----------------------insert new video--------------------------")
                        console.log("section_intro : " + section_intro[k] + " belong to update_chapter_id_arr " + update_chapter_id_arr[i]);
                        console.log("new_video_name " + req.files.class_video[m].key);
                        var insert_section_id_mysql = `INSERT INTO final_section (course_id,chapter_auto_id,section_id,section_title,section_intro,video)
                        VALUES ('${course_id}','${update_chapter_id_arr[i]}','${k+1}','${section_title[k]}','${section_intro[k++]}','${new_video_name}') ;`
                        con.query(insert_section_id_mysql, function(err5, insert_section_id) {
                            if (err5) throw err5;
                        })
                        m++;
                    } else {
                        if (each_video_src[k].length == "") {
                            var new_video_name = req.files.class_video[m].key
                            console.log("-----------------------upadte video--------------------------")
                            console.log("section_intro : " + section_intro[k] + " belong to update_chapter_id_arr " + update_chapter_id_arr[i]);
                            console.log("video_name " + each_video_src[k]);
                            console.log("new_video_name " + req.files.class_video[m].key);
                            var update_section_sql = `UPDATE final_section
                            SET 
                            course_id='${course_id}',
                            chapter_auto_id='${update_chapter_id_arr[i]}',
                            section_id='${k+1}',
                            section_title='${section_title[k]}',
                            section_intro='${section_intro[k]}',
                            video='${new_video_name}' 
                           WHERE  video_id='${video_id_arr[k]}';`
                            k++;
                            m++;
                            con.query(update_section_sql, function(err3, update_section_result) {
                                if (err3) throw err3;
                                console.log("updateeeeeee video")
                            })
                        } else {
                            console.log("-----------------------update but not video--------------------------")
                            console.log("section_intro : " + section_intro[k] + " belong to update_chapter_id_arr " + update_chapter_id_arr[i]);
                            console.log("video_name " + each_video_src[k]);
                            var update_section_sql = `UPDATE final_section
                            SET 
                            course_id='${course_id}',
                            chapter_auto_id='${update_chapter_id_arr[i]}',
                            section_id='${k+1}',
                            section_title='${section_title[k]}',
                            section_intro='${section_intro[k]}',
                            video='${each_video_src[k]}' 
                           WHERE  video_id='${video_id_arr[k]}';`
                            k++;
                            con.query(update_section_sql, function(err3, update_section_result) {
                                if (err3) throw err3;
                                console.log("updateeeeeee")
                            })
                        }

                    }
                }
            }
            next(null)
        },
        (next) => {
            var course_title_sql = `SELECT course_title FROM new_course where course_id='${course_id}'`
            con.query(course_title_sql, function(err2, course_title_result) {
                if (err2) throw err2;
                var course_title = course_title_result[0].course_title;
                console.log(course_title)
                res.redirect("/course.html?title=" + course_title)
            })
        },
    ], (err, rst) => {
        if (err) return err;
    });
})


//取差集
function diff(array1, array2) {
    var tmp = [];
    var flag;
    for (var i = 0; i < array1.length; i++) {
        flag = true
        for (var j = 0; j < array2.length; j++) {
            if (array1[i] == array2[j]) {
                flag = false;
            }
        }
        if (flag) {
            tmp.push(array1[i]);
        }
    }

    return tmp;
}

module.exports = router;