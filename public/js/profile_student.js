//所有課程
function display_all_registered_classinfo() {
    var accessToken = localStorage.getItem("accessToken")
    console.log("accessToken" + accessToken)
    var js = document.getElementById('content')
    var xml = new XMLHttpRequest;
    xml.open('post', '/profile/student/class', true);
    xml.setRequestHeader("Authorization", "Bearer" + " " + accessToken);
    xml.send(null);
    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {
            if (xml.responseText == "error") {
                alert("please sign in first!")
                window.location.assign('./sign_in.html');
                //user icon
                var sign_li = document.createElement("li");
                var signContent = document.createTextNode("登入");
                var sign_a = document.createElement("a");
                sign_a.href = "./sign_in.html"
                sign_a.appendChild(signContent)
                sign_li.appendChild(sign_a)
                document.getElementById("clearfix").appendChild(sign_li)

            } else if (xml.responseText == "no class") {
                var all_class_h3 = document.createElement("h3");
                var all_class_Content = document.createTextNode("所有課程");
                all_class_h3.appendChild(all_class_Content)
                document.getElementById("profile_add_info").appendChild(all_class_h3)
                var noclassContent = document.createTextNode("尚未註冊任何課程哦!");
                document.getElementById("profile_add_info").appendChild(noclassContent)
                var sign_li = document.createElement("li");
                //user icon
                // var signContent = document.createTextNode("登出");
                // var sign_a = document.createElement("a");
                // sign_a.setAttribute("onClick", "log_out()");
                // sign_a.appendChild(signContent)
                // sign_li.appendChild(sign_a)
                // document.getElementById("clearfix").appendChild(sign_li)

            } else {
                var obj = JSON.parse(xml.responseText);
                console.log(obj)
                var count = obj.length;
                var all_class_h3 = document.createElement("h3");
                var all_class_Content = document.createTextNode("所有課程");
                all_class_h3.appendChild(all_class_Content);
                document.getElementById("profile_add_info").appendChild(all_class_h3)
                for (var i = 0; i < count; i++) {
                    //替換課程圖片
                    var classImg = document.createElement("img");
                    var classDiv = document.createElement("div");
                    var profileDiv = document.createElement("div");
                    var titleContent = document.createTextNode(obj[i].course_title);
                    console.log(titleContent)
                    classDiv.className = "profile_class_info";
                    profileDiv.className = "profile_info"


                    var classDiv_a = document.createElement("a");
                    classDiv_a.href = ("/video.html?title=" + obj[i].course_title + " &chapter=1&section=1&section_id=1");
                    classImg.src = "https://cad-education-project.s3-ap-northeast-1.amazonaws.com/class-video-picture/" + obj[i].main_image
                    classDiv_a.appendChild(classImg)
                    classDiv_a.appendChild(classDiv)
                    classDiv.appendChild(titleContent)
                    profileDiv.appendChild(classDiv_a)
                    document.getElementById("profile_add_info").appendChild(profileDiv)
                }
            }
        }
    }
}
display_all_registered_classinfo();