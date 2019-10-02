//get teacher_class
function display_teacherinfo() {
    const accessToken = localStorage.getItem("accessToken")
        // console.log("accessToken" + accessToken)
    var xml = new XMLHttpRequest;
    xml.open('get', '/profile/teacher/class', true);
    xml.setRequestHeader("Authorization", "Bearer" + " " + accessToken);
    xml.send(null);
    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {
            var teacher_class_h3 = document.createElement("h3");
            var teacher_class_Content = document.createTextNode("我開的課");
            teacher_class_h3.appendChild(teacher_class_Content)
            document.getElementById("profile_add_info").appendChild(teacher_class_h3)
            if (xml.responseText == "no set up class") {
                var noSetUpClassContent = document.createTextNode("尚未開設任何課程哦!");
                document.getElementById("profile_add_info").appendChild(noSetUpClassContent);
            } else {
                var obj = JSON.parse(xml.responseText);
                console.log(obj)
                    // <div class="profile_info"> profileDiv
                    //         <a href="#">classImg_a
                    //             <img src="./img/3.png" alt="">classImg
                    //         </a>
                    //         <div>classDiv_a_div
                    //             <a href="#">classDiv_a
                    //                 <div class="profile_class_info">testtest</div>classDiv
                    //             </a>
                    //          <input type="button" value="編輯課程" class="profile_info_button">

                //         </div>
                // </div>

                for (var i = 0; i < obj.length; i++) {
                    //替換課程圖片
                    var classImg = document.createElement("img");
                    classImg.src = "https://cad-education-project.s3-ap-northeast-1.amazonaws.com/class-video-picture/" + obj[i].main_image
                    var classDiv = document.createElement("div");
                    var profileDiv = document.createElement("div");
                    var titleContent = document.createTextNode(obj[i].course_title);
                    console.log(titleContent)
                    classDiv.className = "profile_class_info";
                    profileDiv.className = "profile_info"

                    var classImg_a = document.createElement("a");
                    classImg_a.href = ("course.html?title=" + obj[i].course_title)
                    var classDiv_a = document.createElement("a");
                    classDiv_a.href = ("course.html?title=" + obj[i].course_title)

                    classImg_a.appendChild(classImg)

                    classDiv_a.appendChild(classDiv)
                    classDiv.appendChild(titleContent)


                    var classDiv_a_div = document.createElement("div");
                    var button_input = document.createElement("input");
                    button_input.type = "button"
                    button_input.setAttribute("onClick", "edit_course(" + obj[i].course_id + ")");
                    button_input.value = "編輯課程"
                    button_input.className = "profile_info_button"

                    classDiv_a_div.appendChild(classDiv_a)
                    classDiv_a_div.appendChild(button_input)
                    profileDiv.appendChild(classImg_a)
                    profileDiv.appendChild(classDiv_a_div)

                    document.getElementById("profile_add_info").appendChild(profileDiv)
                }
            }
        }
    }
}
display_teacherinfo();