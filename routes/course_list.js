const express = require('express')
const mysql = require('../module/db');
const course = require('../dao/course')
const router = express.Router();

//course detail api
router.get("/education/classinfo", async function(req, res) {
    try {
        let title = req.query.title;
        let data = await course.get_course_info(title);
        res.json(data)
    } catch (err) {
        return err
    }
})

//update course detail api
router.get("/course_update", async function(req, res) {
    try {
        const course_id = req.query.course_id;
        let data = await course.get_course_update_info(course_id);
        res.json(data)
    } catch (err) {
        throw err
    }
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