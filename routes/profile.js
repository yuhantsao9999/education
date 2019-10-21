const express = require("express");
const mysql = require('../module/db');
const profile = require('../dao/profile');
const router = express.Router();

// const verification = require('../util/verification')



//我修的課---profile頁面驗證會員api
router.get('/profile/student/class', async function(req, res) {
    try {
        let user_id = req.user_id;
        let result = await profile.registered_course(req, user_id)
        if (result == "no class") {
            //有token是會員，但沒有有註冊過課程
            res.send("no class")
        } else {
            res.send(result)
        }
    } catch (err) {
        return err
    }
})

//我的公開資訊--獲取目前會員資料
router.get('/profile/getinfo', async function(req, res) {
    try {
        let user_id = req.user_id;

        let profile_info_obj = await profile.get_info(user_id)
        console.log("crrecttttt")
        console.log("get info info:")
        res.json(profile_info_obj)
    } catch (err) {
        console.log("euuuuuuuuu")
        console.log(err)
        return err
    }
})


//我的公開資訊--更新會員資料
router.post('/profile/update_info', async function(req, res) {
    try {
        let user_id = req.user_id;
        let { user_name, about_me } = req.body;
        let personal_website = req.body.PersonalWebsite;
        let facebook_profile = req.body.facebookProfile;
        let youtube_profile = req.body.youtubeProfile;
        //有token是會員，儲存會員的名稱、關於自己、網站連結匯入於user table
        let update_user_sql = {
            name: user_name,
            about_me,
            PersonalWebsite: personal_website,
            facebookProfile: facebook_profile,
            youtubeProfile: youtube_profile,
        }
        let result_update_teacher_name = await profile.update_info(user_id, user_name, update_user_sql)
        res.json(result_update_teacher_name)
    } catch (err) {
        return err
    }
})


//已完成課程
router.get('/profile/done', async function(req, res) {
    //有token是會員，且有註冊過課程，提取會員課程在頁面上
    try {
        let user_id = req.user_id;
        let result = await profile.done_course(user_id)
        res.send(result)
    } catch (err) {
        return err
    }
})

//老師開的課
router.get('/profile/teacher/class', async function(req, res) {
    try {
        let user_id = req.user_id;
        let result_teacher_class = await profile.give_course(user_id)
        res.send(result_teacher_class)
    } catch (err) {
        // console.log(err)
        return err
    }
})

module.exports = router;