const express = require('express')
    // var bodyParser = require('body-parser')
var con = require('../module/db');
const path = require('path')
const app = express();
const router = express.Router();
var async = require('async');


// 從根目錄使用router
app.use('/', router);
// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({ extended: false }));


// GET profile_done.html
router.get('/', (req, res) => {
    res.send('profile_done');
});


//comment
router.post("/profile/done/comment", function(req, res) {
    // console.log(req.body);
    var user_token = req.body.user_token;
    var star_number = req.body.star_number;
    var class_name = req.body.class_name
    var comment = req.body.comment;
    // console.log("課程星星數量 : " + star_number)
    async.waterfall([
        (next) => {
            var comment_checkmember = `SELECT user_id FROM user WHERE access_token='${user_token}'`
            con.query(comment_checkmember, function(err, result) {
                if (err) throw err;
                var user_id = result[0].user_id;
                // console.log(user_id)
                next(null, user_id);
            });
        }, (user_id, next) => {
            var check_course_id = `SELECT course_id FROM new_course WHERE course_title='${class_name}'`
            con.query(check_course_id, function(err, result_course_id) {
                if (err) throw err;
                // console.log(result_course_id)
                var course_id = result_course_id[0].course_id;
                // console.log(course_id)
                next(null, user_id, course_id);
            });
        },
        (user_id, course_id, next) => {
            //TODO: 讓使用者一旦變更就會update,而不是無限制input,這裡還要修改(目前讓一個課程只能評論一次)
            var insert_comment = `INSERT INTO comment (user_id,course_id,star,comment) 
                Values('${user_id}','${course_id}','${star_number}','${comment}')`
            con.query(insert_comment, function(err, result_insert_comment) {
                if (err) throw err;
                // console.log(result_insert_comment);
                // res.redirect("/profile_done.html");
                next(null, user_id, course_id);
            });
        },
        (user_id, course_id, next) => {
            var star_comment_number_select = `SELECT star,comment FROM comment WHERE course_id='${course_id}' `
            con.query(star_comment_number_select, function(err, result_star_comment) {
                var star_arr = [];
                var comment_arr = [];
                for (i = 0; i < result_star_comment.length; i++) {
                    star_arr.push(result_star_comment[i].star);
                    if (result_star_comment[i].comment !== null && result_star_comment[i].comment !== undefined && result_star_comment[i].comment !== '') {
                        comment_arr.push(result_star_comment[i].comment)
                    }
                }
                var star_sum = 0;
                for (var i = 0; i < star_arr.length; i++) {
                    star_sum += star_arr[i];
                };
                // console.log("星星總數 : " + star_sum)
                var average_star = (star_sum / star_arr.length).toFixed(1)
                    // console.log("平均獲得星數到小數點後一位 : " + average_star);
                    // console.log("course_id : " + course_id);
                var star_number = star_arr.length
                    // console.log("打星星次數" + star_arr.length);
                var comment_number = comment_arr.length
                    // console.log("評論次數" + comment_number);
                if (err) throw err;
                // console.log(result_insert_comment);
                next(null, user_id, course_id, star_number, average_star, comment_number);
            });
        },
        (user_id, course_id, star_number, average_star, comment_number, next) => { //紀錄評論數量以及星數於頁面上
            var course_star_comment = `update new_course set star_number='${star_number}', average_star='${average_star}',comment_number='${comment_number}'
            where  course_id='${course_id}' ;`
            con.query(course_star_comment, function(err, result_course_star_comment) {
                if (err) throw err;
                // console.log(result_insert_comment);
                res.redirect("/profile_done.html");
            });
        }
    ], (err, rst) => {
        if (err) return err;
    });
})



module.exports = router;