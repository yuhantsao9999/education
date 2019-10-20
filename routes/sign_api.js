const express = require("express");
const mysql = require('../module/db');
const router = express.Router();
const request = require('request');
const crypto = require('crypto');


//signup API
router.post('/user/signup', function(req, res) {

    let { name, email } = req.body;
    let pwd = req.body.password;
    // 後端初步驗證資料是否確實填寫
    if (!(name) || !(pwd) || !(email)) {
        res.send("沒有填寫全部註冊欄位");
        return;
    }
    let test = {};
    let array = [];
    let hash = crypto.createHash('sha256');
    //加密讓token會隨著時間而變
    hash.update(pwd + Date.now() + 120000);
    let token = hash.digest('hex')
        // console.log(token)
    let user = {
        access_token: token,
        access_expired: Date.now() + 12000,
        provider: "native",
        name: name,
        email: email,
    }
    return new Promise(function(resolve, reject) {
        mysql.con.getConnection(function(err, connection) {
            if (err) {
                reject("Database get connection err: " + err);
                return;
            }
            connection.beginTransaction((err) => {
                if (err) {
                    reject("Transcaction Error: " + err);
                    return;
                }
                // Check email for duplicates
                let user_email_list = `SELECT email from user where email = ?;`
                connection.query(user_email_list, email, function(err, email_list) {
                    if (err) {
                        // throw err;
                        reject("Database Query err: " + err);
                        return;
                    }
                    if (email_list.length == 0) {
                        let insert_user_info = "INSERT INTO user SET ?"
                        connection.query(insert_user_info, user, function(err, result) {
                            if (err) {
                                // throw err;
                                reject("Database Query err: " + err);
                                connection.rollback(function() {});
                                return;
                            }
                            let mysql_user_info_list = `SELECT * from user where email=?;`
                            connection.query(mysql_user_info_list, email, function(err, user_info_list) {
                                let user = user_info_list;
                                console.log(user)
                                if (err) {
                                    // throw err;
                                    reject("Database Query err: " + err);
                                    connection.rollback(function() {});
                                    return;
                                }

                                // access.push({ access_token: user[0].access_token, access_expired: user[0].access_expired })
                                array.push({ id: user[0].user_id, provider: user[0].provider, name: user[0].name, email: user[0].email });
                                test['data'] = ({ access_token: user[0].access_token, access_expired: user[0].access_expired, user: array[0] });
                                // res.json(test);
                                connection.commit(function(err) {
                                    if (err) {
                                        // throw err;
                                        reject("Database Query err: " + err);
                                        return;
                                    }
                                    resolve("successful")
                                    res.json(test);

                                });
                            });
                        });
                    } else {
                        res.send('err')
                    }
                });

            });
            connection.release();
        });
    });
});

//signin API/user/signin
router.post('/user/signin', function(req, res) {
    if (req.body.provider == "native") {
        let { email } = req.body;
        // console.log(email)
        let pwd = req.body.password;
        if (!(pwd) || !(email)) {
            res.send("沒有填寫全部登入欄位");
            return;
        }
        // console.log(name + " " + email + " " + pwd)
        let test = {};
        let array = [];
        let hash = crypto.createHash('sha256');
        hash.update(pwd + Date.now() + 12000);
        let token = hash.digest('hex')
            // console.log("this is token " + token)
        let access_expired = Date.now() + 12000
        let update_user_access_token_sql = {
            access_token: token,
            access_expired,
        }
        return new Promise(function(resolve, reject) {
            mysql.con.getConnection(function(err, connection) {
                connection.beginTransaction(async(err) => {
                    try {
                        let user_email_list = `SELECT * from user where email = ?;`
                        let user_email = await mysql.sql_query_connection(user_email_list, email, connection)
                            //  function(err, result4_1) {
                            // if (err) throw err;

                        if (user_email.length == 0) {
                            res.send("err")
                        } else {
                            let update_native_token = `UPDATE user SET ? WHERE email = ? and provider = 'native';`
                            await mysql.sql_query_connection(update_native_token, [update_user_access_token_sql, email], connection)
                            let new_user_email = await mysql.sql_query_connection(user_email_list, email, connection)
                            let access_token = new_user_email[0].access_token
                                // console.log(access_token);
                                // console.log(token)
                            if (access_token == token) {
                                array.push({ id: new_user_email[0].id, provider: new_user_email[0].provider, name: new_user_email[0].name, email: new_user_email[0].email, pricture: new_user_email[0].picture });
                                test['data'] = ({ access_token: new_user_email[0].access_token, access_expired: new_user_email[0].access_expired, user: array[0] });

                            } else {
                                res.send('"err": "Invalid token."')
                            }
                            connection.commit(function(err) {
                                if (err) {
                                    return connection.rollback(function() {
                                        res.send('"err": "Invalid token."')
                                        throw error;
                                    });
                                }
                                resolve("successful")
                                res.json(test);
                            });
                        }
                    } catch (err) {
                        throw err;
                        console.log("catch")
                        res.send('"err": "Invalid token."')
                    }
                })


            })
        })
    } else {
        // 向 FB 要求使用者名稱和ID
        let token = req.body.fb_token;
        // console.log(token)
        request('https://graph.facebook.com/me?&fields=id,name,email,picture.width(160).height(160)&access_token=' + token, (err, response, body) => {
            let profile = JSON.parse(body);
            // console.log(profile)
            let { name, email } = profile;
            let user_image = profile.picture.data.url;
            // console.log(email)
            let test = {};
            let array = [];
            let hash = crypto.createHash('sha256');
            hash.update(profile + email + Date.now() + 12000);
            let mixtoken = hash.digest('hex')
                // console.log(mixtoken)
            let fb_user = {
                access_token: mixtoken, //更換會隨著時間變動的新token
                access_expired: Date.now() + 12000,
                provider: "facebook",
                name: name,
                email: email,
                user_image: user_image,
            };
            let access_expired = Date.now() + 12000
            let fb_insert = "INSERT INTO user SET ?";
            let fb_update_user_token = `
            UPDATE user SET access_token = '${mixtoken}', access_expired = '${access_expired}'
            WHERE email = '${email}';
            `
            let fb_repeat = `
            SELECT email from user where provider = 'facebook'
            and email = '${email}';
            `
            let fb_select = `
                SELECT * from user where provider = 'facebook'
                and name = '${name}';
                `
            let fb_select_all_from_email = `
                SELECT * from user where provider = 'facebook'
                and email = '${email}';
                `
            mysql.con.query(fb_repeat, function(err, fb_repeat_result) {
                if (err) throw err;
                //若mysql內有沒有這筆臉書的emil資料，沒有則存取資料
                if (String(fb_repeat_result).length == 0) {
                    mysql.con.query(fb_insert, fb_user, function(err, fb_result) {
                        if (err) throw err;
                        // 存取後再顯示資料
                        mysql.con.query(fb_select, function(err, fb_user_info) {
                            if (err) throw err;
                            // console.log(fb_user_info)
                            let user = fb_user_info
                            array.push({ id: user[0].id, provider: user[0].provider, name: user[0].name, email: user[0].email, pricture: user[0].user_image });
                            test['data'] = ({ access_token: user[0].access_token, access_expired: user[0].access_expired, user: array[0] });
                            // console.log(test)
                            res.json(test);
                        })
                    })
                } else { //若mysql內有這筆臉書的emil資料，則update資料並直接顯示資料
                    mysql.con.query(fb_update_user_token, fb_user, function(err, fb_update) {
                        if (err) throw err;
                        mysql.con.query(fb_select_all_from_email, function(err, fb_user_info) {
                            if (err) throw err;
                            console.log("wwwwwqwwwww :" + JSON.stringify(fb_user_info))
                            let user = fb_user_info
                            array.push({ id: user[0].id, provider: user[0].provider, name: user[0].name, email: user[0].email, pricture: user[0].user_image });
                            test['data'] = ({
                                access_token: user[0].access_token,
                                access_expired: user[0].access_expired,
                                user: array[0],
                            });
                            // console.log(test)
                            res.json(test);
                        })
                    })
                }
            })

        })
    }
});

module.exports = router;