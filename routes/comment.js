const express = require('express')
const mysql = require('../module/db');
const app = express();
const router = express.Router();
const async = require('async');
const comment = require('../dao/comment')
    // const verification = require('../util/verification')


// 從根目錄使用router
app.use('/', router);


//insert comment in profile.done.html
router.post("/profile/done/comment", async function(req, res) {
    // const user_token = req.body.user_token;
    // const star_number = req.body.star_number;
    // const class_name = req.body.class_name
    // const comment = req.body.comment;
    try {
        let result_user_comment = await comment.insert_comment(req);
        console.log(req)
        res.redirect("/profile_done.html");
    } catch (err) {
        throw err
            // return err
    }
})


//select comment to course.html
router.post("/course/comment", async function(req, res) {
    try {
        let course_title = req.body.course_title;
        console.log(course_title)
        let result_user_comment = await comment.comment_list(req, course_title);
        console.log("finalllllll : " + result_user_comment)
        res.json(result_user_comment)
    } catch (err) {
        return err
    }
})


module.exports = router;