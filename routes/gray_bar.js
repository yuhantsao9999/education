const express = require('express')
var con = require('../module/db');
// const path = require('path')
// const app = express();
const router = express.Router();
var async = require('async');



router.get("/gray/info", function(req, res) {
    async.waterfall([
        (next) => {
            var user_mysql = `SELECT user_id FROM user;`
            con.query(user_mysql, function(err, user_result) {
                if (err) throw err;
                var user_num = user_result.length;
                console.log(user_num)
                next(null, user_num);
            });
        },
        (user_num, next) => {
            var course_mysql = `SELECT course_id FROM new_course;`
            con.query(course_mysql, function(err, course_result) {
                if (err) throw err;
                var course_num = course_result.length;
                console.log(course_num)
                next(null, user_num, course_num);
            });
        },
        (user_num, course_num, next) => {
            var comment_mysql = `SELECT comment_id,star FROM comment;`
            con.query(comment_mysql, function(err, comment_result) {
                if (err) throw err;
                var comment_num = comment_result.length;
                console.log(comment_num)
                var star_arr = [];
                for (i = 0; i < comment_num; i++) {
                    var each_star = comment_result[i].star;
                    star_arr.push(each_star)
                }
                var total_star_num = SumDatareduce(star_arr);
                console.log(SumDatareduce(star_arr));
                var total_class_average_star = (total_star_num / comment_num).toFixed(1)
                console.log(total_class_average_star);
                res.json({ user_num: user_num, course_num: course_num, comment_num: comment_num, total_class_average_star: total_class_average_star })
            });
        },
    ], (err, rst) => {
        if (err) return err;
    });

})



function SumDatareduce(arr) {
    var sum = arr.reduce((a, b) => a + b);
    return sum;
}
module.exports = router;