const express = require('express')
var bodyParser = require('body-parser')
var con = require('../module/db');
const path = require('path')
const app = express();
// var mysql = require("mysql");
var multer = require('multer');
const router = express.Router();
var async = require('async');

// 從根目錄使用router
app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET intro.html
router.get('/', (req, res) => {
    res.send('course_input');
});


//使用multer將影片傳到assets並幫影片命名
var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'assets')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + '.mp4')
    },
})
var upload = multer({ storage: storage })

router.use(express.static(path.join(__dirname, 'public')))


// var mixupload = upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'main_video', maxCount: 1 }]);
router.post("/education/class_introduction", upload.array("class_video"), function(req, res) {
    console.log(req.body)

    var course_title = req.body.course_title;
    var course_teacher = req.body.course_teacher;
    var course_intro = req.body.course_intro;
    var count = parseInt(req.body.count);

    async.waterfall([
        (next) => {
            var mysql_course_input = `INSERT INTO course (title,intro,teacher) Values('${course_title}','${course_intro}','${course_teacher}')`;
            con.query(mysql_course_input, function(err1, result_course_input) {
                console.log('successful_course_input')
                next(err1)
            });
        },
        (next) => {
            var mysql_course = `select course_id from course where title = '${course_title}'`;
            con.query(mysql_course, function(err2, result_course) {
                var course_id = result_course[0].course_id
                next(err2, course_id)
            });
        },
        (course_id, next) => {
            var chapter_number = req.body.chapter_id.length //計算chapter的數量
            var chapter_real_number = req.body.chapter_id[chapter_number - 1]
            var chapter_id_arr = []
            for (i = 0; i < chapter_number; i++) {
                console.log("for loop " + i)
                if ((i > 0) && (req.body.chapter_id[i] == req.body.chapter_id[i - 1])) {
                    continue;
                }
                var chapter_id = req.body.chapter_id[i]
                var chapter_title = req.body.chapter_title[i]
                chapter_id_arr.push(chapter_id)
                console.log("course id : " + course_id)
                console.log("chapter id : " + chapter_id)
                console.log("chapter title : " + chapter_title)
                var mysql_chapter_input = `INSERT INTO chapter (course_id,chapter_id,chapter_title) 
                Values('${course_id}','${chapter_id}','${chapter_title}')`;
                con.query(mysql_chapter_input, function(err3, result_chapter_input) {
                    console.log('successful_chapter_input')
                });
            }
            console.log("chapter_id_arr: " + chapter_id_arr)
            next(null, course_id, chapter_id_arr, chapter_real_number)
        },
        (course_id, chapter_id_arr, chapter_real_number, next) => {
            console.log("start~~~~")
            var video = []
            var section_id = []
            var section_title = []
            var section_intro = []
            for (var i = 0; i < chapter_real_number; i++) {
                video[i] = []
                section_id[i] = []
                section_title[i] = []
                section_intro[i] = []
            }
            for (var i = 0; i < count + 1; i++) {
                video[req.body.section_id[i] - 1].push(req.files[i].filename)
                section_id[req.body.section_id[i] - 1].push(req.body.section_id[i])
                section_title[req.body.section_id[i] - 1].push(req.body.section_title[i])
                section_intro[req.body.section_id[i] - 1].push(req.body.section_intro[i])
            }
            console.log(video)
            console.log(section_id)
            console.log(section_title)
            console.log(section_intro)
            const chapter_auto_id = []
            for (var i = 0; i < chapter_id_arr.length; i++) {
                console.log("course_id :" + course_id)
                console.log("chapter_id :" + chapter_id_arr[i])
                var mysql_chapter_id = `select chapter_auto_id from chapter where course_id='${course_id}' and chapter_id='${chapter_id_arr[i]}'`
                con.query(mysql_chapter_id, function(err4, result_chapter_auto_id) {
                    chapter_auto_id.push(result_chapter_auto_id[0].chapter_auto_id)
                    if (chapter_id_arr.length == chapter_auto_id.length) {
                        console.log("END")
                        next(null, chapter_auto_id, section_id, section_title, section_intro, video)
                    }
                });
            }
        },
        (chapter_auto_id, section_id, section_title, section_intro, video, next) => {
            console.log("chapter_auto_id : " + chapter_auto_id)
            for (var i = 0; i < video.length; i++) {
                for (var j = 0; j < video[i].length; j++) {
                    var mysql_input_section = `insert into section (chapter_auto_id,section_id,section_title,section_intro,video)
                        values ('${chapter_auto_id[i]}','${section_id[i][j]}','${section_title[i][j]}','${section_intro[i][j]}','${video[i][j]}')`
                    con.query(mysql_input_section, function(err5, result_section) {
                        if (err5)
                            throw err5
                        console.log("section success!!!")
                    })
                }
            }

            next(null)
            res.send("successful")
        }
    ], (err, rst) => {
        if (err) return err;
    });
})

module.exports = router;