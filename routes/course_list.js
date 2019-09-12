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
        var test = {};
        test['data'] = result_course
        res.send(test)
    });

})

module.exports = router;