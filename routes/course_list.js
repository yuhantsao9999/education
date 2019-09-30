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


// GET acd.html
router.get('/', (req, res) => {
    res.send('acd');
});


//course api for hot
router.get("/education/classinfo/hot", function(req, res) {
    var sql_hot_course = 'select * from new_course ORDER BY average_star DESC';
    con.query(sql_hot_course, function(err, result_hot_course) {
        if (err) throw err
        var test = {};
        test['data'] = result_hot_course
        res.send(test)
    });

})



//course api for all
router.get("/education/classinfo/all", function(req, res) {
    var mysql_course = 'select * from new_course ORDER BY average_star DESC';
    con.query(mysql_course, function(err, result_course) {
        if (err) throw err
        var test = {};
        test['data'] = result_course
        res.send(test)
    });

})

module.exports = router;