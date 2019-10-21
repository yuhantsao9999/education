require('dotenv').config();
const express = require('express')
const mysql = require('../module/db');
const router = express.Router();
const async = require('async');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');

//s3的帳號密碼
const { IAM_USER_KEY, IAM_USER_SECRET } = process.env;

aws.config.update({
    accessKeyId: IAM_USER_KEY,
    secretAccessKey: IAM_USER_SECRET
});
const s3 = new aws.S3();


//s3取代multer
const upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'cad-education-project/class-video-picture',
        metadata: function(req, file, cb) {
            cb(null, { fieldName: file.fieldname });
        },
        key: function(req, file, cb) {
            cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(-4))
        }
    })
})

const mixupload = upload.fields([{ name: 'main_image', maxCount: 1 }, { name: 'class_video', maxCount: 10 }]);
router.post("/course_update/insertMysql", mixupload, function(req, res) {
    // let access_token = req.body.user_token;
    let course_id = req.body.course_id;
    let chapter_title = req.body.chapter_title;
    // console.log(JSON.stringify(req.body))
    let old_image_path_arr = req.body.old_image_path_arr;
    // let chapter_num = Number(req.body.chapter_num);
    let section_title = req.body.section_title;
    let section_intro = req.body.section_intro;

    return new Promise(function(resolve, reject) {
        mysql.pool.getConnection(function(err, connection) {
            connection.beginTransaction(async(error) => {
                if (error) {
                    reject("Database Query Error: " + erorr);
                    connection.rollback(function() {
                        connection.release();
                    });
                } else {
                    async.waterfall([
                        (next) => {
                            //圖片更新
                            if (old_image_path_arr.length == 28) {
                                //沒更新
                                console.log("11111111  沒更新");
                                next(null)
                                    // res.send("(๑•̀ㅂ•́)و✧ ٩(๑•̀ω•́๑)۶")
                            } else {
                                //更新
                                console.log("22222222  更新")
                                let new_image_path = req.files.main_image[0].key
                                console.log("new_image_path: " + new_image_path)
                                console.log("course_id: " + course_id)
                                let new_image_path_sql = "update new_course set main_image = ? where course_id = ? ;"
                                mysql.pool.query(new_image_path_sql, [new_image_path, course_id], function(err1, new_image_path_result) {
                                    if (err1) {
                                        reject("Database Query Error: " + err1);
                                        return pool.rollback(function() {});
                                    }
                                    // res.send("(๑•̀ㅂ•́)و✧ ٩(๑•̀ω•́๑)۶")
                                    next(null)
                                })
                            }
                        },
                        (next) => {
                            console.log(course_id)
                            let origin_chapter_id_mysql = "SELECT chapter_auto_id FROM new_chapter where course_id = ?"
                            mysql.pool.query(origin_chapter_id_mysql, course_id, function(err2, origin_chapter_id) {
                                if (err2) throw err2;
                                let origin_chapter_id_arr = [];
                                for (i = 0; i < origin_chapter_id.length; i++) {
                                    origin_chapter_id_arr.push(origin_chapter_id[i].chapter_auto_id)
                                }
                                next(null, origin_chapter_id_arr)
                            })
                        },
                        (origin_chapter_id_arr, next) => {
                            let origin_vidoe_id_mysql = "SELECT video_id FROM final_section where course_id = ? ORDER BY section_id ASC"
                            mysql.pool.query(origin_vidoe_id_mysql, course_id, function(err7, origin_vidoe_id) {
                                if (err7) throw err7;
                                let origin_video_id_arr = [];
                                for (i = 0; i < origin_vidoe_id.length; i++) {
                                    origin_video_id_arr.push(origin_vidoe_id[i].video_id)
                                }
                                // console.log("origin_chapter_id_arr: " + origin_chapter_id_arr)
                                next(null, origin_chapter_id_arr, origin_video_id_arr)
                            })
                        },
                        (origin_chapter_id_arr, origin_video_id_arr, next) => {

                            let video_id_arr = (req.body.video_id_arr).split(",");

                            let video_id_different = diff(origin_video_id_arr, video_id_arr);

                            console.log("origin_video_id_arr: " + origin_video_id_arr)
                            console.log("video_id_arr: " + video_id_arr)
                            console.log("video_id_different: " + video_id_different)
                            if (video_id_different.length != 0) {
                                let delete_video_id_sql = "DELETE FROM final_section WHERE course_id = ? AND video_id = ? ;"
                                mysql.pool.query(delete_video_id_sql, [course_id, video_id_different[0]], function(err8, delete_video_result) {
                                    if (err8) throw err8;
                                    console.log("------------delete video id : " + video_id_different[0] + "------------")
                                })
                            }
                            next(null, origin_chapter_id_arr, video_id_arr)
                        },
                        (origin_chapter_id_arr, video_id_arr, next) => {
                            //進行chapter的更新
                            let chapter_auto_id = (req.body.chapter_auto_id_arr).split(",");
                            let auto_id_different = diff(origin_chapter_id_arr, chapter_auto_id);

                            console.log("origin_chapter_id_arr : " + origin_chapter_id_arr);
                            console.log("chapter_auto_id : " + chapter_auto_id);
                            console.log("auto_id_different : " + auto_id_different)
                            if (auto_id_different.length != 0) {
                                let delete_chapter_sql = "DELETE FROM new_chapter WHERE course_id = ? AND chapter_auto_id = ? ;"
                                mysql.pool.query(delete_chapter_sql, [course_id, auto_id_different[0]], function(err4, delete_chapter_result) {
                                    if (err4) throw err4;
                                    console.log("delete")
                                })
                            }


                            for (i = 0; i < chapter_auto_id.length; i++) {
                                // console.log("內容 : " + chapter_auto_id[i] + "  haha型態 : " + typeof(chapter_auto_id[i]))
                                if (chapter_auto_id[i] == "") {
                                    // console.log("course_id:  " + course_id)
                                    let insert_sql = {
                                        chapter_title: chapter_title[i],
                                        chapter_id: i + 1,
                                        course_id: course_id,
                                    }
                                    let insert_chapter_sql = "INSERT INTO new_chapter SET ?"
                                    mysql.pool.query(insert_chapter_sql, insert_sql, function(err2, insert_chapter_result) {
                                        if (err2) throw err2;
                                        console.log("inserttttttt")
                                    })
                                } else {
                                    let update_sql_detail = {
                                        chapter_title: chapter_title[i],
                                        chapter_id: i + 1,
                                    }
                                    let update_chapter_sql = "UPDATE new_chapter SET ? WHERE course_id = ? AND chapter_auto_id = ?;"
                                    mysql.pool.query(update_chapter_sql, [update_sql_detail, course_id, chapter_auto_id[i]], function(err3, update_chapter_result) {
                                        if (err3) throw err3;
                                        console.log("updateeeeeee new_chapter")
                                    })
                                }
                            }
                            next(null, video_id_arr)
                        },
                        (video_id_arr, next) => {
                            let updte_chapter_id_mysql = "SELECT chapter_auto_id FROM new_chapter where course_id = ?"
                            mysql.pool.query(updte_chapter_id_mysql, course_id, function(err2, update_chapter_id) {
                                if (err2) throw err2;
                                let update_chapter_id_arr = [];
                                console.log("update_chapter_id : " + JSON.stringify(update_chapter_id))
                                for (i = 0; i < update_chapter_id.length; i++) {
                                    update_chapter_id_arr.push(update_chapter_id[i].chapter_auto_id)
                                }
                                console.log("update_chapter_id_arr: " + update_chapter_id_arr)
                                next(null, update_chapter_id_arr, video_id_arr)
                            })
                        },
                        (update_chapter_id_arr, video_id_arr, next) => {
                            let each_chapter_section_num = (req.body.each_chapter_section_num).split(",");
                            console.log("update_chapter_id_arr: " + update_chapter_id_arr)
                            console.log("each_chapter_section_num: " + each_chapter_section_num)
                                // let chapter_auto_id = (req.body.chapter_auto_id_arr).split(",");
                            let m = 0;

                            for (let i = 0, k = 0; i < update_chapter_id_arr.length; i++) {
                                for (let j = 0; j < each_chapter_section_num[i]; j++) {
                                    if (video_id_arr[k] == "") {
                                        let new_video_name = req.files.class_video[m].key
                                        console.log("-----------------------insert new video--------------------------")
                                        console.log("section_intro : " + section_intro[k] + " belong to update_chapter_id_arr " + update_chapter_id_arr[i]);
                                        console.log("new_video_name " + req.files.class_video[m].key);

                                        let insert_sql = {
                                            course_id,
                                            chapter_auto_id: update_chapter_id_arr[i],
                                            section_id: k + 1,
                                            section_title: section_title[k],
                                            section_intro: section_intro[k++],
                                            video: new_video_name,
                                        }
                                        let insert_section_id_mysql = "INSERT INTO final_section SET ? ;"
                                        mysql.pool.query(insert_section_id_mysql, insert_sql, function(err5, insert_section_id) {
                                            if (err5) throw err5;
                                        })
                                        m++;
                                    } else {
                                        let each_video_src = (req.body.each_video_src).split(",");
                                        if (each_video_src[k].length == "") {
                                            let new_video_name = req.files.class_video[m].key
                                            console.log("-----------------------upadte video--------------------------")
                                            console.log("section_intro : " + section_intro[k] + " belong to update_chapter_id_arr " + update_chapter_id_arr[i]);
                                            console.log("video_name " + each_video_src[k]);
                                            console.log("new_video_name " + req.files.class_video[m].key);
                                            let update_sql = {
                                                course_id,
                                                chapter_auto_id: update_chapter_id_arr[i],
                                                section_id: k + 1,
                                                section_title: section_title[k],
                                                section_intro: section_intro[k],
                                                video: new_video_name,
                                            }

                                            let update_section_sql = "UPDATE final_section SET ? WHERE video_id= ? "
                                            mysql.pool.query(update_section_sql, [update_sql, video_id_arr[k]], function(err3, update_section_result) {
                                                if (err3) throw err3;
                                                console.log("updateeeeeee video")
                                            })
                                            k++;
                                            m++;
                                        } else {
                                            console.log("-----------------------update but not video--------------------------")
                                            console.log("section_intro : " + section_intro[k] + " belong to update_chapter_id_arr " + update_chapter_id_arr[i]);
                                            console.log("video_name " + each_video_src[k]);
                                            let update_section_detail = {
                                                course_id,
                                                chapter_auto_id: update_chapter_id_arr[i],
                                                section_id: k + 1,
                                                section_title: section_title[k],
                                                section_intro: section_intro[k],
                                                video: each_video_src[k]
                                            }
                                            let update_section_sql = "UPDATE final_section SET ? WHERE  video_id=?;"
                                            mysql.pool.query(update_section_sql, [update_section_detail, video_id_arr[k]], function(err3, update_section_result) {
                                                if (err3) throw err3;
                                                console.log("updateeeeeee section")
                                            })
                                            k++;
                                        }

                                    }
                                }
                            }
                            next(null)
                        },
                        (next) => {
                            let course_title_sql = "SELECT course_title FROM new_course where course_id = ?"
                            mysql.pool.query(course_title_sql, course_id, function(err2, course_title_result) {
                                if (err2) throw err2;
                                let course_title = course_title_result[0].course_title;
                                console.log(course_title)
                                    // pool.commit((error) => {
                                    //     if (error) {
                                    //         reject("Database Query Error");
                                    //         return;
                                    //     }
                                    // res.redirect("/course.html?title=" + course_title)
                                    // })
                                next(null, course_title)
                            })

                        },
                        (course_title, next) => {
                            connection.commit((error) => {
                                if (error) {
                                    reject("Database Query Error: " + error);
                                    connection.rollback(function() {
                                        connection.release();
                                    });
                                }
                                res.redirect("/course.html?title=" + course_title)
                            })
                        },
                    ], (err, rst) => {
                        if (err) return err;
                    });

                }
            })
        })

    })
})


//取差集
function diff(array1, array2) {
    let tmp = [];
    let flag;
    for (let i = 0; i < array1.length; i++) {
        flag = true
        for (let j = 0; j < array2.length; j++) {
            if (array1[i] == array2[j] || array1[i] == "undefined" || array1[i] == null) {
                flag = false;
            }
        }
        if (flag) {
            tmp.push(array1[i]);
        }
    }

    return tmp;
}

module.exports = router;