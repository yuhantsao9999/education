const express = require('express')
var bodyParser = require('body-parser')
var con = require('../module/db');
const path = require('path')
const app = express();
const router = express.Router();
var async = require('async');
// var mysql = require("mysql");
var aws = require('aws-sdk');
var multerS3 = require('multer-s3');
var multer = require('multer');

// 從根目錄使用router
app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


// GET acd.html
router.get('/', (req, res) => {
    res.send('acd');
});


//course api for all
router.get("/education/classinfo/all", function(req, res) {
    var mysql_course = 'select * from course';
    con.query(mysql_course, function(err, result_course) {
        if (err) throw err
            // console.log(result_course)
        var test = {}
            //所有課程資訊
            // var course_id = result_course[0].course_id;
            // var title = result_course[0].title;
            // var intro = result_course[0].intro;
            // var teacher = result_course[0].teacher;
            // var mysql_chapter = `select * from chapter where course_id='${course_id}'`;
            // con.query(mysql_chapter, function(err, result_chapter) {
            //     if (err) throw err
            //     console.log(result_chapter) //所有章節資訊
            //     var mysql_section = `select * from new_section where course_id='${course_id}'`;
            // });
        test['data'] = result_course

        res.send(test)
    });

})

module.exports = router;