var mysql = require('../module/db');


module.exports = {
    verify_token: (req, res, next) => {
        try {
            console.log("vvvvvvvvvveeeeeeeeerrrrrrtoken")
            let token;
            if (req.headers.authorization == null) {
                // let error = {
                //     "error": "! 尚無會員token，請重新註冊。"
                // };
                token = ""
                return token;
            } else {
                let bearer_token = req.headers.authorization;
                if (bearer_token.substr(0, 6) != "Bearer") {
                    console.log("not a Bearerrrr token");
                    return res.send("error");
                } else {
                    let bearer = bearer_token.substr(0, 6);
                    token = bearer_token.substr(7);
                    return token;
                    // console.log("token : " + Token)
                }
            }

        } catch (err) {
            throw "error";
            // return res.send("error");
        }
    },
    verify_user_id: (req, res, next) => {
        try {
            console.log("vvvvvvvvvveeeeeeeeerrrrrrtoken")
            let token;
            if (req.headers.authorization == null) {
                // let error = {
                //     "error": "! 尚無會員token，請重新註冊。"
                // };
                token = ""
                    // return token;
            } else {
                let bearer_token = req.headers.authorization;
                if (bearer_token.substr(0, 6) != "Bearer") {
                    console.log("not a Bearerrrr token");
                    // return res.send("error");
                } else {
                    let bearer = bearer_token.substr(0, 6);
                    token = bearer_token.substr(7);
                    // return token;
                    // console.log("token : " + Token)
                }
            }
            let profile_check_member = "SELECT user_id FROM user WHERE access_token= ?"
            let result = await mysql.pool.query(profile_check_member, token)

            // if (err) throw err;
            if (String(result).length == 0) {
                //如果沒有token，就傳失敗訊息
                // let error = {
                //     "error": "! 查無此會員，請重新註冊。"
                // };
                // var token = "";
                return "error";
                // res.send("error")
            } else {
                req.user_id = result[0].user_id;
                // console.log(result[0].user_id)
                next();

                // return user_id;
            }

        } catch (err) {
            throw "error";
            // return res.send("error");
        }

    },
    verifyContentType: (req, res, next) => {

        try {
            if (req.header('Content-Type') !== "application/json")
                return res.send("error");
            next()
        } catch (err) {
            return res.send("error");
        }
    }
}