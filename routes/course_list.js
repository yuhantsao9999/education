const express = require('express')
var mysql = require('../module/db');
const course = require('../dao/course')
const app = express();
const router = express.Router();


// 從根目錄使用router
app.use('/', router);



//course api for hot
router.get("/education/classinfo/hot", async function(req, res) {
    try {
        let result = await course.course_hot(req);
        if (result != "err") {
            res.json(result)
            return "Success"
        } else {
            return "input error"
        }
    } catch {
        return "error"
    }
})

//course api for all
router.get("/education/classinfo/all", function(req, res) {
    var mysql_course = 'select * from new_course ORDER BY average_star DESC';
    mysql.con.query(mysql_course, function(err, result_course) {
        if (err) throw err
        var test = {};
        test['data'] = result_course
        res.send(test)
    });

})



//course api for all
router.get("/education/classinfo/for_newHand", function(req, res) {
    var mysql_course_new_hand = "select * from new_course where for_who like '%沒有基礎%' or for_who like '%初學%' or for_who like '%嘗試%' or  for_who like '%新手%' or  for_who like '%快速%' ;"
    mysql.con.query(mysql_course_new_hand, function(err, result_course) {
        // console.log("kkkkkkk : " + JSON.stringify(result_course))
        if (err) throw err
        var test = {};
        test['data'] = result_course
        res.send(test)
    });

})



module.exports = router;