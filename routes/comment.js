const express = require('express')
const mysql = require('../module/db');
const app = express();
const router = express.Router();
const comment = require('../dao/comment')
    // const verification = require('../util/verification')


// 從根目錄使用router
app.use('/', router);


//insert comment in profile.done.html
router.post("/profile/done/comment", async function(req, res) {
    try {
        await comment.insert_comment(req);
        res.redirect("/profile_done.html");
    } catch (err) {
        return err
    }
})


//select comment to course.html
router.post("/course/comment", async function(req, res) {
    try {
        let course_title = req.body.course_title;
        let result_user_comment = await comment.comment_list(req, course_title);
        res.json(result_user_comment)
    } catch (err) {
        return err
    }
})


module.exports = router;