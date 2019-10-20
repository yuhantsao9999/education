const express = require('express')
const mysql = require('../module/db');
const router = express.Router();
const async = require('async');


//video.html
router.post("/education/videoinfo", function(req, res) {
    let { title, section, section_id, user_token } = req.body.videoinfo_obj;
    let chapter_id = req.body.videoinfo_obj.chapter;
    async.waterfall([
        (next) => {
            let mysql_course = `select * from new_course where course_title=?;`;
            mysql.con.query(mysql_course, title, function(err1, result_course) {
                let course_id = result_course[0].course_id;
                next(null, course_id);
            });
        },
        (course_id, next) => {
            let mysql_video = `select final_section.video,final_section.video_id from final_section join new_chapter 
            on  final_section.chapter_auto_id=new_chapter.chapter_auto_id and final_section.course_id=? and new_chapter.chapter_id=? and final_section.section_id=?`;
            mysql.con.query(mysql_video, [course_id, chapter_id, section_id], function(err, result_video) {
                let video = result_video[0].video;
                let video_id = result_video[0].video_id;
                next(null, course_id, video, video_id)
                    // console.log(result_video)
            });
        },
        (course_id, video, video_id, next) => {
            let mysql_video_current_time = `SELECT video_time FROM course_progress JOIN user  on course_progress.user_id=user.user_id 
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
                    let user_vider_current_time = result_video_current_time[0].video_time;
                    let video_detail_array = []
                    video_detail_array.push({ video: video, user_currentTime: user_vider_current_time })
                    let data = {};
                    data["data"] = video_detail_array;
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
    let title = req.body.title;
    let access_token = req.body.accessToken;
    // console.log(req.body)
    // console.log("tokennnnnnn : " + accessToken)
    async.waterfall([
        (next) => {
            let profile_check_member = `SELECT user_id FROM user WHERE access_token = ? `
            mysql.con.query(profile_check_member, access_token, function(err1, result_course) {
                let user_id = result_course[0].user_id;
                console.log(user_id)
                next(null, user_id)
            });
        },
        (user_id, next) => {
            let video_time_sql =
                `SELECT video_time,video_duration FROM course_progress
            where course_title = ? and user_id = ? `
            mysql.con.query(video_time_sql, [title, user_id], function(err1, video_time_result) {
                if (err1) throw err1;
                console.log(JSON.stringify(video_time_result))
                let progress_arr = []
                for (i = 0; i < video_time_result.length; i++) {
                    console.log(video_time_result[i].video_time)
                    console.log(video_time_result[i].video_duration)
                    let progress = (video_time_result[i].video_time / video_time_result[i].video_duration)
                    console.log("progress : " + progress)
                    if (isFinite(progress)) {
                        // isNaN(progress) ||
                        let progress_percentage = progress * 100
                        progress_arr.push(Math.round(progress_percentage));
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

    let title = req.body.title;
    let chapter_id = req.body.chapter;
    let section_id = req.body.section_id;

    let current_time = req.body.currentTime;
    let total_time = req.body.totalTime;
    let token = req.body.accessToken;
    // console.log("body : " + JSON.stringify(req.body))
    async.waterfall([
        (next) => {
            let profile_checkmember = `SELECT user_id FROM user WHERE access_token=? `
            mysql.con.query(profile_checkmember, token, function(err1, result_course) {
                let user_id = result_course[0].user_id;
                next(null, user_id)
            });
        },
        (user_id, next) => {
            // console.log("titleeeeeee : " + title)
            // console.log("chapter_id : " + chapter_id)
            // console.log("section_id : " + section_id)
            let video_id_sql =
                `SELECT final_section.video_id FROM final_section join new_chapter join new_course 
            on final_section.chapter_auto_id=new_chapter.chapter_auto_id 
            and new_course.course_id=new_chapter.course_id
            and course_title = ? and chapter_id = ? and section_id = ?;`
            mysql.con.query(video_id_sql, [title, chapter_id, section_id], function(err1, video_id_result) {
                if (err1)
                    throw err1;
                let video_id = video_id_result[0].video_id;
                next(null, user_id, video_id)
            });
        },
        (user_id, video_id, next) => {
            console.log(current_time)
            let complete = Math.round((current_time + 3) / total_time);
            let update_videotile_detail_sql = {
                video_time: current_time,
                video_duration: total_time,
                complete: complete,
            }
            let update_videotime =
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


module.exports = router;