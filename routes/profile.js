var express = require("express");
var mysql = require('../module/db');
var app = express();
const router = express.Router();
var request = require('request');

// 從根目錄使用router
app.use('/', router);



//我修的課---profile頁面驗證會員api
router.post('/profile/student/class', function(req, res) {
    var course_id_arr = [];
    var user_id = req.user_id;
    var profile_course_id = "SELECT course_id FROM final_section JOIN course_progress ON final_section.video_id=course_progress.video_id where course_progress.user_id = ?"
    mysql.con.query(profile_course_id, user_id, function(err, profile_course_id_result) {
        if (err) throw err;
        if (profile_course_id_result.length != 0) {
            for (var i = 0; i < profile_course_id_result.length; i++) {
                course_id_arr.push(profile_course_id_result[i].course_id)
            }
            // console.log("我修的課 : " + course_id_arr)
            var course_id = course_id_arr.filter(function(element, index, arr) {
                return arr.indexOf(element) === index;
            });
            var profile_courser_info = 'SELECT * FROM new_course where course_id in (?);'
            mysql.con.query(profile_courser_info, [course_id], function(err, result) {
                if (err)
                    throw err;
                console.log(result);
                res.send(result)
            });
        } else {
            //有token是會員，但沒有有註冊過課程
            res.send("no class")
        }
    });
})

//我的公開資訊--獲取目前會員資料
router.get('/profile/getinfo', function(req, res) {
    let user_id = req.user_id;
    var profile_info = "SELECT * FROM user WHERE user_id=?";
    mysql.con.query(profile_info, user_id, function(err, result_profile_info) {
        if (err) return err;
        // console.log(result_profile_info)
        var profile_info_arr = []
        var profile_info_obj = {};
        var name = result_profile_info[0].name;
        var user_image = result_profile_info[0].user_image;
        var provider = result_profile_info[0].provider;
        var about_me = result_profile_info[0].about_me;
        var personal_website = result_profile_info[0].PersonalWebsite;
        var facebook_profile = result_profile_info[0].facebookProfile;
        var youtube_profile = result_profile_info[0].youtubeProfile;
        profile_info_arr.push({ name: name, provider: provider, user_image: user_image, about_me: about_me, PersonalWebsite: personal_website, facebookProfile: facebook_profile, youtubeProfile: youtube_profile });
        profile_info_obj['info'] = profile_info_arr;
        res.send(profile_info_obj)
    });
})


//我的公開資訊--更新會員資料
router.post('/profile/info', function(req, res) {
    var user_id = req.user_id;
    var { user_name, about_me } = req.body;
    var personal_website = req.body.PersonalWebsite;
    var facebook_profile = req.body.facebookProfile;
    var youtube_profile = req.body.youtubeProfile;
    //有token是會員，儲存會員的名稱、關於自己、網站連結匯入於user table
    var update_user_sql = {
        name: user_name,
        about_me,
        PersonalWebsite: personal_website,
        facebookProfile: facebook_profile,
        youtubeProfile: youtube_profile,
    }
    var mysql_insert_user = `UPDATE user SET ? WHERE user_id = ? `
    mysql.con.query(mysql_insert_user, [update_user_sql, user_id], function(err, result_insert_user) {
        var mysql_update_teacher_name = `UPDATE new_course SET course_teacher = ? WHERE course_teacher_id = ? `
        mysql.con.query(mysql_update_teacher_name, [user_name, user_id], function(err, result_update_teacher_name) {

        });
    });
})


//已完成課程
router.get('/profile/done', function(req, res) {
    //有token是會員，且有註冊過課程，提取會員課程在頁面上
    let user_id = req.user_id;
    var course_id_arr = [];
    var profile_course_id = 'SELECT final_section.course_id ,course_progress.course_title,course_progress.complete from final_section JOIN course_progress ON final_section.video_id = course_progress.video_id where course_progress.user_id = ? ';
    mysql.con.query(profile_course_id, user_id, function(err, profile_course_id_result) {
        if (err) throw err;
        if (profile_course_id_result.length != 0) {
            var flag = 1;
            for (var i = 0; i < profile_course_id_result.length - 1; i++) {
                if (profile_course_id_result[i].course_id == profile_course_id_result[i + 1].course_id) {
                    flag *= (profile_course_id_result[i].complete * profile_course_id_result[i + 1].complete);
                    if (i == profile_course_id_result.length - 2 && flag) {
                        course_id_arr.push(profile_course_id_result[i].course_id)
                    }
                } else {
                    if (flag)
                        course_id_arr.push(profile_course_id_result[i].course_id)
                    flag = 1;
                }
            }
            if (course_id_arr.length != 0) {
                //取出完成課程的評論，有評論過的就讓前端直接顯示comment，沒評論過的留空位null
                var course_comment = 'SELECT comment.star,comment.comment,new_course.course_title ,new_course.main_image FROM comment RIGHT join new_course ON comment.course_id = new_course.course_id and comment.user_id = ? where new_course.course_id in (?);'
                mysql.con.query(course_comment, [user_id, course_id_arr], function(err, result_course_comment) {
                    if (err) throw err;
                    res.send(result_course_comment)
                });
            } else {
                res.send("no done class")
            }
        } else {
            //有token是會員，沒有註冊的課程
            res.send("no done class")
        }
    });
})

//老師開的課
router.get('/profile/teacher/class', function(req, res) {
    var user_id = req.user_id;
    var teacher_class = `SELECT * FROM new_course WHERE course_teacher_id=?`
    mysql.con.query(teacher_class, user_id, function(err, result_teacher_class) {
        if (err) throw err;
        console.log(result_teacher_class)
        if (result_teacher_class.length != 0) {
            console.log(result_teacher_class)
            res.send(result_teacher_class)
        } else {
            //有token是會員，但沒有開設課程
            res.send("no set up class")
        }
    });
})

module.exports = router;