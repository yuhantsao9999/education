const express = require('express')
const mysql = require('../module/db');
const router = express.Router();
const course = require('../dao/course')


// search api 
router.get("/education/classinfo/search", async function(req, res) {
    try {
        const keyword = req.query.keyword;
        let result_search = await course.course_search(keyword);
        res.send(result_search)
    } catch {
        return err
    }
});



module.exports = router;