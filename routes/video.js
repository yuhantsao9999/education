const express = require('express')
    // var bodyParser = require('body-parser')
var mysql = require('../module/db');
const app = express();
const router = express.Router();
var async = require('async');


// 從根目錄使用router
app.use('/', router);



//course detail api
router.get("/education/classinfo", function(req, res) {
    var title = req.query.title;
    // console.log(title)
    var mysql_course = `select * from new_course where course_title=?`;
    mysql.con.query(mysql_course, title, function(err, result_course) {
        if (err) throw err
            // console.log("heyyyyyyyyy : " + result_course) //所有課程資訊
        var course_id = result_course[0].course_id;
        var title = result_course[0].course_title;
        var intro = result_course[0].course_intro;
        var teacher = result_course[0].course_teacher;
        //TODO:以chapter id做排序大到小
        var mysql_chapter = `select * from new_chapter where course_id=? ORDER BY chapter_id ASC`;
        mysql.con.query(mysql_chapter, course_id, function(err, result_chapter) {
            if (err) throw err
                // console.log(result_chapter) //所有章節資訊
            var mysql_section = `select * from final_section where course_id=? ORDER BY section_id ASC`;
            mysql.con.query(mysql_section, course_id, function(err, result_section) {
                // console.log("result_section : " + JSON.stringify(result_section))
                if (err) throw err
                    // console.log(result_section) //所有節的資訊
                var obj = {};
                obj['Course_id'] = result_course[0].course_id; //添加名稱
                obj['Course_title'] = result_course[0].course_title;
                obj['Course_intro'] = result_course[0].course_intro;
                obj['Course_teacher'] = result_course[0].course_teacher;
                obj['Course_teacher_intro'] = result_course[0].course_teacher_intro;
                obj['For_who'] = result_course[0].for_who;
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
                console.log("testtttttt : " + JSON.stringify(test))
                res.send(test)
            });
        });
    });
})


//video.html
//course video api
router.post("/education/videoinfo", function(req, res) {
    var title = req.body.videoinfo_obj.title;
    var chapter_id = req.body.videoinfo_obj.chapter;
    var section = req.body.videoinfo_obj.section;
    var section_id = req.body.videoinfo_obj.section_id;
    var user_token = req.body.videoinfo_obj.user_token;
    async.waterfall([
        (next) => {
            var mysql_course = `select * from new_course where course_title=?;`;
            mysql.con.query(mysql_course, title, function(err1, result_course) {
                var course_id = result_course[0].course_id;
                next(null, course_id);
            });
        },
        //TODO:之後可以新增使用者再次回到課程時，直接回到上次觀看的時候,這個有bug(好像又修好了？！)
        (course_id, next) => {
            var mysql_video = `select final_section.video,final_section.video_id from final_section join new_chapter 
            on  final_section.chapter_auto_id=new_chapter.chapter_auto_id and final_section.course_id=? and new_chapter.chapter_id=? and final_section.section_id=?`;
            mysql.con.query(mysql_video, [course_id, chapter_id, section_id], function(err, result_video) {
                var video = result_video[0].video;
                var video_id = result_video[0].video_id;
                next(null, course_id, video, video_id)
                    // console.log(result_video)
            });
        },
        (course_id, video, video_id, next) => {
            var mysql_video_current_time = `SELECT video_time FROM course_progress JOIN user  on course_progress.user_id=user.user_id 
            WHERE course_progress.video_id=? and user.access_token=?;`;
            mysql.con.query(mysql_video_current_time, [video_id, user_token], function(err1, result_video_current_time) {
                // console.log(result_video_current_time)
                // console.log("oooooooooooooooh")
                // console.log(JSON.stringify(result_video_current_time))
                if (result_video_current_time.length == 0) {
                    // console.log("111111")
                    res.send("need to registered first")
                } else {
                    // console.log("2222222")
                    var user_vider_current_time = result_video_current_time[0].video_time;
                    var video_detail_array = []
                    video_detail_array.push({ video: video, user_currentTime: user_vider_current_time })
                    var data = {};
                    data["data"] = video_detail_array;
                    // console.log(data)
                    next(null);
                    res.send(data)
                }
            });
        },
    ], (err, rst) => {
        if (err) return err;
    });
})

//vidoe_percent
router.post("/video_percent", function(req, res) {
    var title = req.body.title;
    var access_token = req.body.accessToken;
    // console.log(req.body)
    // console.log("tokennnnnnn : " + accessToken)
    async.waterfall([
        (next) => {
            var profile_check_member = `SELECT user_id FROM user WHERE access_token = ? `
            mysql.con.query(profile_check_member, access_token, function(err1, result_course) {
                var user_id = result_course[0].user_id;
                console.log(user_id)
                next(null, user_id)
            });
        },
        (user_id, next) => {
            var video_time_sql =
                `SELECT video_time,video_duration FROM course_progress
            where course_title = ? and user_id = ? `
            mysql.con.query(video_time_sql, [title, user_id], function(err1, video_time_result) {
                if (err1) throw err1;
                console.log(JSON.stringify(video_time_result))
                var progress_arr = []
                for (i = 0; i < video_time_result.length; i++) {
                    console.log(video_time_result[i].video_time)
                    console.log(video_time_result[i].video_duration)
                    var progress = (video_time_result[i].video_time / video_time_result[i].video_duration)
                    console.log("progress : " + progress)
                    if (isFinite(progress)) {
                        // isNaN(progress) ||
                        var progress = progress * 100
                        progress_arr.push(Math.round(progress));
                    } else {
                        progress_arr.push("0");
                    }
                }
                console.log("progress_arr : " + progress_arr)
                next(null, user_id)
                res.send(progress_arr)
            });
        },
    ], (err, rst) => {
        if (err) return err;
    });
});


//update video length api
router.post("/videoupdate", function(req, res) {

    var title = req.body.title;
    var chapter_id = req.body.chapter;
    var section_id = req.body.section_id;

    var current_time = req.body.currentTime;
    var total_time = req.body.totalTime;
    var token = req.body.accessToken;
    // console.log("body : " + JSON.stringify(req.body))
    async.waterfall([
        (next) => {
            var profile_checkmember = `SELECT user_id FROM user WHERE access_token=? `
            mysql.con.query(profile_checkmember, token, function(err1, result_course) {
                var user_id = result_course[0].user_id;
                next(null, user_id)
            });
        },
        (user_id, next) => {
            // console.log("titleeeeeee : " + title)
            // console.log("chapter_id : " + chapter_id)
            // console.log("section_id : " + section_id)
            var video_id_sql =
                `SELECT final_section.video_id FROM final_section join new_chapter join new_course 
            on final_section.chapter_auto_id=new_chapter.chapter_auto_id 
            and new_course.course_id=new_chapter.course_id
            and course_title = ? and chapter_id = ? and section_id = ?;`
            mysql.con.query(video_id_sql, [title, chapter_id, section_id], function(err1, video_id_result) {
                if (err1)
                    throw err1;
                var video_id = video_id_result[0].video_id;
                next(null, user_id, video_id)
            });
        },
        (user_id, video_id, next) => {
            var complete = Math.floor(current_time / total_time);
            var update_videotile_detail_sql = {
                video_time: current_time,
                video_duration: total_time,
                complete: complete,
            }
            var update_videotime =
                `UPDATE course_progress SET ?
            WHERE user_id = ?
            and video_id = ?;`
            mysql.con.query(update_videotime, [update_videotile_detail_sql, user_id, video_id], function(err1, update_videotime_result) {
                next(null)
                res.send("data")
            });
        }
    ], (err, rst) => {
        if (err) return err;
    });
})

router.get("/test", function(req, res) {
    // console.log("hi");
    res.send();
});
module.exports = router;