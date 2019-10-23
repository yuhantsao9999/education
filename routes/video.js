const express = require('express')
const mysql = require('../module/db');
const router = express.Router();
const async = require('async');
const video = require('../dao/video')


//video.html
router.post("/education/videoinfo", async function(req, res)  {    
    try {        
        let { title, section_id, user_token } = req.body.videoinfo_obj;        
        let chapter_id = req.body.videoinfo_obj.chapter;    
        // console.log("444444")    
        let video_detail_array = await video.get_video_info(title, section_id, user_token, chapter_id)        
            // console.log("5555555"  +  JSON.stringify(video_detail_array))        
        res.send(video_detail_array)    
    } catch (err) {        
        console.log(err)        
        return  err    
    }
})

//vidoe_percent
router.post("/video_percent", async function(req, res) {
    try {
        let title = req.body.title;
        let access_token = req.body.accessToken;
        let progress_arr = await video.video_percent(title, access_token)
        res.send(progress_arr)
    } catch (err) {
        return err
    }

});


//update video length api
router.post("/videoupdate", async function(req, res) {
    try {
        let title = req.body.title;
        let chapter_id = req.body.chapter;
        let section_id = req.body.section_id;

        let current_time = req.body.currentTime;
        let total_time = req.body.totalTime;
        let token = req.body.accessToken;
        await video.video_update(title, chapter_id, section_id, current_time, total_time, token)
        res.send({ status: "successful" })
    } catch (err) {
        return err
    }


})


module.exports = router;