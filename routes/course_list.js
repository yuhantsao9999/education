const express = require('express')
var mysql = require('../module/db');
const course = require('../dao/course')
const app = express();
const router = express.Router();


// 從根目錄使用router
app.use('/', router);

//course detail api
router.get("/education/classinfo", function(req, res) {
    var title = req.query.title;
    var mysql_course = `select * from new_course where course_title=?`;
    mysql.con.query(mysql_course, title, function(err, result_course) {
        if (err) throw err
            // console.log("heyyyyyyyyy : " + result_course) //所有課程資訊
        var course_id = result_course[0].course_id;
        //以chapter id做排序大到小
        var mysql_chapter = `select * from new_chapter where course_id=? ORDER BY chapter_id ASC`;
        mysql.con.query(mysql_chapter, course_id, function(err, result_chapter) {
            if (err) throw err
                // console.log(result_chapter) //所有章節資訊
            var mysql_section = `select * from final_section where course_id=? ORDER BY section_id ASC`;
            mysql.con.query(mysql_section, course_id, function(err, result_section) {
                // console.log("result_section : " + JSON.stringify(result_section))
                if (err) throw err
                    // console.log(result_section) //所有節的資訊
                var obj = {};
                obj['Course_id'] = result_course[0].course_id; //添加名稱
                obj['Course_title'] = result_course[0].course_title;
                obj['Course_intro'] = result_course[0].course_intro;
                obj['Course_teacher'] = result_course[0].course_teacher;
                obj['Course_teacher_intro'] = result_course[0].course_teacher_intro;
                obj['For_who'] = result_course[0].for_who;
                obj['star_number'] = result_course[0].star_number;
                obj['average_star'] = result_course[0].average_star;
                obj['comment_number'] = result_course[0].comment_number;
                obj["Course_detail"] = []
                for (var i = 0; i < result_chapter.length; i++) {
                    var chp_obj = {}
                    chp_obj['Chapter_id'] = result_chapter[i].chapter_id
                    chp_obj['Chapter_auto_id'] = result_chapter[i].chapter_auto_id
                    chp_obj['Chapter_title'] = result_chapter[i].chapter_title
                    chp_obj['Chapter_detail'] = []
                    for (var j = 0; j < result_section.length; j++) {
                        if (result_section[j].chapter_auto_id == chp_obj['Chapter_auto_id']) {
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
                    // console.log("testtttttt : " + JSON.stringify(test))
                res.send(test)
            });
        });
    });
})

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
    var mysql_course_new_hand = "select * from new_course where for_who like '%沒有基礎%' or for_who like '%初學%' or for_who like '%嘗試%' or  for_who like '%新手%' or  for_who like '%快速%' limit 4;"
    mysql.con.query(mysql_course_new_hand, function(err, result_course) {
        // console.log("kkkkkkk : " + JSON.stringify(result_course))
        if (err) throw err
        var test = {};
        test['data'] = result_course
        res.send(test)
    });

})



module.exports = router