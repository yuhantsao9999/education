const express = require('express')
var bodyParser = require('body-parser')
var con = require('../module/db');
const app = express();
const router = express.Router();
var async = require('async');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// 從根目錄使用router
app.use('/', router);


// GET video.html
router.get('/', (req, res) => {
    res.send('video');
});


//course detail api
router.get("/education/classinfo", function(req, res) {
    var title = req.query.title;
    var mysql_course = `select * from course where title='${title}'`;
    con.query(mysql_course, function(err, result_course) {
        if (err) throw err
            // console.log(result_course) //所有課程資訊
        var course_id = result_course[0].course_id;
        var title = result_course[0].title;
        var intro = result_course[0].intro;
        var teacher = result_course[0].teacher;
        var mysql_chapter = `select * from chapter where course_id='${course_id}'`;
        con.query(mysql_chapter, function(err, result_chapter) {
            if (err) throw err
                // console.log(result_chapter) //所有章節資訊
            var mysql_section = `select * from new_section where course_id='${course_id}'`;
            con.query(mysql_section, function(err, result_section) {
                if (err) throw err
                    // console.log(result_section) //所有節的資訊
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
                    // console.log(test)
                res.send(test)
            });
        });
    });
})


//video.html
//course video api
router.get("/education/videoinfo", function(req, res) {
    var title = req.query.title;
    var chapter_id = req.query.chapter;
    var section_id = req.query.section;
    async.waterfall([
        (next) => {
            var mysql_course = `select * from course where title='${title}'`;
            con.query(mysql_course, function(err1, result_course) {
                var course_id = result_course[0].course_id;
                next(null, course_id)
            });
        }, //TODO:之後可以新增使用者再次回到課程時，直接回到上次觀看的時候
        (course_id, next) => {
            var mysql_video = `select video from new_section where course_id='${course_id}' and chapter_id='${chapter_id}'and section_id='${section_id}'`;
            con.query(mysql_video, function(err, result_video) {
                var video = result_video;

                var video = result_video;
                var data = {};
                data["data"] = video;
                next(null)
                res.send(data)
            });

        }
    ], (err, rst) => {
        if (err) return err;
    });
})

//update video length api
router.post("/videoupdate", function(req, res) {
    var title = req.query.title;
    var chapter_id = req.query.chapter;
    var section_id = req.query.section;
    var currentTime = req.body.currentTime;
    var totalTime = req.body.totalTime;
    var Token = req.body.accessToken;
    async.waterfall([
        (next) => {
            var profile_checkmember = `SELECT user_id FROM user WHERE access_token='${Token}'`
            con.query(profile_checkmember, function(err1, result_course) {
                var user_id = result_course[0].user_id;
                next(null, user_id)
            });
        },
        (user_id, next) => {
            var video_id_sql = `SELECT video_id FROM new_section JOIN course on course.course_id=new_section.course_id WHERE title ='${title}' and chapter_id ='${chapter_id}' and section_id='${section_id}'`
            con.query(video_id_sql, function(err1, video_id_result) {
                if (err1)
                    throw err1;
                var video_id = video_id_result[0].video_id;
                next(null, user_id, video_id)
            });
        },
        (user_id, video_id, next) => {
            var complete = Math.floor(currentTime / totalTime);
            var update_videotime =
                `UPDATE status SET video_time = '${currentTime}', complete = '${complete}'
            WHERE user_id = '${user_id}'
            and video_id = '${video_id}';`
            con.query(update_videotime, function(err1, update_videotime_result) {
                next(null)
                res.send("data")
            });
        }
    ], (err, rst) => {
        if (err) return err;
    });
})

router.get("/test", function(req, res) {
    console.log("hi");
    res.send();
});
module.exports = router;