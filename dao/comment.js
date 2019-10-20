const mysql = require('../module/db');

module.exports = {
    insert_comment: async(req, err) => {
        try {
            const user_token = req.body.user_token;
            const star_number = req.body.star_number;
            const class_name = req.body.class_name
            const comment = req.body.comment;

            let comment_checkmember = `SELECT user_id FROM user WHERE access_token=?`
            let result = await mysql.sql_query(comment_checkmember, user_token)
            const user_id = result[0].user_id;
            let check_course_id = `SELECT course_id FROM new_course WHERE course_title=?`
            let result_course_id = await mysql.sql_query(check_course_id, class_name)
            let course_id = result_course_id[0].course_id;

            const dt = new Date();
            const year = dt.getFullYear();
            const month = dt.getMonth() + 1;
            const date = dt.getDate();
            const comment_date = month + "月 " + date + ", " + year
            let insert_sql = {
                user_id,
                course_id,
                star: `${star_number}`,
                comment,
                comment_date
            };
            let insert_comment = `INSERT INTO comment set ?`
            let result_insert_comment = await mysql.sql_query(insert_comment, insert_sql)

            let star_comment_number_select = `SELECT star,comment FROM comment WHERE course_id=? `
            let result_star_comment = await mysql.sql_query(star_comment_number_select, course_id)

            let star_arr = [];
            let comment_arr = [];
            for (i = 0; i < result_star_comment.length; i++) {
                star_arr.push(result_star_comment[i].star);
                if (result_star_comment[i].comment !== null && result_star_comment[i].comment !== undefined && result_star_comment[i].comment !== '') {
                    comment_arr.push(result_star_comment[i].comment)
                }
            }
            let star_sum = 0;
            for (let i = 0; i < star_arr.length; i++) {
                star_sum += star_arr[i];
            };
            let average_star = (star_sum / star_arr.length).toFixed(1)
            let star_number_amount = star_arr.length
            let comment_number = comment_arr.length
                //紀錄評論數量以及星數於頁面上
            const updateSql = {
                star_number: star_number_amount,
                average_star,
                comment_number,
            }
            let course_star_comment = `update new_course set ? where course_id=? `
            let result_course_star_comment = await mysql.sql_query(course_star_comment, [updateSql, course_id])
            return ({ status: "Success" })
        } catch (err) {
            throw err
        }
    },
    comment_list: async(req, course_title, err) => {
        try {
            let course_id_mysql = `SELECT course_id FROM new_course WHERE course_title = ?;`
            let course_id_result = await mysql.sql_query(course_id_mysql, course_title)
            let course_id = course_id_result[0].course_id;
            let user_comment = `SELECT user.name,comment.comment_date ,comment.star,comment.comment
                    FROM comment join user on comment.user_id=user.user_id 
                    WHERE comment.course_id=?;`
            let result_user_comment = await mysql.sql_query(user_comment, course_id)
            return result_user_comment
        } catch (err) {
            throw err
        }
    }
}