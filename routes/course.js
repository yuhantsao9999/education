const express = require('express')
var bodyParser = require('body-parser')
var mysql = require('../module/db');
const path = require('path')
const app = express();
const router = express.Router();

// 從根目錄使用router
app.use('/', router);


router.post('/user/button', async function(req, res) {
    var course_title = req.body.course_title;
    //先判斷有是否是會員(有token)
    if (req.headers.authorization == null) {
        var token = "";
    } else {
        var bearer_token = req.headers.authorization;
        console.log(bearer_token)
        if (bearer_token.substr(0, 6) != "Bearer") {
            console.log(bearer_token.substr(0, 5))
            console.log("not a Bearer token");
            return res.send("error");
        } else {
            var bearer = bearer_token.substr(0, 6);
            var token = bearer_token.substr(7);
            // console.log("token : " + Token)
        }
    }

    var profile_checkmember = `SELECT user_id,email FROM user WHERE access_token = ? `
    var checkmember = await mysql.sql_query(profile_checkmember, token);
    if (String(checkmember).length == 0) {
        //如果沒有token，就傳失敗訊息
        console.log('"error": "Invalid token."')
    } else {
        //有token是會員，判斷是否將此課程註冊過，若有，不顯示按鈕，若沒有則顯示按鈕
        var user_id = checkmember[0].user_id;
        var profile_registered = "SELECT registered FROM course_progress where user_id = ? and course_title = ? ;"
        var profile_registered_result = await mysql.sql_query(profile_registered, [user_id, course_title]);
        if (String(profile_registered_result).length == 0) {
            res.send("no class")
        } else {
            var registered = profile_registered_result[0].registered
            res.send("registered")
        }
    }

})


router.post('/user/addcourse', function(req, res) {
    var course_title = req.body.course_title;
    //先判斷有是否是會員(有token)
    if (req.headers.authorization == null) {
        var token = "";
    } else {
        var bearer_token = req.headers.authorization;
        if (bearer_token.substr(0, 6) != "Bearer") {
            console.log("not a Bearerrrr token");
            return res.send("error");
        } else {
            var bearer = bearer_token.substr(0, 6);
            var token = bearer_token.substr(7);
            // console.log("token : " + Token)
        }
    }

    var profile_checkmember = "SELECT user_id,email FROM user WHERE access_token=?"
    mysql.con.query(profile_checkmember, token, function(err, result) {
        if (err) return err;
        var user_id = result[0].user_id;
        var email = result[0].email;
        // console.log(email);
        var video_id_arr = [];
        if (String(result).length == 0) {
            //如果沒有token，就傳失敗訊息
            console.log('"error": "Invalid token."')
        } else {
            //有token是會員，將此課程加入course_progress資訊
            var video_id = "SELECT video_id FROM final_section JOIN new_course ON new_course.course_id=final_section.course_id where new_course.course_title= ? ;"
            mysql.con.query(video_id, course_title, function(err, video_id_result) {
                // console.log(video_id_result)
                for (var i = 0; i < video_id_result.length; i++) {
                    video_id_arr.push(video_id_result[i].video_id)
                }
                for (var i = 0; i < video_id_arr.length; i++) {
                    var insert_course_progress_info_detail = {
                        user_id,
                        video_id: video_id_arr[i],
                        course_title: course_title,
                    }
                    var course_input_course_progress = "INSERT INTO course_progress SET ? "
                    mysql.con.query(course_input_course_progress, insert_course_progress_info_detail, function(err, result) {
                        if (err) throw err;
                        // 0 表示 false
                        // 1 表示 true
                    });

                }

            })
        }
        res.send(email)
    })

})


//右下老師資訊
router.post("/course/teacher/info", async function(req, res) {
    var course_title = req.body.course_title;
    console.log("課程標題 : " + course_title)
    var mysql_course_info = "SELECT new_course.course_teacher,user.provider,user.user_image,user.about_me,user.PersonalWebsite,user.facebookProfile,user.youtubeProfile,user.user_image FROM new_course Join user ON new_course.course_teacher=user.name where course_title = ?";
    var teacher_info = await mysql.sql_query(mysql_course_info, course_title);
    res.send(teacher_info)
})



module.exports = router;