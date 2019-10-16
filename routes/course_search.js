const express = require('express')
var mysql = require('../module/db');
const app = express();
const router = express.Router();


// search api 
router.get("/education/classinfo/search", function(req, res) {
    var keyword = req.query.keyword;
    // console.log(keyword)
    var mysql_search = "SELECT * from new_course WHERE course_title LIKE '%" + keyword + "%'";
    mysql.con.query(mysql_search, keyword, function(err, result_search) {
        if (err) throw err

        res.send(result_search);
    });
});



module.exports = router;