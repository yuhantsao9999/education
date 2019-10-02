// user_icon
// 註冊登入或 hello 按鈕
function user_sign_icon() {
    accessToken = localStorage.getItem("accessToken")
        // console.log("accessToken" + accessToken)
    var xml_icon = new XMLHttpRequest();
    xml_icon.open("get", "/profile/getinfo", true);
    xml_icon.setRequestHeader("Authorization", "Bearer" + " " + accessToken);
    xml_icon.send(null);
    xml_icon.onreadystatechange = function() {
        if (xml_icon.readyState == 4) {
            if (xml_icon.responseText == "error") {
                //還沒登入
                var sign_li = document.createElement("li");
                var signContent = document.createTextNode("登入");
                var sign_a = document.createElement("a");
                sign_a.href = "./sign_in.html"
                sign_a.appendChild(signContent)
                sign_li.appendChild(sign_a)
                document.getElementById("clearfix").appendChild(sign_li)
            } else {
                //已登入
                var sign_li = document.createElement("li");
                var signContent = document.createTextNode("Hello!");
                var sign_a = document.createElement("a");
                sign_a.href = "./profile.html?tab=current"
                sign_a.appendChild(signContent)
                sign_li.appendChild(sign_a)
                document.getElementById("clearfix").appendChild(sign_li)
            }
        }
    }
}
user_sign_icon();