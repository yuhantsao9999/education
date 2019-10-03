# education
if err throw err
if err reject(new modules.Err(500,13,`query table i  user table:${email}`,function(err,result))
                                                                ${err}
命名風格ㄧ致 

token 傳的方式要改   ---->用middleware  要驗證

error message 寫好

transection





安全性問題：
1.sql injection
solution:
>mysql 改成 ?
'select * from users where user_id = ? ',user_id
'select * from users where user_id ='+comnect.escape(user_id)

2.ddos(distributed denial of service)


