const express = require('express');
const mysql = require('../module/db');
const router = express.Router();
const async = require('async');

router.get('/gray/info', function (req, res) {
    async.waterfall(
        [
            (next) => {
                let user_mysql = `SELECT user_id FROM user;`;
                mysql.pool.query(user_mysql, function (err, user_result) {
                    if (err) throw err;
                    let user_num = user_result.length;
                    next(null, user_num);
                });
            },
            (user_num, next) => {
                let course_mysql = `SELECT course_id FROM new_course;`;
                mysql.pool.query(course_mysql, function (err, course_result) {
                    if (err) throw err;
                    let course_num = course_result.length;
                    next(null, user_num, course_num);
                });
            },
            (user_num, course_num, next) => {
                let comment_mysql = `SELECT comment_id,star FROM comment;`;
                mysql.pool.query(comment_mysql, function (err, comment_result) {
                    if (err) throw err;
                    let comment_num = comment_result.length;
                    let star_arr = [];
                    for (i = 0; i < comment_num; i++) {
                        let each_star = comment_result[i].star;
                        star_arr.push(each_star);
                    }
                    let total_star_num = SumDatareduce(star_arr);
                    let total_class_average_star = (total_star_num / comment_num).toFixed(1);
                    res.json({
                        user_num: user_num,
                        course_num: course_num,
                        comment_num: comment_num,
                        total_class_average_star: total_class_average_star,
                    });
                });
            },
        ],
        (err, rst) => {
            if (err) return err;
        }
    );
});

function SumDatareduce(arr) {
    let sum = arr.reduce((a, b) => a + b);
    return sum;
}
module.exports = router;
