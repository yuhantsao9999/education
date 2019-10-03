const express = require('express')
var bodyParser = require('body-parser')
var con = require('../module/db');
const path = require('path')
const app = express();
const router = express.Router();

// 從根目錄使用router
app.use('/', router);


router.post('/user/button', function(req, res) {
    var course_title = req.body.course_title;
    //先判斷有是否是會員(有token)，
    var bearer_token = req.headers.authorization;
    var bearer = bearer_token.substr(0, 6);
    var token = bearer_token.substr(7);
    // console.log("token : " + Token)

    var profile_checkmember = `SELECT user_id,email FROM user WHERE access_token = ? `
    con.query(profile_checkmember, token, function(err, result) {
        if (err) throw err;
        if (String(result).length == 0) {
            //如果沒有token，就傳失敗訊息
            console.log('"error": "Invalid token."')
        } else {
            //有token是會員，判斷是否將此課程註冊過，若有，不顯示按鈕，若沒有則顯示按鈕
            var user_id = result[0].user_id;
            var profile_registered = "SELECT registered FROM status where user_id = ? and course_title = ? ;"
            con.query(profile_registered, [user_id, course_title], function(err, profile_registered_result) {
                if (err) throw err;
                // console.log(profile_registered_result)
                if (String(profile_registered_result).length == 0) {
                    res.send("no class")

                } else {
                    var registered = profile_registered_result[0].registered
                        // console.log("registered: " + registered)
                    res.send("registered")
                }


            });


        }

    })

})


router.post('/user/addcourse', function(req, res) {
    var course_title = req.body.course_title;
    //先判斷有是否是會員(有token)，
    var bearer_token = req.headers.authorization;
    var bearer = bearer_token.substr(0, 6);
    var token = bearer_token.substr(7);
    // console.log("token : " + Token)

    var profile_checkmember = "SELECT user_id,email FROM user WHERE access_token=?"
    con.query(profile_checkmember, token, function(err, result) {
        if (err) return err;
        var user_id = result[0].user_id;
        var email = result[0].email;
        // console.log(email);
        var video_id_arr = [];
        if (String(result).length == 0) {
            //如果沒有token，就傳失敗訊息
            // console.log('"error": "Invalid token."')
        } else {
            //有token是會員，將此課程加入status資訊
            var video_id = "SELECT video_id FROM final_section JOIN new_course ON new_course.course_id=final_section.course_id where new_course.course_title= ? ;"
            con.query(video_id, course_title, function(err, video_id_result) {
                // console.log(video_id_result)
                for (var i = 0; i < video_id_result.length; i++) {
                    video_id_arr.push(video_id_result[i].video_id)
                }
                for (var i = 0; i < video_id_arr.length; i++) {
                    var insert_status_info_detail = {
                        user_id,
                        video_id: video_id_arr[i],
                        course_title: course_title,
                    }
                    var course_input_status = "INSERT INTO status SET ? "
                    con.query(course_input_status, insert_status_info_detail, function(err, result) {
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
router.post("/course/teacher/info", function(req, res) {
    var course_title = req.body.course_title;
    console.log("課程標題 : " + course_title)
    var mysql_course_info = "SELECT new_course.course_teacher,user.about_me,user.PersonalWebsite,user.facebookProfile,user.youtubeProfile,user.user_image FROM new_course Join user ON new_course.course_teacher=user.name where course_title = ?";

    con.query(mysql_course_info, course_title, function(err, result_course_info) {
        if (err) throw err;
        console.log("搜尋結果 : " + result_course_info)
        res.send(result_course_info)
    });
})




module.exports = router;