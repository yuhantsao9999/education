const mysql = require('../module/db');


module.exports = {
    course_input: async(req) => {
        mysql.con.getConnection(function(err, connection) {
            connection.beginTransaction(async(error) => {
                try {
                    console.log(JSON.stringify(req.body))
                    let access_token = req.body.user_token;
                    let course_title = req.body.course_title;
                    let course_teacher_intro = req.body.course_teacher_intro;
                    let course_intro = req.body.course_intro;
                    let course_field = req.body.field;
                    let for_who = req.body.for_who;
                    let main_image = req.files.main_image[0].key;
                    let chapter_num = Number(req.body.chapter_num);


                    let mysql_user_name = `select name,user_id from user where access_token = ?`;
                    let result_user_name = await mysql.sql_query_connection(mysql_user_name, access_token, connection)
                        // console.log("11111111     :     " + result_user_name);
                    let user_name = result_user_name[0].name;
                    let user_id = result_user_name[0].user_id;

                    let insert_course_sql = {
                        course_title: `${course_title}`,
                        course_teacher: `${user_name}`,
                        course_teacher_id: `${user_id}`,
                        course_teacher_intro,
                        course_intro,
                        course_field,
                        for_who,
                        main_image,
                    }
                    let mysql_course_input = `INSERT INTO new_course SET ?`;

                    let result_course_input = await mysql.sql_query_connection(mysql_course_input, insert_course_sql, connection)
                        // console.log("22222222        ");
                    let mysql_course_id = `SELECT course_id FROM new_course WHERE course_title = ? and course_teacher = ?`;

                    let result_course = await mysql.sql_query_connection(mysql_course_id, [course_title, user_name], connection);
                    // console.log("33333333       " + JSON.stringify(result_course));
                    // console.log("33333333.222222      ");
                    let course_id = result_course[0].course_id
                    for (let i = 0; i < chapter_num; i++) {
                        let chapter_title = req.body.chapter_title[i]
                        let insert_sql = {
                            course_id,
                            chapter_id: i + 1,
                            chapter_title,
                        }
                        let mysql_chapter_input = `INSERT INTO new_chapter set ?`;
                        let result_chapter_input = await mysql.sql_query_connection(mysql_chapter_input, insert_sql, connection)
                            // console.log("33333333.33333     ");
                    }

                    let mysql_chapter_auto_id = `SELECT chapter_auto_id FROM new_chapter WHERE course_id = ?`;
                    // console.log("4444444444    " + JSON.stringify(mysql_chapter_auto_id));
                    let result_chapter_auto_id = await mysql.sql_query_connection(mysql_chapter_auto_id, course_id, connection)
                    let chapter_auto_id_arr = [];
                    for (i = 0; i < result_chapter_auto_id.length; i++) {
                        chapter_auto_id_arr.push(result_chapter_auto_id[i].chapter_auto_id)
                    }

                    //  計算section數量
                    let each_chapter_section_num = (req.body.each_chapter_section_num)
                    let each_chapter_section_num_arr = each_chapter_section_num.split(",")
                    let section_num = 0
                    for (let i = 0; i < each_chapter_section_num_arr.length; i++) {
                        section_num += Number(each_chapter_section_num_arr[i])
                    }
                    let each_video_chapter_auto_id_arr = []
                    for (let i = 0; i < each_chapter_section_num_arr.length; i++) {
                        for (let j = 0; j < each_chapter_section_num_arr[i]; j++) {
                            each_video_chapter_auto_id_arr.push(chapter_auto_id_arr[i]);
                        }
                    }


                    for (let i = 0; i < section_num; i++) {

                        let section_title = req.body.section_title[i];
                        let section_intro = req.body.section_intro[i];
                        let video = req.files.class_video[i].key;
                        let section_id = i + 1;
                        // console.log(section_title)
                        let insert_section_sql = {
                                course_id,
                                chapter_auto_id: each_video_chapter_auto_id_arr[i],
                                section_title,
                                section_id,
                                section_intro,
                                video
                            }
                            // console.log(insert_section_sql);
                        let mysql_section_input = "INSERT INTO final_section SET ?"
                            // console.log(mysql_section_input)
                        await mysql.sql_query_connection(mysql_section_input, insert_section_sql, connection, function(error) {
                            // console.log("insert  section");
                        })

                    }
                    connection.commit((error) => {
                        // console.log("oooookkkkk")
                        // resolve("ok")
                        return { status: "Success" }
                    });

                } catch (error) {
                    throw error
                }
            })
        })
    },
    course_list: async(req, error) => {
        try {
            let sql_hot_course = 'select * from new_course ORDER BY average_star DESC';
            let result_hot_course = await mysql.sql_query(sql_hot_course, error)
            let result = {};
            result['data'] = result_hot_course
            return result;
        } catch (err) {
            throw err
        }
    },
    course_for_beginner: async(req, error) => {
        try {
            let mysql_course_beginner = "select * from new_course where for_who like '%沒有基礎%' or for_who like '%初學%' or for_who like '%嘗試%' or  for_who like '%新手%' or  for_who like '%快速%' limit 4;"
            let result_beginner_course = await mysql.sql_query(mysql_course_beginner, error)
            let beginner_course = {};
            beginner_course['data'] = result_beginner_course
            return beginner_course
        } catch (err) {
            throw err
        }
    }
}