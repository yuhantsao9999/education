var express = require("express");
var con = require('../module/db');
var app = express();
const router = express.Router();
var request = require('request');
var bodyParser = require('body-parser')
const crypto = require('crypto');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// 從根目錄使用router
app.use('/', router);

// GET profile.html
router.get('/', (req, res) => {
    res.send('profile');
});


//profile頁面驗證會員api
router.get('/user/profile', function(req, res) {
    //先判斷有是否是會員(有token)，
    var Bearer_token = req.headers.authorization;
    var Bearer = Bearer_token.substr(0, 6);
    var Token = Bearer_token.substr(7);
    console.log("token : " + Token)
    var profile_checkmember = `SELECT user_id FROM user WHERE access_token='${Token}'`
    con.query(profile_checkmember, function(err, result) {
        if (err) throw err;
        // var user_id = result[0].user_id;
        var course_id_arr = [];
        // console.log(user_id);
        if (String(result).length == 0) {
            //如果沒有token，就傳失敗訊息
            console.log('"error": "Invalid token."')
            res.send("error")
        } else { //有token是會員，且有註冊過課程，提取會員課程在頁面上
            var user_id = result[0].user_id;
            var profile_course_id = `SELECT course_id FROM new_section JOIN status ON new_section.video_id=status.video_id where status.user_id='${user_id}';`
            con.query(profile_course_id, function(err, profile_course_id_result) {
                if (err) throw err;
                console.log(profile_course_id_result)
                if (profile_course_id_result.length != 0) {
                    for (var i = 0; i < profile_course_id_result.length; i++) {
                        course_id_arr.push(profile_course_id_result[i].course_id)
                            // if (course_id_arr.length == 0)
                            //     course_id_arr.push(profile_course_id_result[i].course_id);
                            // else if (profile_course_id_result[i].course_id != course_id_arr[course_id_arr.length - 1]) {
                            //     course_id_arr.push(profile_course_id_result[i].course_id)
                            // }
                    }

                    // console.log(course_id_arr)
                    var course_id = course_id_arr.filter(function(element, index, arr) {
                        return arr.indexOf(element) === index;
                    });
                    course_id = String(course_id).split();
                    // console.log(String(course_id).split())
                    // console.log("id : " + course_id)
                    var profile_courserInfo = `SELECT * FROM course where course_id in (${course_id});`
                    con.query(profile_courserInfo, function(err, result) {
                        if (err)
                            throw err;
                        // console.log(result);
                        res.send(result)

                    });
                } else {
                    //有token是會員，但沒有有註冊過課程
                    res.send("no class")
                }

            });
        }
    })
})

//已完成課程
router.get('/profile/done', function(req, res) {
    //先判斷有是否是會員(有token)，
    var Bearer_token = req.headers.authorization;
    var Bearer = Bearer_token.substr(0, 6);
    var Token = Bearer_token.substr(7);
    console.log("token : " + Token)
    var profile_checkmember = `SELECT user_id FROM user WHERE access_token='${Token}'`
    con.query(profile_checkmember, function(err, result) {
        if (err) throw err;
        // var user_id = result[0].user_id;
        var course_id_arr = [];
        // console.log(user_id);
        if (String(result).length == 0) {
            //如果沒有token，就傳失敗訊息
            console.log('"error": "Invalid token."')
            res.send("error")
        } else { //有token是會員，且有註冊過課程，提取會員課程在頁面上
            var user_id = result[0].user_id;
            var profile_course_id = `SELECT course_id FROM new_section JOIN status ON new_section.video_id=status.video_id where status.user_id='${user_id}' and status.complete='1';`
            con.query(profile_course_id, function(err, profile_course_id_result) {
                if (err) throw err;
                console.log(profile_course_id_result)
                if (profile_course_id_result.length != 0) {
                    for (var i = 0; i < profile_course_id_result.length; i++) {
                        course_id_arr.push(profile_course_id_result[i].course_id)
                            // if (course_id_arr.length == 0)
                            //     course_id_arr.push(profile_course_id_result[i].course_id);
                            // else if (profile_course_id_result[i].course_id != course_id_arr[course_id_arr.length - 1]) {
                            //     course_id_arr.push(profile_course_id_result[i].course_id)
                            // }
                    }
                    // console.log(course_id_arr)
                    var course_id = course_id_arr.filter(function(element, index, arr) {
                        return arr.indexOf(element) === index;
                    });
                    course_id = String(course_id).split();
                    // console.log(String(course_id).split())
                    // console.log("id : " + course_id)
                    var profile_courserInfo = `SELECT * FROM course where course_id in (${course_id});`
                    con.query(profile_courserInfo, function(err, result) {
                        if (err)
                            throw err;
                        // console.log(result);
                        res.send(result)

                    });
                } else {
                    //有token是會員，但沒有完成的課程
                    res.send("no done class")
                }

            });
        }
    })


})


module.exports = router;