const express = require('express')
var bodyParser = require('body-parser')
    // const fs = require('fs')
const path = require('path')
const app = express();
// var mysql = require("mysql");
var multer = require('multer');
const router = express.Router();

// 從根目錄使用router
app.use('/', router);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// GET intro.html
router.get('/', (req, res) => {
    res.send('intro');
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
    var count = req.body.count;
    var classs = [];
    for (i = 0; i < count; i++) {
        var chapter_id = req.body.chapter_id[i]
        var section_id = req.body.section_id[i]
        var section_title = req.body.section_title[i]
        const video_name = req.files[i].filename
        console.log(chapter_id);
        console.log(section_id);
        console.log(section_title);
        console.log(video_name);
        classs.push({ chapter_id: chapter_id, section_id: section_id, section_title: section_title, video_name: video_name });
    }
    console.log(classs)
        // var mysql = `INSERT INTO video (course_title,course_teacher,course_intro,chapter_id,section_id,video_name) Values('${course_title}','${course_teacher}','${course_intro}','${chapter_id[i]}','${section_id[i]}','${video_name[i]}')`;
        // con.query(mysql, function(err, result1) {
        //     if (err) throw err
        //     res.send('upload video successful')
        //     console.log('successful1')
        // });
})


// router.get("/education/videoinfo", function(req, res) {
//     var array = [];
//     var test = {};
//     var mysql2 = "select * from video;";
//     con.query(mysql2, function(err, result2) {
//         if (err) throw err
//         var video = result2;
//         for (var i = 0; i < video.length; i++) {
//             var new_video = video[i].tag.split(",")
//             console.log(new_video)
//             array.push({ id: video[i].id, title: video[i].title, story: video[i].story, tags: new_video, image: video[i].image, main_video: video[i].main_video })
//         }
//         console.log(array)
//         test['data'] = array;
//         res.send(test)
//     });
// })


// app.get("/api/1.0/video", function(req, res) {
//     var name = req.query.id;
//     console.log(name)
//     var mysql3 = `select main_video from video where id =${name}`
//     con.query(mysql3, function(err, result3) {
//         if (err) throw err
//         console.log('successful3')
//         console.log(result3)
//         var name = result3[0].main_video;
//         const path = 'assets/' + name
//         console.log(path);
//         //影片的詳細資料或狀態
//         const stat = fs.statSync(path)
//         console.log("stat is " + stat)
//         const fileSize = stat.size

//         const range = req.headers.range
//         if (range) {
//             // console.log(range)
//             const parts = range.replace(/bytes=/, "").split("-")
//             const start = parseInt(parts[0], 10)
//             const end = parts[1] ?
//                 parseInt(parts[1], 10) :
//                 fileSize - 1

//             const chunksize = (end - start) + 1
//             const file = fs.createReadStream(path, { start, end })
//             const head = {
//                 'Content-Range': `bytes ${start}-${end}/${fileSize}`,
//                 'Accept-Ranges': 'bytes',
//                 'Content-Length': chunksize,
//                 'Content-Type': 'video/mp4',
//             }
//             console.log("One")
//             res.writeHead(206, head)
//             file.pipe(res)
//         } else {
//             console.log("Two")
//             const head = {
//                 'Content-Length': fileSize,
//                 'Content-Type': 'video/mp4',
//             }
//             res.writeHead(200, head)
//             fs.createReadStream(path).pipe(res)
//         }

//     })

// })

// app.listen(3000, function() {
//     console.log('Listening on port 3000!')
// })
module.exports = router;