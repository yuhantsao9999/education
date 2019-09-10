var express = require("express");
var con = require('../module/db');
var app = express();
const router = express.Router();
var request = require('request');
var bodyParser = require('body-parser')
const crypto = require('crypto');


router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

// 從根目錄使用router
app.use('/', router);

// GET sign_up.html
router.get('/', (req, res) => {
    res.send('sign_up');
});


// GET sign_in.html
router.get('/', (req, res) => {
    res.send('sign_in');
});

// GET profile.html
// router.get('/', (req, res) => {
//     res.send('profile');
// });

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
    var sql = "INSERT INTO user SET ?"
    var sql2 = `SELECT * from user where email='${email}';`
    var sql3 = `SELECT email from user where email = '${email}';`
    con.query(sql3, function(err, result3) {
        if (err) throw err;
        if (result3.length == 0) {
            con.query(sql, user, function(err, result) {
                if (err) throw err;
                con.query(sql2, function(err, result2) {
                    var user = result2;
                    console.log(user)
                    if (err) throw err;
                    // access.push({ access_token: user[0].access_token, access_expired: user[0].access_expired })
                    array.push({ id: user[0].user_id, provider: user[0].provider, name: user[0].name, email: user[0].email });
                    test['data'] = ({ access_token: user[0].access_token, access_expired: user[0].access_expired, user: array[0] });
                    res.json(test);
                });
            });
        } else {
            res.send('error')
        }
    });
});

//signin API/user/signin
router.post('/user/signin', function(req, res) {
    if (req.body.provider == "native") {
        var { name, email } = req.body;
        var pwd = req.body.password;
        console.log(name + " " + email + " " + pwd)
        var test = {};
        var array = [];
        var hash = crypto.createHash('sha256');
        hash.update(pwd + Date.now() + 12000);
        var token = hash.digest('hex')
        console.log("this is token " + token)
        var access_expired = Date.now() + 12000
        var sql5 = `
            UPDATE user SET access_token = '${token}', access_expired = '${access_expired}'
            WHERE email = '${email}'
            and provider = 'native';
            `
        var mysql4 = `
            SELECT * from user where email = '${email}';
            `
        con.query(mysql4, function(err, result4_1) {
            if (err) throw err;
            console.log(result4_1)
            if (result4_1.length == 0) {
                console.log('no this member');
                console.log(req.body.email)
                res.send("error")
            } else {
                con.query(sql5, function(err, result5) {
                    if (err) throw err;
                    con.query(mysql4, function(err, result4) {
                        if (err) throw err;
                        var sign_in = result4;
                        console.log("this is email " + sign_in[0]);
                        var access_token = sign_in[0].access_token
                        console.log(access_token);
                        console.log(token)
                        if (access_token == token) {
                            array.push({ id: sign_in[0].id, provider: sign_in[0].provider, name: sign_in[0].name, email: sign_in[0].email, pricture: sign_in[0].picture });
                            test['data'] = ({ access_token: sign_in[0].access_token, access_expired: sign_in[0].access_expired, user: array[0] });
                            res.json(test);
                        } else {
                            res.send('"error": "Invalid token."')
                        }
                    });
                })

            }
        })
    } else {

        // 向 FB 要求使用者名稱和ID
        var token = req.body.fb_token;
        console.log(token)
        request('https://graph.facebook.com/v3.3/me?&fields=name,email&access_token=' + token, (error, response, body) => {
            var profile = JSON.parse(body);
            console.log(profile)
            var { name, email } = profile;
            console.log(name)
            var test = {};
            var array = [];
            var hash = crypto.createHash('sha256');
            hash.update(profile + email + Date.now() + 12000);
            var mixtoken = hash.digest('hex')
            console.log(mixtoken)
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
            con.query(fb_repeat, function(err, fb_repeat_result) {
                if (err) throw err;
                //若mysql內有沒有這筆臉書的emil資料，沒有則存取資料
                if (String(fb_repeat_result).length == 0) {
                    con.query(fb_insert, fb_user, function(err, fb_result) {
                        if (err) throw err;
                        // 存取後再顯示資料
                        con.query(fb_select, function(err, fb_result2) {
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
                    con.query(fb_update, fb_user, function(err, fb_update) {
                        if (err) throw err;
                        con.query(fb_select, function(err, fb_result2) {
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


//User Profile APIs
// router.get('/user/icon', function(req, res) {
//     var Bearer_token = String(req.headers.authorization)
//     console.log("bt : " + Bearer_token)
//     var test = {};
//     var array = [];
//     var Bearer = Bearer_token.substr(0, 6);
//     var Token = Bearer_token.substr(7, Bearer_token.length - 1);
//     console.log("tokn : " + Token)
//         //取出mysql中的token
//     var user_token = `
//             SELECT * from user where access_token = '${Token}';
//             `
//     con.query(user_token, function(err, user_token_result) {
//         if (err) throw err;
//         var profile = user_token_result;
//         console.log('token')
//         if (Bearer == 'Bearer' && profile.length != 0) {
//             array.push({
//                 id: profile[0].id,
//                 provider: profile[0].provider,
//                 name: profile[0].name,
//                 email: profile[0].email,
//                 pricture: profile[0].picture
//             });
//             console.log(array);
//             test['data'] = (array[0]);
//             res.send(test);
//         } else {
//             res.send('"error": "Invalid token."')
//         };
//     });
// });
module.exports = router;