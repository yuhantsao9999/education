//middleware
let check_member_token_and_status = function (req, res, next) {
    //先判斷有是否是會員(有token)
    let token;
    if (req.headers.authorization == null) {
        // let error = {
        //     "error": "! 尚無會員token，請重新註冊。"
        // };
        return res.send('error');
    } else {
        let bearer_token = req.headers.authorization;
        if (bearer_token.substr(0, 6) != 'Bearer') {
            console.log('not a Bearerrrr token');
            return res.send('error');
        } else {
            let bearer = bearer_token.substr(0, 6);
            token = bearer_token.substr(7);
            // console.log("token : " + Token)
        }
    }
    let profile_check_member = 'SELECT user_id FROM user WHERE access_token= ?';
    mysql.pool.query(profile_check_member, token, function (err, result) {
        if (err) throw err;
        if (String(result).length == 0) {
            //如果沒有token，就傳失敗訊息
            // let error = {
            //     "error": "! 查無此會員，請重新註冊。"
            // };
            // var token = "";
            return res.send('error');
            // res.send("error")
        } else {
            req.user_id = result[0].user_id;
            next();
        }
    });
};

module.exports = check_member_token_and_status;
