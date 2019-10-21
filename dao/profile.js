const mysql = require('../module/db');

module.exports = {
    get_info: async(user_id) => {
        try {
            let profile_info = "SELECT * FROM user WHERE user_id=?";
            let result_profile_info = await mysql.sql_query(profile_info, user_id)
            let profile_info_arr = []
            let profile_info_obj = {};
            let name = result_profile_info[0].name;
            let user_image = result_profile_info[0].user_image;
            let provider = result_profile_info[0].provider;
            let about_me = result_profile_info[0].about_me;
            let personal_website = result_profile_info[0].PersonalWebsite;
            let facebook_profile = result_profile_info[0].facebookProfile;
            let youtube_profile = result_profile_info[0].youtubeProfile;
            profile_info_arr.push({ name: name, provider: provider, user_image: user_image, about_me: about_me, PersonalWebsite: personal_website, facebookProfile: facebook_profile, youtubeProfile: youtube_profile });
            profile_info_obj['info'] = profile_info_arr;
            return profile_info_obj
        } catch (err) {

            throw err
        }
    },
    update_info: async(user_id, user_name, update_user_sql) => {
        try {
            let mysql_insert_user = `UPDATE user SET ? WHERE user_id = ? `
            await mysql.sql_query(mysql_insert_user, [update_user_sql, user_id])
            let mysql_update_teacher_name = `UPDATE new_course SET course_teacher = ? WHERE course_teacher_id = ? `
            await mysql.sql_query(mysql_update_teacher_name, [user_name, user_id])
            return { status: 'Success' }
        } catch (err) {
            throw err
        }
    },
    registered_course: async(req, user_id) => {
        try {
            let profile_course_id = "SELECT course_id FROM final_section JOIN course_progress ON final_section.video_id=course_progress.video_id where course_progress.user_id = ?"
            let profile_course_id_result = await mysql.sql_query(profile_course_id, user_id)
            let course_id_arr = [];
            if (profile_course_id_result.length != 0) {
                for (let i = 0; i < profile_course_id_result.length; i++) {
                    course_id_arr.push(profile_course_id_result[i].course_id)
                }
                let course_id = course_id_arr.filter(function(element, index, arr) {
                    return arr.indexOf(element) === index;
                });
                let profile_courser_info = 'SELECT * FROM new_course where course_id in (?);'
                let result = await mysql.sql_query(profile_courser_info, [course_id])
                return result
            } else {
                //有token是會員，但沒有有註冊過課程
                return "no class"
            }
        } catch (err) {
            throw err
        }
    },
    done_course: async(user_id) => {
        try {
            let course_id_arr = [];
            let profile_course_id = 'SELECT final_section.course_id ,course_progress.course_title,course_progress.complete from final_section JOIN course_progress ON final_section.video_id = course_progress.video_id where course_progress.user_id = ? ';
            let profile_course_id_result = await mysql.sql_query(profile_course_id, user_id)
            if (profile_course_id_result.length != 0) {
                let flag = 1;
                for (let i = 0; i < profile_course_id_result.length - 1; i++) {
                    if (profile_course_id_result[i].course_id == profile_course_id_result[i + 1].course_id) {
                        flag *= (profile_course_id_result[i].complete * profile_course_id_result[i + 1].complete);
                        if (i == profile_course_id_result.length - 2 && flag) {
                            course_id_arr.push(profile_course_id_result[i].course_id)
                        }
                    } else {
                        if (flag)
                            course_id_arr.push(profile_course_id_result[i].course_id)
                        flag = 1;
                    }
                }
                if (course_id_arr.length != 0) {
                    //取出完成課程的評論，有評論過的就讓前端直接顯示comment，沒評論過的留空位null
                    let course_comment = 'SELECT comment.star,comment.comment,new_course.course_title ,new_course.main_image FROM comment RIGHT JOIN new_course ON comment.course_id = new_course.course_id and comment.user_id = ? where new_course.course_id in (?);'
                    let result_course_comment = await mysql.sql_query(course_comment, [user_id, course_id_arr])
                    return (result_course_comment)
                } else {
                    return "no done class"
                        // return ({ status: 200, error: err })
                }
            } else {
                //有token是會員，沒有註冊的課程
                return "no done class"
            }
        } catch (err) {
            throw err
        }
    },
    give_course: async(user_id) => {
        try {
            let teacher_class = `SELECT * FROM new_course WHERE course_teacher_id=?`
            let result_teacher_class = await mysql.sql_query(teacher_class, user_id)
            if (result_teacher_class.length != 0) {
                return result_teacher_class
            } else {
                //有token是會員，但沒有開設課程
                return "no set up class"
            }
        } catch (err) {
            throw error
        }
    },
}