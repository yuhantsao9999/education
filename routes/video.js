const express = require('express')
var bodyParser = require('body-parser')
var con = require('../module/db');
const app = express();
const router = express.Router();


// 從根目錄使用router
app.use('/', router);


// GET video.html
router.get('/', (req, res) => {
    res.send('video');
});

//course detail api
router.get("/education/classinfo", function(req, res) {
    var title = req.query.title;
    var mysql_course = `select * from course where title='${title}'`;
    con.query(mysql_course, function(err, result_course) {
        if (err) throw err
        console.log(result_course) //所有課程資訊
        var course_id = result_course[0].course_id;
        var title = result_course[0].title;
        var intro = result_course[0].intro;
        var teacher = result_course[0].teacher;
        var mysql_chapter = `select * from chapter where course_id='${course_id}'`;
        con.query(mysql_chapter, function(err, result_chapter) {
            if (err) throw err
            console.log(result_chapter) //所有章節資訊
            var mysql_section = `select * from new_section where course_id='${course_id}'`;
            con.query(mysql_section, function(err, result_section) {
                if (err) throw err
                console.log(result_section) //所有節的資訊
                var obj = {};
                obj['Course_id'] = result_course[0].course_id; //添加名稱
                obj['Course_title'] = result_course[0].title;
                obj['Course_intro'] = result_course[0].intro;
                obj['Course_teacher'] = result_course[0].teacher;
                obj["Course_detail"] = []
                for (var i = 0; i < result_chapter.length; i++) {
                    var chp_obj = {}
                    chp_obj['Chapter_id'] = result_chapter[i].chapter_id
                    chp_obj['Chapter_title'] = result_chapter[i].chapter_title
                    chp_obj['Chapter_detail'] = []
                    for (var j = 0; j < result_section.length; j++) {
                        if (result_section[j].chapter_id == chp_obj['Chapter_id']) {
                            var obj_tmp = {}
                            obj_tmp['Section_id'] = result_section[j].section_id
                            obj_tmp['Section_title'] = result_section[j].section_title
                            obj_tmp['Section_intro'] = result_section[j].section_intro
                            obj_tmp['Video'] = result_section[j].video
                            chp_obj['Chapter_detail'].push(obj_tmp)
                        }
                    }
                    obj["Course_detail"].push(chp_obj)
                }
                var test = {};
                test["data"] = obj
                console.log(test)
                res.send(test)
            });
        });
    });
})
module.exports = router;