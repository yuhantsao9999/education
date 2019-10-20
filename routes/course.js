const express = require('express')
let mysql = require('../module/db');
const router = express.Router();

router.post('/user/button', async function(req, res) {
    let course_title = req.body.course_title;
    let token;
    //先判斷有是否是會員(有token)
    if (req.headers.authorization == null) {
        token = "";
    } else {
        let bearer_token = req.headers.authorization;
        if (bearer_token.substr(0, 6) != "Bearer") {
            // console.log(bearer_token.substr(0, 5))
            // console.log("not a Bearer token");
            return res.send("error");
        } else {
            let bearer = bearer_token.substr(0, 6);
            token = bearer_token.substr(7);
            // console.log("token : " + Token)
        }
    }

    let profile_checkmember = `SELECT user_id,email FROM user WHERE access_token = ? `
    let checkmember = await mysql.sql_query(profile_checkmember, token);
    if (String(checkmember).length == 0) {
        //如果沒有token，就傳失敗訊息
        console.log('"error": "Invalid token."')
        res.send("error")
    } else {
        //有token是會員，判斷是否將此課程註冊過，若有，不顯示按鈕，若沒有則顯示按鈕
        let user_id = checkmember[0].user_id;
        let profile_registered = "SELECT registered FROM course_progress where user_id = ? and course_title = ? ;"
        let profile_registered_result = await mysql.sql_query(profile_registered, [user_id, course_title]);
        if (String(profile_registered_result).length == 0) {
            res.send("no class")
        } else {
            let registered = profile_registered_result[0].registered
            res.send("registered")
        }
    }

})


router.post('/user/addcourse', function(req, res) {
    let course_title = req.body.course_title;
    let token
        //先判斷有是否是會員(有token)
    if (req.headers.authorization == null) {
        token = "";
    } else {
        let bearer_token = req.headers.authorization;
        if (bearer_token.substr(0, 6) != "Bearer") {
            // console.log("not a Bearerrrr token");
            return res.send("error");
        } else {
            let bearer = bearer_token.substr(0, 6);
            token = bearer_token.substr(7);
            // console.log("token : " + Token)
        }
    }

    let profile_checkmember = "SELECT user_id,email FROM user WHERE access_token=?"
    mysql.con.query(profile_checkmember, token, function(err, result) {
        if (err) return err;
        let user_id = result[0].user_id;
        let email = result[0].email;
        // console.log(email);
        let video_id_arr = [];
        if (String(result).length == 0) {
            //如果沒有token，就傳失敗訊息
            console.log('"error": "Invalid token."')
        } else {
            //有token是會員，將此課程加入course_progress資訊
            let video_id = "SELECT video_id FROM final_section JOIN new_course ON new_course.course_id=final_section.course_id where new_course.course_title= ? ;"
            mysql.con.query(video_id, course_title, function(err, video_id_result) {
                // console.log(video_id_result)
                for (let i = 0; i < video_id_result.length; i++) {
                    video_id_arr.push(video_id_result[i].video_id)
                }
                for (let i = 0; i < video_id_arr.length; i++) {
                    let insert_course_progress_info_detail = {
                        user_id,
                        video_id: video_id_arr[i],
                        course_title: course_title,
                    }
                    let course_input_course_progress = "INSERT INTO course_progress SET ? "
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
    let course_title = req.body.course_title;
    // console.log("課程標題 : " + course_title)
    let mysql_course_info = "SELECT new_course.course_teacher,user.provider,user.user_image,user.about_me,user.PersonalWebsite,user.facebookProfile,user.youtubeProfile,user.user_image FROM new_course Join user ON new_course.course_teacher=user.name where course_title = ?";
    let teacher_info = await mysql.sql_query(mysql_course_info, course_title);
    res.send(teacher_info)
})



module.exports = router;