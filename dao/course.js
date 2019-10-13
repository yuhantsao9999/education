const express = require('express')
var mysql = require('../module/db');


module.exports = {
    course_input: async(req) => {
        return new Promise(function(resolve, reject) {
            mysql.con.getConnection(function(err, connection) {
                connection.beginTransaction(async(error) => {
                    try {
                        console.log(JSON.stringify(req.body))
                        var access_token = req.body.user_token;
                        var course_title = req.body.course_title;
                        var course_teacher_intro = req.body.course_teacher_intro;
                        var course_intro = req.body.course_intro;
                        var course_field = req.body.field;
                        var for_who = req.body.for_who;
                        var main_image = req.files.main_image[0].key;
                        var chapter_num = Number(req.body.chapter_num);


                        var mysql_user_name = `select name,user_id from user where access_token = ?`;
                        var result_user_name = await mysql.sql_query_connection(mysql_user_name, access_token, connection)
                        console.log("11111111     :     " + result_user_name);
                        var user_name = result_user_name[0].name;
                        var user_id = result_user_name[0].user_id;

                        var insert_course_sql = {
                            course_title: `${course_title}`,
                            course_teacher: `${user_name}`,
                            course_teacher_id: `${user_id}`,
                            course_teacher_intro,
                            course_intro,
                            course_field,
                            for_who,
                            main_image,
                        }
                        var mysql_course_input = `INSERT INTO new_course SET ?`;

                        var result_course_input = await mysql.sql_query_connection(mysql_course_input, insert_course_sql, connection)
                        console.log("22222222        ");


                        var mysql_course_id = `SELECT course_id FROM new_course WHERE course_title = ? and course_teacher = ?`;

                        var result_course = await mysql.sql_query_connection(mysql_course_id, [course_title, user_name], connection);
                        console.log("33333333       " + JSON.stringify(result_course));
                        console.log("33333333.222222      ");
                        var course_id = result_course[0].course_id
                        for (var i = 0; i < chapter_num; i++) {
                            var chapter_title = req.body.chapter_title[i]
                            var insert_sql = {
                                course_id,
                                chapter_id: i + 1,
                                chapter_title,
                            }
                            var mysql_chapter_input = `INSERT INTO new_chapter set ?`;
                            var result_chapter_input = await mysql.sql_query_connection(mysql_chapter_input, insert_sql, connection)
                            console.log("33333333.33333     ");
                        }

                        var mysql_chapter_auto_id = `SELECT chapter_auto_id FROM new_chapter WHERE course_id = ?`;
                        console.log("4444444444    " + JSON.stringify(mysql_chapter_auto_id));
                        var result_chapter_auto_id = await mysql.sql_query_connection(mysql_chapter_auto_id, course_id, connection)
                        var chapter_auto_id_arr = [];
                        for (i = 0; i < result_chapter_auto_id.length; i++) {
                            chapter_auto_id_arr.push(result_chapter_auto_id[i].chapter_auto_id)
                        }

                        //  計算section數量
                        var each_chapter_section_num = (req.body.each_chapter_section_num)
                        var each_chapter_section_num_arr = each_chapter_section_num.split(",")
                        var section_num = 0
                        for (var i = 0; i < each_chapter_section_num_arr.length; i++) {
                            section_num += Number(each_chapter_section_num_arr[i])
                        }
                        // console.log("各個chapter的section數量 : " + each_chapter_section_num_arr) //1,2
                        // console.log("section總數目 : " + section_num) //3
                        // console.log("auto_id arr : " + chapter_auto_id_arr) //7,8


                        var each_video_chapter_auto_id_arr = []
                        for (var i = 0; i < each_chapter_section_num_arr.length; i++) {
                            for (var j = 0; j < each_chapter_section_num_arr[i]; j++) {
                                each_video_chapter_auto_id_arr.push(chapter_auto_id_arr[i]);
                            }
                        }


                        for (var i = 0; i < section_num; i++) {

                            var section_title = req.body.section_title[i];
                            var section_intro = req.body.section_intro[i];
                            var video = req.files.class_video[i].key;
                            var section_id = i + 1;
                            console.log(section_title)
                            var insert_section_sql = {
                                    course_id,
                                    chapter_auto_id: each_video_chapter_auto_id_arr[i],
                                    section_title,
                                    section_id,
                                    section_intro,
                                    video
                                }
                                // console.log(insert_section_sql);
                            var mysql_section_input = "INSERT INTO final_section SET ?"
                                // console.log(mysql_section_input)
                            await mysql.sql_query_connection(mysql_section_input, insert_section_sql, connection, function(error) {
                                console.log("insert  section");
                            })

                        }
                        connection.commit((error) => {
                            console.log("oooookkkkk")
                            resolve("ok")
                        });

                    } catch (error) {
                        reject("error" + error)
                    }
                })
            })
        })
    },
    course_hot: async(req) => {
        return new Promise(function(resolve, reject) {
            try {
                var sql_hot_course = 'select * from new_course ORDER BY average_star DESC';
                mysql.con.query(sql_hot_course, function(err, result_hot_course) {
                    if (err) throw err
                    var test = {};
                    test['data'] = result_hot_course
                    resolve(test)
                });
            } catch (err) {
                reject("err")
            }
        })

    }
}