# education
錯誤處理 error message 寫好
if err throw err （Ｘ）
if err reject(new modules.Err(500,13,`query table i  user table:${email}`,function(err,result))
                                                                ${err}

                                                                
命名風格ㄧ致 剩下前端的js不一致 OK

token 傳的方式要改 
1.token檢驗  OK
2.用middleware  //TODO:


token要過時間就換掉



transection
ex.會員的檢查與新增

sign_api還需要改fb的部分

外鍵的設定 OK



安全性問題：
1.sql injection    OK
solution:
>mysql 改成 ?
'select * from users where user_id = ? ',user_id
'select * from users where user_id ='+comnect.escape(user_id)

2.ddos(distributed denial of service)


RASful api
新增 post
取得 get
更新 put 
刪除 delete



履歷 
從左對齊
cowork 是在stylish >> 時序 ＋跟特別的 非時程表
比例配置
想被問的放前面
不用內推
換頁標題再打一次
by git flow

npm install jest
readme