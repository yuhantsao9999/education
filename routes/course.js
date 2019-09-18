const express = require('express')
var bodyParser = require('body-parser')
var con = require('../module/db');
const path = require('path')
const app = express();
const router = express.Router();

// 從根目錄使用router
app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// GET course.html
router.get('/', (req, res) => {
    res.send('course');
});


router.post('/user/button', function(req, res) {
    var course_title = req.body.course_title;
    console.log(course_title);
    //先判斷有是否是會員(有token)，
    var Bearer_token = req.headers.authorization;

    var Bearer = Bearer_token.substr(0, 6);
    var Token = Bearer_token.substr(7);
    console.log("token : " + Token)

    var profile_checkmember = `SELECT user_id,email FROM user WHERE access_token='${Token}'`
    con.query(profile_checkmember, function(err, result) {
        if (err) throw err;
        var video_id_arr = [];
        if (String(result).length == 0) {
            //如果沒有token，就傳失敗訊息
            console.log('"error": "Invalid token."')
        } else { //有token是會員，判斷是否將此課程註冊過，若有，不顯示按鈕，若沒有則顯示按鈕
            var user_id = result[0].user_id;
            var email = result[0].email;
            var profile_registered = `SELECT registered FROM status where user_id='${user_id}'and course_title='${course_title}';`
            con.query(profile_registered, function(err, profile_registered_result) {
                if (err) throw err;
                console.log(profile_registered_result)
                if (String(profile_registered_result).length == 0) {
                    res.send("no class")

                } else {
                    var registered = profile_registered_result[0].registered
                    console.log("registered: " + registered)
                    res.send("registered")
                }


            });


        }

    })

})


router.post('/user/addcourse', function(req, res) {
    var course_title = req.body.course_title;
    console.log(course_title);
    //先判斷有是否是會員(有token)，
    var Bearer_token = req.headers.authorization;

    var Bearer = Bearer_token.substr(0, 6);
    var Token = Bearer_token.substr(7);
    console.log("token : " + Token)

    var profile_checkmember = `SELECT user_id,email FROM user WHERE access_token='${Token}'`
    con.query(profile_checkmember, function(err, result) {
        if (err) throw err;
        var user_id = result[0].user_id;
        var email = result[0].email;
        console.log(email);
        var video_id_arr = [];
        if (String(result).length == 0) {
            //如果沒有token，就傳失敗訊息
            console.log('"error": "Invalid token."')
        } else { //有token是會員，將此課程加入status資訊
            var video_id = `SELECT video_id FROM final_section JOIN new_course ON new_course.course_id=final_section.course_id where new_course.course_title="${course_title}";`
            con.query(video_id, function(err, video_id_result) {
                console.log(video_id_result)
                for (var i = 0; i < video_id_result.length; i++) {
                    video_id_arr.push(video_id_result[i].video_id)
                }

                console.log(video_id_arr)
                for (var i = 0; i < video_id_arr.length; i++) {
                    var course_input_status = `INSERT INTO status (user_id,video_id,course_title) VALUES('${user_id}','${video_id_arr[i]}','${course_title}')`
                    con.query(course_input_status, function(err, result) {
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








module.exports = router;