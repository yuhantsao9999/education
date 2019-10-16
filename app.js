const express = require('express')
const app = express();
const mysql = require('./module/db');
const bodyParser = require('body-parser')


app.use(bodyParser.json({ limit: '50000mb' }));
app.use(bodyParser.urlencoded({ limit: '50000mb', extended: true }));

//可以使用名為public資料夾底下的資料
app.use(express.static('public'));

//可以使用名為uploads資料夾底下的資料
app.use(express.static('uploads'));

app.use(express.static('dao'));
app.use(express.static('util'));



//middleware
let check_member_token_and_status = function(req, res, next) {
    //先判斷有是否是會員(有token)
    let token;
    if (req.headers.authorization == null) {
        // let error = {
        //     "error": "! 尚無會員token，請重新註冊。"
        // };
        return res.send("error");
    } else {
        let bearer_token = req.headers.authorization;
        if (bearer_token.substr(0, 6) != "Bearer") {
            console.log("not a Bearerrrr token");
            return res.send("error");
        } else {
            let bearer = bearer_token.substr(0, 6);
            token = bearer_token.substr(7);
            // console.log("token : " + Token)
        }
    }
    let profile_check_member = "SELECT user_id FROM user WHERE access_token= ?"
    mysql.con.query(profile_check_member, token, function(err, result) {
        if (err) throw err;
        if (String(result).length == 0) {
            //如果沒有token，就傳失敗訊息
            // let error = {
            //     "error": "! 查無此會員，請重新註冊。"
            // };
            // var token = "";
            return res.send("error");
            // res.send("error")
        } else {
            req.user_id = result[0].user_id;
            console.log(result[0].user_id)
            next();
        }
    });
}






//使用router資料夾下的course
const course_input = require('./routes/course_input');
app.use('/', course_input);

const course_list = require('./routes/course_list');
app.use('/', course_list);

const course_search = require('./routes/course_search');
app.use('/', course_search);

const video = require('./routes/video');
app.use('/', video);

const sign_api = require('./routes/sign_api');
app.use('/', sign_api);

const comment = require('./routes/comment');
app.use('/', comment);

const course_update = require('./routes/course_update');
app.use('/', course_update);

const gray_bar = require('./routes/gray_bar');
app.use('/', gray_bar);

const course = require('./routes/course');
app.use('/', course);

const profile = require('./routes/profile');
app.use('/', check_member_token_and_status, profile);









app.get('/', (req, res) => {
    res.send('HEY!')
})

app.listen(3000), () => console.log('伺服器已經啟動在http://localhost:3000/')