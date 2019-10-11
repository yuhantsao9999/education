var express = require("express");
var mysql = require('../module/db');
var app = express();
const router = express.Router();
var request = require('request');
const crypto = require('crypto');


// 從根目錄使用router
app.use('/', router);


//signup API
router.post('/user/signup', function(req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var pwd = req.body.password;
    var test = {};
    var array = [];
    var hash = crypto.createHash('sha256');
    //加密讓token會隨著時間而變
    hash.update(pwd + Date.now() + 120000);
    var token = hash.digest('hex')
        // console.log(token)
    var user = {
        access_token: token,
        access_expired: Date.now() + 12000,
        provider: "native",
        name: name,
        email: email,
    }
    return new Promise(function(resolve, reject) {
        mysql.con.getConnection(function(err, connection) {
            if (err) {
                throw err;
                reject("Database get connection err: " + err);
                return;
            }
            connection.beginTransaction((err) => {
                if (err) {
                    throw err;
                    reject("Transcaction Error: " + err);
                    return;
                }
                // Check email for duplicates
                var sql3 = `SELECT email from user where email = ?;`
                connection.query(sql3, email, function(err, result3) {
                    if (err) {
                        throw err;
                        reject("Database Query err: " + err);
                        return;
                    }
                    if (result3.length == 0) {
                        var sql = "INSERT INTO user SET ?"
                        connection.query(sql, user, function(err, result) {
                            if (err) {
                                throw err;
                                reject("Database Query err: " + err);
                                connection.rollback(function() {});
                                return;
                            }
                            var sql2 = `SELECT * from user where email=?;`
                            connection.query(sql2, email, function(err, result2) {
                                var user = result2;
                                console.log(user)
                                if (err) {
                                    throw err;
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
                                        throw err;
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
        var { name, email } = req.body;
        console.log(email)
        var pwd = req.body.password;
        // console.log(name + " " + email + " " + pwd)
        var test = {};
        var array = [];
        var hash = crypto.createHash('sha256');
        hash.update(pwd + Date.now() + 12000);
        var token = hash.digest('hex')
            // console.log("this is token " + token)
        var access_expired = Date.now() + 12000
        var update_user_access_token_sql = {
            access_token: token,
            access_expired,
        }
        return new Promise(function(resolve, reject) {
            mysql.con.getConnection(function(err, connection) {
                connection.beginTransaction(async(err) => {
                    // if (err) {
                    //     reject("Database Query err: " + erorr);
                    //     // return mysql.con.rollback(function() {});
                    //     connection.rollback(function() {
                    //         connection.release();
                    //     });
                    // }
                    try {
                        var mysql4 = `SELECT * from user where email = ?;`
                        var user_email = await mysql.sql_query_connection(mysql4, email, connection)
                            //  function(err, result4_1) {
                            // if (err) throw err;

                        if (user_email.length == 0) {
                            res.send("err")
                        } else {
                            var sql5 = `UPDATE user SET ? WHERE email = ? and provider = 'native';`
                            await mysql.sql_query_connection(sql5, [update_user_access_token_sql, email], connection)
                                // function(err, result5) {
                                // if (err) throw err;
                            var new_user_email = await mysql.sql_query_connection(mysql4, email, connection)
                                //  function(err, result4) {
                                // if (err) throw err;
                                // var sign_in = new_user_email;
                                // console.log(result4)
                                // console.log("this is email " + sign_in[0]);
                            var access_token = new_user_email[0].access_token
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
        var token = req.body.fb_token;
        console.log(token)
        request('https://graph.facebook.com/v3.3/me?&fields=name,email&access_token=' + token, (err, response, body) => {
            var profile = JSON.parse(body);
            // console.log(profile)
            var { name, email } = profile;
            // console.log(name)
            var test = {};
            var array = [];
            var hash = crypto.createHash('sha256');
            hash.update(profile + email + Date.now() + 12000);
            var mixtoken = hash.digest('hex')
                // console.log(mixtoken)
            var fb_user = {
                access_token: mixtoken, //更換會隨著時間變動的新token
                access_expired: Date.now() + 12000,
                provider: "facebook",
                name: name,
                email: email,
                picture: "https://schoolvoyage.ga/images/123498.png"
            };
            var access_expired = Date.now() + 12000
            var fb_insert = "INSERT INTO user SET ?";
            var fb_update = `
            UPDATE user SET access_token = '${mixtoken}', access_expired = '${access_expired}'
            WHERE email = '${email}';
            `
            var fb_repeat = `
            SELECT email from user where provider = 'facebook'
            and email = '${email}';
            `
            var fb_select = `
            SELECT * from user where provider = 'facebook'
            and name = '${name}';
            `
            mysql.con.query(fb_repeat, function(err, fb_repeat_result) {
                if (err) throw err;
                //若mysql內有沒有這筆臉書的emil資料，沒有則存取資料
                if (String(fb_repeat_result).length == 0) {
                    mysql.con.query(fb_insert, fb_user, function(err, fb_result) {
                        if (err) throw err;
                        // 存取後再顯示資料
                        mysql.con.query(fb_select, function(err, fb_result2) {
                            if (err) throw err;
                            // console.log(fb_result2)
                            var user = fb_result2
                            array.push({ id: user[0].id, provider: user[0].provider, name: user[0].name, email: user[0].email, pricture: user[0].picture });
                            test['data'] = ({ access_token: user[0].access_token, access_expired: user[0].access_expired, user: array[0] });
                            // console.log(test)
                            res.json(test);
                        })
                    })
                } else { //若mysql內有這筆臉書的emil資料，則update資料並直接顯示資料
                    mysql.con.query(fb_update, fb_user, function(err, fb_update) {
                        if (err) throw err;
                        mysql.con.query(fb_select, function(err, fb_result2) {
                            if (err) throw err;
                            console.log(fb_result2)
                            var user = fb_result2
                            array.push({ id: user[0].id, provider: user[0].provider, name: user[0].name, email: user[0].email, pricture: user[0].picture });
                            test['data'] = ({ access_token: user[0].access_token, access_expired: user[0].access_expired, user: array[0] });
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