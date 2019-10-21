const mysql = require('../module/db');

module.exports = {
    get_video_info: async(title, section_id, user_token, chapter_id) => {        
        try  {            
            let  mysql_course = "select * from new_course where course_title =?;"; 
            let  result_course = await mysql.sql_query(mysql_course, title);         
            let  course_id = result_course[0].course_id;            
            let  mysql_video = `select final_section.video,final_section.video_id from final_section join new_chapter on final_section.chapter_auto_id=new_chapter.chapter_auto_id and final_section.course_id=? and new_chapter.chapter_id=? and final_section.section_id=?`;            
            let  result_video = await  mysql.sql_query(mysql_video, [course_id, chapter_id, section_id])            
            let  video = result_video[0].video;            
            let  video_id = result_video[0].video_id; 
            let  mysql_video_current_time = `select video_time from course_progress join user on course_progress.user_id=user.user_id where course_progress.video_id=? and user.access_token=?;`           
            let result_video_current_time = await mysql.sql_query(mysql_video_current_time, [video_id, user_token])
            console.log("此影片面前時間 : " + JSON.stringify(result_video_current_time))
            if (result_video_current_time.length == 0)  {                    
                return ("need to registered first")            
            } 
            else {                             
                let user_vider_current_time = result_video_current_time[0].video_time;                
                let video_detail_array  = [];           
                video_detail_array.push({ video: video, user_currentTime: user_vider_current_time  })                
                let data = {};                
                data["data"] = video_detail_array;                            
                return (data)            
            } 
        } 
        catch (err) {         
            throw err        
        }    
    },
    video_percent: async(title, access_token) => {
        try {
            let profile_check_member = `SELECT user_id FROM user WHERE access_token = ? `
            let result_course = await mysql.sql_query(profile_check_member, access_token)

            let user_id = result_course[0].user_id;

            let video_time_sql = `SELECT video_time,video_duration FROM course_progress WHERE course_title=? AND user_id=? ORDER BY video_id ASC;        `
            let video_time_result = await mysql.sql_query(video_time_sql, [title, user_id])

            let progress_arr = []
            for (i = 0; i < video_time_result.length; i++) {
                let progress = (video_time_result[i].video_time / video_time_result[i].video_duration)
                if (isFinite(progress)) {
                    // isNaN(progress) ||
                    let progress_percentage = progress * 100
                    progress_arr.push(Math.round(progress_percentage));
                } else {
                    progress_arr.push("0");
                }
            }
            console.log("progress_arr : " + progress_arr)
            return (progress_arr)
        } catch (err) {
            throw err
        }
    },
    video_update: async(title, chapter_id, section_id, current_time, total_time, token) => {
        try {
            let profile_checkmember = `SELECT user_id FROM user WHERE access_token=? `
            let result_course = await mysql.sql_query(profile_checkmember, token)
            let user_id = result_course[0].user_id;

            let video_id_sql = `SELECT final_section.video_id FROM final_section join new_chapter join new_course 
            on final_section.chapter_auto_id=new_chapter.chapter_auto_id 
            and new_course.course_id=new_chapter.course_id
            and course_title = ? and chapter_id = ? and section_id = ?;`
            let video_id_result = await mysql.sql_query(video_id_sql, [title, chapter_id, section_id])
            let video_id = video_id_result[0].video_id;


            console.log(current_time)
            let complete = Math.round((current_time + 3) / total_time);
            let update_videotile_detail_sql = {
                video_time: current_time,
                video_duration: total_time,
                complete: complete,
            }
            let update_videotime =
                `UPDATE course_progress SET ?
            WHERE user_id = ?
            and video_id = ?;`
            await mysql.sql_query(update_videotime, [update_videotile_detail_sql, user_id, video_id])
            return ("update successful")
        } catch (err) {
            throw err
        }

    }
}