const express = require('express')
var mysql = require('../module/db');
// const path = require('path')
const app = express();
const router = express.Router();
var async = require('async');


// 從根目錄使用router
app.use('/', router);


//insert comment in profile.done.html
router.post("/profile/done/comment", function(req, res) {
    // console.log(req.body);
    var user_token = req.body.user_token;
    var star_number = req.body.star_number;
    var class_name = req.body.class_name
    var comment = req.body.comment;
    // console.log("課程星星數量 : " + star_number)
    async.waterfall([
        (next) => {
            var comment_checkmember = `SELECT user_id FROM user WHERE access_token=?`
            mysql.con.query(comment_checkmember, user_token, function(err, result) {
                if (err) throw err;
                var user_id = result[0].user_id;
                // console.log(user_id)
                next(null, user_id);
            });
        }, (user_id, next) => {
            var check_course_id = `SELECT course_id FROM new_course WHERE course_title='${class_name}'`
            mysql.con.query(check_course_id, function(err, result_course_id) {
                if (err) throw err;
                // console.log(result_course_id)
                var course_id = result_course_id[0].course_id;
                // console.log(course_id)
                next(null, user_id, course_id);
            });
        },
        (user_id, course_id, next) => {
            //TODO: 讓使用者一旦變更就會update,而不是無限制input,這裡還要修改(目前讓一個課程只能評論一次)
            var dt = new Date();
            var year = dt.getFullYear();
            var month = dt.getMonth() + 1;
            var date = dt.getDate();
            var comment_date = month + "月 " + date + ", " + year
            const insert_sql = {
                user_id,
                course_id,
                star: `${star_number}`,
                comment,
                comment_date
            };

            var insert_comment = `INSERT INTO comment set ?`

            mysql.con.query(insert_comment, insert_sql, function(err, result_insert_comment) {
                if (err) throw err;
                // console.log(result_insert_comment);
                // res.redirect("/profile_done.html");
                next(null, user_id, course_id);
            });
        },
        (user_id, course_id, next) => {
            var star_comment_number_select = `SELECT star,comment FROM comment WHERE course_id=? `
            mysql.con.query(star_comment_number_select, course_id, function(err, result_star_comment) {
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
                next(null, course_id, star_number, average_star, comment_number);
            });
        },
        (course_id, star_number, average_star, comment_number, next) => { //紀錄評論數量以及星數於頁面上
            const updateSql = {
                star_number,
                average_star,
                comment_number,
            }
            var course_star_comment = `update new_course set ? where course_id='${course_id}' ;`
            mysql.con.query(course_star_comment, updateSql, function(err, result_course_star_comment) {
                if (err) throw err;
                // console.log(result_insert_comment);
                res.redirect("/profile_done.html");
            });
        }
    ], (err, rst) => {
        if (err) return err;
    });
})


//select comment to course.html
router.post("/course/comment", async function(req, res) {
    var course_title = req.body.course_title;
    // console.log(course_title)
    async.waterfall([
        (next) => {
            var course_id_mysql = `SELECT course_id FROM new_course WHERE course_title=?;`
            mysql.con.query(course_id_mysql, course_title, function(err, course_id_result) {
                if (err) throw err;
                // console.log(result_insert_comment);
                var course_id = course_id_result[0].course_id;
                next(null, course_id);
            });
        },
        (course_id, next) => {
            var user_comment = `SELECT user.name,comment.comment_date ,comment.star,comment.comment
            FROM comment join user on comment.user_id=user.user_id 
            WHERE comment.course_id=?;`
            mysql.con.query(user_comment, course_id, function(err, result_user_comment) {
                if (err) throw err;
                res.send(result_user_comment)
            });

        }
    ], (err, rst) => {
        if (err) return err;
    });
})


module.exports = router;