var express = require("express");
var con = require('../module/db');
var app = express();
const router = express.Router();
var request = require('request');
var bodyParser = require('body-parser')
const crypto = require('crypto');
var async = require('async');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// 從根目錄使用router
app.use('/', router);

// GET profile.html
router.get('/', (req, res) => {
    res.send('profile');
});

// GET profile_teacher.html
router.get('/', (req, res) => {
    res.send('profile_teacher');
});


//我修的課---profile頁面驗證會員api
router.get('/profile/student/class', function(req, res) {
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
            var profile_course_id = `SELECT course_id FROM final_section JOIN status ON final_section.video_id=status.video_id where status.user_id='${user_id}';`
            con.query(profile_course_id, function(err, profile_course_id_result) {
                if (err) throw err;
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

                    var profile_courserInfo = `SELECT * FROM new_course where course_id in (${course_id});`
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

//我的公開資訊--獲取目前會員資料
// TODO:目前user_icon都用這個記得改
router.get('/profile/getinfo', function(req, res) {
    var Bearer_token = req.headers.authorization;
    var Bearer = Bearer_token.substr(0, 6);
    var Token = Bearer_token.substr(7);
    async.waterfall([
        (next) => {
            var profile_checkmember = `SELECT user_id FROM user WHERE access_token='${Token}'`
            con.query(profile_checkmember, function(err, result) {
                if (err) throw err;
                if (String(result).length == 0) {
                    //如果沒有token，就傳失敗訊息
                    res.send("error")
                } else {
                    var user_id = result[0].user_id;
                    next(null, user_id);
                }
            });
        },
        (user_id, next) => {
            var profile_info = `SELECT * FROM user WHERE user_id='${user_id}'`;
            con.query(profile_info, function(err, result_profile_info) {
                if (err) throw err;
                // console.log(result_profile_info)
                var profile_info_arr = []
                var profile_info_obj = {};
                var name = result_profile_info[0].name;
                var about_me = result_profile_info[0].about_me;
                var PersonalWebsite = result_profile_info[0].PersonalWebsite;
                var facebookProfile = result_profile_info[0].facebookProfile;
                var youtubeProfile = result_profile_info[0].youtubeProfile;
                profile_info_arr.push({ name: name, about_me: about_me, PersonalWebsite: PersonalWebsite, facebookProfile: facebookProfile, youtubeProfile: youtubeProfile });
                profile_info_obj['info'] = profile_info_arr;
                // console.log(profile_info_obj)
                res.send(profile_info_obj)
                next(null);
            });
        }
    ], (err, rst) => {
        if (err) return err;
    });
})


//我的公開資訊--更新會員資料
router.post('/profile/info', function(req, res) {
    //先判斷有是否是會員(有token)，
    var Bearer_token = req.headers.authorization;
    var Bearer = Bearer_token.substr(0, 6);
    var Token = Bearer_token.substr(7);
    var obj = req.body;
    var { user_name, about_me, PersonalWebsite, facebookProfile, youtubeProfile } = req.body;
    async.waterfall([
        (next) => {
            var profile_checkmember = `SELECT user_id FROM user WHERE access_token='${Token}'`
            con.query(profile_checkmember, function(err, result) {
                if (err) throw err;
                if (String(result).length == 0) {
                    //如果沒有token，就傳失敗訊息
                    console.log('"error": "Invalid token."')
                    res.send("error")
                } else {
                    var user_id = result[0].user_id;
                    console.log("error : " + user_id)
                    next(null, user_id);
                }
            });
        },
        (user_id, next) => {
            //有token是會員，儲存會員的名稱、關於自己、網站連結匯入於user table
            var mysql_insert_user = `UPDATE user SET name = '${user_name}', about_me = '${about_me}', PersonalWebsite = '${PersonalWebsite}',
            facebookProfile = '${facebookProfile}', youtubeProfile = '${youtubeProfile}'
            WHERE user_id = '${user_id}' `
            con.query(mysql_insert_user, function(err, result_insert_user) {
                next(null)
            });
        }
    ], (err, rst) => {
        if (err) return err;
    });
})


//已完成課程
router.get('/profile/done', function(req, res) {
    //先判斷有是否是會員(有token)
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
                    var profile_courserInfo = `SELECT * FROM new_course where course_id in (${course_id});`
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

//老師開的課
router.get('/profile/teacher/class', function(req, res) {
    //先透過有token，判斷user是誰
    var Bearer_token = req.headers.authorization;
    var Bearer = Bearer_token.substr(0, 6);
    var Token = Bearer_token.substr(7);
    console.log("token : " + Token)
    async.waterfall([
        (next) => {
            var profile_checkmember = `SELECT user_id FROM user WHERE access_token='${Token}'`
            con.query(profile_checkmember, function(err, result) {
                if (err) throw err;
                var user_id = result[0].user_id;
                console.log(user_id)
                next(null, user_id);
            });
        },
        (user_id, next) => {
            var teacher_class = `SELECT * FROM new_course WHERE course_teacher_id='${user_id}'`
            con.query(teacher_class, function(err, result_teacher_class) {
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



        }
    ], (err, rst) => {
        if (err) return err;
    });
})


module.exports = router;