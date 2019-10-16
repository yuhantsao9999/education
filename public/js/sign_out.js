function sign_out_icon() {
    var sign_li = document.createElement("li");
    var signContent = document.createTextNode("登出");
    var sign_a = document.createElement("a");
    // sign_a.setAttribute("onClick", "sign_out()");
    sign_a.setAttribute("onClick", "FB_logout(); ");
    sign_a.appendChild(signContent)
    sign_li.appendChild(sign_a)
    document.getElementById("clearfix").appendChild(sign_li)
}
sign_out_icon();
//log out
function sign_out() {
    localStorage.removeItem('accessToken');
    alert("帳號登出囉!")
    window.location.replace("./sign_in.html");
}

function FB_logout() {
    window.location.reload()
    alert("帳號登出囉!")
    window.location.replace("./sign_in.html");
}