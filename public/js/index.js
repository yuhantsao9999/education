function display_classinfo_most_readed() {
    var xmlhttp_hot = new XMLHttpRequest();
    xmlhttp_hot.open("GET", "/education/classinfo/hot", true);
    xmlhttp_hot.send(null);
    xmlhttp_hot.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(xmlhttp_hot.responseText)
                // console.log("hotttttt :  " + JSON.stringify(obj.data[0]))

            for (var i = 0; i < 4; i++) {
                var main_image = obj.data[i].main_image;

                var hotCourse_title = document.createTextNode(obj.data[i].course_title);
                // console.log("hotCourse_title:" + JSON.stringify(hotCourse_title))
                var hotClassTitle_a = document.createElement("a");
                hotClassTitle_a.href = "/course.html?title=" + obj.data[i].course_title
                hotClassTitle_a.appendChild(hotCourse_title)

                var hotCourse_intro = document.createTextNode(obj.data[i].course_intro);
                var hotClassIntro_a = document.createElement("a");
                hotClassIntro_a.href = "/course.html?title=" + obj.data[i].course_title;
                hotClassIntro_a.appendChild(hotCourse_intro)


                var hotClassImg = document.createElement("img");
                hotClassImg.className = "class_picture";
                hotClassImg.src = "https://cad-education-project.s3-ap-northeast-1.amazonaws.com/class-video-picture/" + main_image;
                var hotClassImg_a = document.createElement("a");
                hotClassImg_a.href = "/course.html?title=" + obj.data[i].course_title
                hotClassImg_a.appendChild(hotClassImg)

                document.getElementsByClassName("col-6")[i].appendChild(hotClassImg_a);
                document.getElementsByClassName("title")[i + 1].appendChild(hotClassTitle_a);
                document.getElementsByClassName("text")[i].appendChild(hotClassIntro_a);
            }


        }
    }
}
display_classinfo_most_readed();

//course_list.js
function display_classinfo_all() {
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "/education/classinfo/all", true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(xmlhttp.responseText)
                // console.log(obj.data[0])
            for (var i = 4; i < obj.data.length; i++) {
                //替換課程圖片
                var classImg = document.createElement("img");
                var colDiv = document.createElement("div");
                var rowA = document.createElement("a");
                // var titleContent = document.createTextNode(obj.Course_title);
                classImg.className = "class_picture";
                classImg.src = "https://cad-education-project.s3-ap-northeast-1.amazonaws.com/class-video-picture/" + obj.data[i].main_image
                    // classImg.src = "./img/course5.png"
                colDiv.className = "col-3"
                rowA.className = "row clearfix"

                rowA.href = ("/course.html?title=" + obj.data[i].course_title);

                colDiv.appendChild(classImg)
                    // document.getElementById("class_container").appendChild(rowDiv)
                    //替換課程標題

                var titleh3 = document.createElement("h3");

                var star_detail_div = document.createElement("div");
                star_detail_div.className = "star_detail"

                var star_img = document.createElement("img");
                star_img.src = "./img/star2.png"
                star_img.className = "star"

                var average_star_div = document.createElement("div");
                var average_star = document.createTextNode(obj.data[i].average_star);
                var no_average_star = document.createTextNode("新課程尚無評論");
                average_star_div.className = "average_star"
                if (obj.data[i].average_star == null) {
                    average_star_div.appendChild(no_average_star)
                } else {
                    average_star_div.appendChild(average_star)
                }




                var course_teacher_div = document.createElement("div");
                course_teacher_div.className = "course_teacher"
                var course_teacher = document.createTextNode(obj.data[i].course_teacher);
                course_teacher_div.appendChild(course_teacher)


                var introP = document.createElement("p");
                var col_8Div = document.createElement("div");
                titleh3.className = "title_another"

                col_8Div.className = "col-8"

                var titleContent = document.createTextNode(obj.data[i].course_title);
                // console.log(titleContent)
                var introContent = document.createTextNode(obj.data[i].course_intro);


                titleh3.appendChild(titleContent)

                star_detail_div.appendChild(star_img)
                star_detail_div.appendChild(average_star_div)
                star_detail_div.appendChild(course_teacher_div)

                titleh3.appendChild(star_detail_div)
                introP.appendChild(introContent)
                col_8Div.appendChild(titleh3)
                col_8Div.appendChild(introP)
                rowA.appendChild(colDiv)
                rowA.appendChild(col_8Div)
                document.getElementById("class_container").appendChild(rowA)
            }
        }
    }
}
display_classinfo_all();



//image_for new_hand
function display_classinfo_for_new_hand() {
    var xml_new_hand = new XMLHttpRequest();
    xml_new_hand.open("get", "/education/classinfo/for_newHand", true);
    xml_new_hand.send(null);
    xml_new_hand.onreadystatechange = function() {
        if (xml_new_hand.readyState == 4) {
            var obj = JSON.parse(xml_new_hand.responseText)
            console.log(obj)
            for (i = 0; i < obj.data.length; i++) {
                var courseImg_img = document.createElement("img");
                courseImg_img.src = "https://cad-education-project.s3-ap-northeast-1.amazonaws.com/class-video-picture/" + obj.data[i].main_image

                var courseImg_a = document.createElement("a");
                courseImg_a.href = ("/course.html?title=" + obj.data[i].course_title);


                var courseImg_div = document.createElement("div");
                courseImg_div.className = "col-2"

                courseImg_a.appendChild(courseImg_img)
                courseImg_div.appendChild(courseImg_a)
                document.getElementById("for_newHand").appendChild(courseImg_div);

                // <div class="col-2">
                //         <!-- <a href="">
                //             <img src="./img/go.jpg" alt="logo" /></a> -->

                //     </div>
            }
        }
    }
}
display_classinfo_for_new_hand();