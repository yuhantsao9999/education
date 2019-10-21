const express = require('express')
const mysql = require('../module/db');
const course = require('../dao/course')
const router = express.Router();

//course detail api
router.get("/education/classinfo", function(req, res) {
    let title = req.query.title;
    let mysql_course = `select * from new_course where course_title=?`;
    mysql.pool.query(mysql_course, title, function(err, result_course) {
        if (err) throw err
            //所有課程資訊
        let course_id = result_course[0].course_id;
        //以chapter id做排序大到小
        let mysql_chapter = `select * from new_chapter where course_id=? ORDER BY chapter_id ASC`;
        mysql.pool.query(mysql_chapter, course_id, function(err, result_chapter) {
            if (err) throw err
                // console.log(result_chapter) //所有章節資訊
            let mysql_section = `select * from final_section where course_id=? ORDER BY section_id ASC`;
            mysql.pool.query(mysql_section, course_id, function(err, result_section) {
                if (err) return err
                let obj = {};
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
                for (let i = 0; i < result_chapter.length; i++) {
                    const chp_obj = {}
                    chp_obj['Chapter_id'] = result_chapter[i].chapter_id
                    chp_obj['Chapter_auto_id'] = result_chapter[i].chapter_auto_id
                    chp_obj['Chapter_title'] = result_chapter[i].chapter_title
                    chp_obj['Chapter_detail'] = []
                    for (let j = 0; j < result_section.length; j++) {
                        if (result_section[j].chapter_auto_id == chp_obj['Chapter_auto_id']) {
                            const obj_tmp = {}
                            obj_tmp['Section_id'] = result_section[j].section_id
                            obj_tmp['Section_title'] = result_section[j].section_title
                            obj_tmp['Section_intro'] = result_section[j].section_intro
                            obj_tmp['Video'] = result_section[j].video
                            chp_obj['Chapter_detail'].push(obj_tmp)
                        }
                    }
                    obj["Course_detail"].push(chp_obj)
                }
                let test = {};
                test["data"] = obj
                    // console.log("testtttttt : " + JSON.stringify(test))
                res.send(test)
            });
        });
    });
})

//update course detail api
router.get("/course_update", function(req, res) {
    const course_id = req.query.course_id;
    let mysql_course = `select * from new_course where course_id=?`;
    mysql.pool.query(mysql_course, course_id, function(err, result_course) {
        if (err) throw err
            //以chapter id做排序大到小
        let mysql_chapter = `select * from new_chapter where course_id=? ORDER BY chapter_id ASC`;
        mysql.pool.query(mysql_chapter, course_id, function(err, result_chapter) {
            if (err) throw err
                //所有章節資訊
            let mysql_section = `select * from final_section where course_id=? ORDER BY section_id ASC`;
            mysql.pool.query(mysql_section, course_id, function(err, result_section) {
                if (err) return err
                let obj = {};
                obj['Course_id'] = result_course[0].course_id; //添加名稱
                obj['Course_title'] = result_course[0].course_title;
                obj['main_image'] = result_course[0].main_image;
                obj['Course_intro'] = result_course[0].course_intro;
                obj['Course_teacher'] = result_course[0].course_teacher;
                obj['Course_teacher_intro'] = result_course[0].course_teacher_intro;
                obj['For_who'] = result_course[0].for_who;
                obj['star_number'] = result_course[0].star_number;
                obj['average_star'] = result_course[0].average_star;
                obj['comment_number'] = result_course[0].comment_number;
                obj["Course_detail"] = []
                for (let i = 0; i < result_chapter.length; i++) {
                    const chp_obj = {}
                    chp_obj['Chapter_id'] = result_chapter[i].chapter_id
                    chp_obj['Chapter_auto_id'] = result_chapter[i].chapter_auto_id
                    chp_obj['Chapter_title'] = result_chapter[i].chapter_title
                    chp_obj['Chapter_detail'] = []
                    for (let j = 0; j < result_section.length; j++) {
                        if (result_section[j].chapter_auto_id == chp_obj['Chapter_auto_id']) {
                            const obj_tmp = {}
                            obj_tmp['Section_id'] = result_section[j].section_id
                            obj_tmp['Section_title'] = result_section[j].section_title
                            obj_tmp['Section_intro'] = result_section[j].section_intro
                            obj_tmp['Video'] = result_section[j].video
                            chp_obj['Chapter_detail'].push(obj_tmp)
                        }
                    }
                    obj["Course_detail"].push(chp_obj)
                }
                let test = {};
                test["data"] = obj
                res.send(test)
            });
        });
    });
})

//course api for all
router.get("/education/classinfo/all", async function(req, res) {
    try {
        let result = await course.course_list(req);
        res.json(result)
    } catch (err) {
        return err
    }
})




//course api for beginner
router.get("/education/classinfo/for_beginner", async function(req, res) {
    try {
        let result = await course.course_for_beginner(req);
        res.json(result)
    } catch (err) {
        return err
    }
})



module.exports = router