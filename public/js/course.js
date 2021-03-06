//get內容
function display_class_info() {
    var accessToken = localStorage.getItem('accessToken');
    var urlParams = new URLSearchParams(window.location.search);
    var course_title = urlParams.get('title');
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', '/education/classinfo?title=' + course_title, true);
    xmlhttp.setRequestHeader('Authorization', 'Bearer' + ' ' + accessToken);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(xmlhttp.responseText);
            //替換課程名稱
            var titleDiv = document.createElement('div');
            var titleContent = document.createTextNode(obj.data.Course_title);
            titleDiv.appendChild(titleContent);
            document.getElementById('title').appendChild(titleDiv);

            //替換課程內容
            var contentDiv = document.createElement('div');
            var contentContent = document.createTextNode(obj.data.Course_intro);
            contentDiv.appendChild(contentContent);
            document.getElementById('course_content').appendChild(contentDiv);

            //替換課程老師
            var teacherDiv = document.createElement('div');
            var teacherContent = document.createTextNode('授課教師 : ' + obj.data.Course_teacher);
            teacherDiv.appendChild(teacherContent);
            document.getElementById('course_teacher').appendChild(teacherDiv);

            //替換星數
            // <div class="ratings">
            //                     <div class="empty-stars"></div>
            //                     <div class="full-stars" style="width:80%">
            //                   </div>
            //                 </div>
            //                 <h3 class="subtitle" id="comment_numebr">4.5 (37則評論）</h3>
            var starDiv = document.createElement('div');
            starDiv.className = 'full-stars';
            starDiv.style = 'width:' + (obj.data.average_star / 5) * 100 + '%';

            document.getElementsByClassName('ratings')[0].appendChild(starDiv);
            var average_star = String(obj.data.average_star);
            if (average_star.length < 3) {
                average_star = average_star + '.0';
            } else if (average_star == 'null') {
                average_star = '0.0';
                obj.data.star_number = '課程新上架 0';
            }
            var comment_numebrContent = document.createTextNode(average_star + ' (' + obj.data.star_number + '則評論)');

            document.getElementById('comment_numebr').appendChild(comment_numebrContent);

            //TODO:按鈕
            if (!accessToken) {
                display_buttom();
            }

            //替換章節ID
            var number = obj.data.Course_detail.length;
            for (var i = 0; i < obj.data.Course_detail.length; i++) {
                var chapterDiv = document.createElement('div');
                var rowDiv = document.createElement('div');
                var colDiv = document.createElement('div');
                rowDiv.className = 'col-2';
                colDiv.className = 'one';
                var chapterContent = document.createTextNode(i + 1);
                chapterDiv.className = 'row clearfix';

                // accessToken = localStorage.getItem("accessToken")
                if (accessToken) {
                    // 但如果token變了就gg
                    var chapterDiv_a = document.createElement('a');
                    // obj.data.Course_detail[i].Chapter_id

                    chapterDiv_a.href =
                        '/video.html?title=' + obj.data.Course_title + '&chapter=1&section=1&section_id=1';
                } else {
                    var chapterDiv_a = document.createElement('a');
                }

                colDiv.appendChild(chapterContent);
                rowDiv.appendChild(colDiv);
                chapterDiv_a.appendChild(rowDiv);
                // chapterDiv.appendChild(chapterDiv_a);
                // document.getElementById("class_chapter_section_container").appendChild(chapterDiv)

                //替換章節內容
                var chapter_title_Div = document.createElement('div');
                var chapter_row_Div = document.createElement('h3');
                var chapter_section_detail_div = document.createElement('div');

                chapter_row_Div.className = 'col-10';
                chapter_section_detail_div.className = 'chapter_section_detail';

                var chapter_title_Content = document.createTextNode(obj.data.Course_detail[i].Chapter_title);

                chapter_row_Div.appendChild(chapter_title_Content);
                chapter_section_detail_div.appendChild(chapter_row_Div);

                var section_div = document.createElement('div');
                for (var k = 0; k < obj.data.Course_detail[i].Chapter_detail.length; k++) {
                    //替換節的內容
                    var section_title_Div = document.createElement('p');
                    var section_title_Content = document.createTextNode(
                        obj.data.Course_detail[i].Chapter_detail[k].Section_title
                    );
                    // console.log(section_title_Content)

                    section_title_Div.appendChild(section_title_Content);

                    section_div.appendChild(section_title_Div);
                    chapter_section_detail_div.appendChild(section_div);
                    // console.log("testttttttt")
                }

                chapterDiv_a.appendChild(chapter_section_detail_div);
                chapterDiv.appendChild(chapterDiv_a);

                chapterDiv_a.appendChild(chapter_section_detail_div);
                document.getElementById('class_chapter_section_container').appendChild(chapterDiv);
            }
        }
    };
}
display_class_info();

function display_buttom() {
    var buttomInput = document.createElement('input');
    buttomInput.className = 'add_class';
    buttomInput.setAttribute('onClick', 'add_course()');
    buttomInput.type = 'button';
    buttomInput.id = 'add_class';
    buttomInput.value = '加入課程';
    // buttomInput.setAttribute("style", "display:block");
    // buttomInput.style.display = "block"
    buttomInput.name = '按鈕名稱';
    document.getElementById('classInfo').appendChild(buttomInput);
}

// get search course data
function search_course() {
    var keyword = document.getElementById('search').value;
    window.location.replace('./search.html?keyword=' + keyword);
}

//display none buttom
function display_add_class_buttom() {
    var xml = new XMLHttpRequest();
    var accessToken = localStorage.getItem('accessToken');
    xml.open('POST', '/user/button');
    var urlParams = new URLSearchParams(window.location.search);
    var course_title = urlParams.get('title');
    var js = {
        course_title: course_title,
    };
    console.log('ppppp');
    xml.setRequestHeader('Content-Type', 'application/json');
    xml.setRequestHeader('Authorization', 'Bearer ' + accessToken);
    xml.send(JSON.stringify(js));
    xml.onreadystatechange = function () {
        if (xml.readyState == 4) {
            var registered = xml.responseText;
            // console.log(xml.responseText)
            if (registered == 'registered' || !accessToken) {
                // alert("課程已註冊過llllllll");
                // display_buttom();
                // document.getElementById("add_class").style.display = "none";
            } else {
                //error
                // console.log("errrrrrr")
                // alert("課程尚未註冊過");
                display_buttom();

                // var buttomInput = document.createElement("input");
                // buttomInput.className = "add_class"
                // buttomInput.setAttribute("onClick", "add_course()");
                // buttomInput.type = "button"
                // buttomInput.value = "加入課程"
                // buttomInput.name = "按鈕名稱"
                // document.getElementById("classInfo").appendChild(buttomInput)
                // <input class="add_class" onclick="add_course()" type="button" value="加入課表" name="按鈕名稱">
            }
        }
    };
}
display_add_class_buttom();

//add course in user table
function add_course() {
    var accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        alert('請先登入會員');
        var url = './sign_in.html';
        window.location.assign(url);
    } else {
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open('POST', '/user/addcourse');
        var urlParams = new URLSearchParams(window.location.search);
        var course_title = urlParams.get('title');
        var js = {
            course_title: course_title,
        };
        xmlhttp.setRequestHeader('Content-Type', 'application/json');
        xmlhttp.setRequestHeader('Authorization', 'Bearer ' + accessToken);
        xmlhttp.send(JSON.stringify(js));
        xmlhttp.onload = function () {
            // console.log(xmlhttp.responseText)
            var email = xmlhttp.responseText;
            if (!email) {
                alert('請先登入會員');
                var url = './sign_in.html';
                window.location.assign(url);
            } else {
                alert('課程加入成功');
                var url = './profile_student.html';
                window.location.assign(url);
            }
        };
    }
}

//加入老師資訊
// console.log("課程標題 : " + course_title)
function display_teacher_info() {
    var urlParams = new URLSearchParams(window.location.search);
    var course_title = urlParams.get('title');
    var xml_teacher = new XMLHttpRequest();
    xml_teacher.open('post', '/course/teacher/info', true);
    //display none buttom已經宣告過了
    var course_title_obj = {
        course_title: course_title,
    };
    xml_teacher.setRequestHeader('Content-Type', 'application/json');
    xml_teacher.send(JSON.stringify(course_title_obj));
    xml_teacher.onreadystatechange = function () {
        if (xml_teacher.readyState == 4) {
            var obj = JSON.parse(xml_teacher.responseText);
            console.log('sobj : ' + JSON.stringify(obj));
            //更換老師資訊
            var teacher_name = obj[0].course_teacher;
            // console.log("teacher : " + teacher_name)
            // <div class="teacher_name"><b>關於老師 XXXX</b></div>
            var teacher_nameB = document.createElement('b');
            var teacher_nameContent = document.createTextNode('關於老師 ' + teacher_name);
            teacher_nameB.appendChild(teacher_nameContent);
            document.getElementsByClassName('teacher_name')[0].appendChild(teacher_nameB);

            //更換圖片
            //TODO:要讓使用者可以先更換圖片
            // <img src="./img/golang.png" alt="">
            var teacher_image = obj[0].user_image;
            var provider = obj[0].provider;
            var teacher_imageImg = document.createElement('img');
            if (teacher_image != null) {
                if (provider == 'facebook') {
                    teacher_imageImg.src = teacher_image;
                } else {
                    teacher_imageImg.src = 'https://d3u7d6vbm9yroa.cloudfront.net/' + teacher_image;
                }
            } else {
                teacher_imageImg.src = './img/profile.png';
            }
            document.getElementsByClassName('picture_circle')[0].appendChild(teacher_imageImg);

            //更換icon
            // <a href="#"> <img src="./img/home2.png" alt=""></a>
            // <a href="#"> <img src="./img/youtube2.png" alt=""></a>
            // <a href="#"> <img src="./img/facebook2.png" alt=""></a>
            var icon_homeA = document.createElement('a');
            var icon_homeHref = obj[0].PersonalWebsite;
            // console.log(typeof(icon_homeHref))
            if (icon_homeHref !== null && icon_homeHref !== undefined && icon_homeHref !== '') {
                icon_homeA.href = icon_homeHref;
                var icon_homeImg = document.createElement('img');
                icon_homeImg.src = './img/home2.png';
                icon_homeA.appendChild(icon_homeImg);
                document.getElementsByClassName('small_icon')[0].appendChild(icon_homeA);
            }

            var icon_facebookA = document.createElement('a');
            var icon_facebookHref = obj[0].facebookProfile;
            if (icon_facebookHref !== null && icon_facebookHref !== undefined && icon_facebookHref !== '') {
                icon_facebookA.href = 'http://www.facebook.com/' + icon_facebookHref;
                var icon_facebookImg = document.createElement('img');
                icon_facebookImg.src = './img/facebook2.png';
                icon_facebookA.appendChild(icon_facebookImg);
            }
            document.getElementsByClassName('small_icon')[0].appendChild(icon_facebookA);

            var icon_youtuebeA = document.createElement('a');
            var icon_youtuebeHref = obj[0].youtubeProfile;
            // console.log(icon_youtuebeHref)
            // console.log(typeof(icon_youtuebeHref))
            if (icon_youtuebeHref !== null && icon_youtuebeHref !== undefined && icon_youtuebeHref !== '') {
                icon_youtuebeA.href = 'http://www.youtube.com/' + icon_youtuebeHref;
                var icon_youtuebeImg = document.createElement('img');
                icon_youtuebeImg.src = './img/youtube2.png';
                icon_youtuebeA.appendChild(icon_youtuebeImg);
                document.getElementsByClassName('small_icon')[0].appendChild(icon_youtuebeA);
            }

            //更換介紹文字
            var about_meContent = document.createTextNode(obj[0].about_me);
            document.getElementsByClassName('teacher_intro')[0].appendChild(about_meContent);
        }
    };
}
display_teacher_info();

//comment
function comment() {
    var urlParams = new URLSearchParams(window.location.search);
    var course_title = urlParams.get('title');
    var xml_comment = new XMLHttpRequest();
    xml_comment.open('post', '/course/comment', true);
    var course_title_obj = {
        course_title: course_title,
    };
    xml_comment.setRequestHeader('Content-Type', 'application/json');
    xml_comment.send(JSON.stringify(course_title_obj));
    xml_comment.onreadystatechange = function () {
        if (xml_comment.readyState == 4) {
            var obj = JSON.parse(xml_comment.responseText);
            // console.log(JSON.stringify(obj))
            // console.log(obj.length)
            if (obj.length == 0) {
                var no_comment_div = document.createElement('div');
                no_comment_div.className = 'no_comment';
                var no_comment = document.createTextNode('此課程尚無任何評論。');
                no_comment_div.appendChild(no_comment);
                document.getElementsByClassName('comment')[0].appendChild(no_comment_div);
            } else {
                // console.log(obj[0])
                for (i = 0; i < obj.length; i++) {
                    var each_comment_div = document.createElement('div');
                    each_comment_div.className = 'each_comment';

                    var name_h3 = document.createElement('h3');
                    var date_p = document.createElement('p');
                    var comment_by_div = document.createElement('div');
                    comment_by_div.className = 'comment_by';
                    var name = document.createTextNode(obj[i].name);
                    var comment_date = document.createTextNode(obj[i].comment_date);

                    name_h3.appendChild(name);
                    date_p.appendChild(comment_date);
                    comment_by_div.appendChild(name_h3);
                    comment_by_div.appendChild(date_p);

                    var full_stars_div = document.createElement('div');
                    full_stars_div.className = 'full-stars';
                    full_stars_div.style = 'width:' + (obj[i].star / 5) * 100 + '%';

                    var empty_stars_div = document.createElement('div');
                    empty_stars_div.className = 'each_comment';
                    var ratings_div = document.createElement('div');
                    ratings_div.className = 'ratings';
                    var star_div = document.createElement('div');
                    star_div.className = 'star';
                    var empty_stars_div = document.createElement('div');
                    empty_stars_div.className = 'empty-stars';

                    empty_stars_div.appendChild(full_stars_div);

                    var comment_p = document.createElement('p');

                    var comment_content_div = document.createElement('div');
                    comment_content_div.className = 'comment_content';
                    var comment_content = document.createTextNode(obj[i].comment);
                    comment_p.appendChild(comment_content);

                    ratings_div.appendChild(empty_stars_div);
                    star_div.appendChild(ratings_div);
                    comment_content_div.appendChild(star_div);
                    comment_content_div.appendChild(comment_p);

                    each_comment_div.appendChild(comment_by_div);
                    each_comment_div.appendChild(comment_content_div);
                    document.getElementsByClassName('comment')[0].appendChild(each_comment_div);
                }
            }
        }
    };
}

comment();

//image_for new_hand
function display_classinfo_for_new_hand() {
    var xml_new_hand = new XMLHttpRequest();
    xml_new_hand.open('get', '/education/classinfo/for_beginner', true);
    xml_new_hand.send(null);
    xml_new_hand.onreadystatechange = function () {
        if (xml_new_hand.readyState == 4) {
            var obj = JSON.parse(xml_new_hand.responseText);
            console.log(obj);
            for (i = 0; i < obj.data.length; i++) {
                var courseImg_img = document.createElement('img');
                courseImg_img.src = 'https://d3u7d6vbm9yroa.cloudfront.net/' + obj.data[i].main_image;

                var courseImg_a = document.createElement('a');
                courseImg_a.href = '/course.html?title=' + obj.data[i].course_title;

                var courseImg_div = document.createElement('div');
                courseImg_div.className = 'col-3';

                courseImg_a.appendChild(courseImg_img);
                courseImg_div.appendChild(courseImg_a);
                document.getElementById('for_newHand').appendChild(courseImg_div);

                // <div class="col-2">
                //         <!-- <a href="">
                //             <img src="./img/go.jpg" alt="logo" /></a> -->

                //     </div>
            }
        }
    };
}
display_classinfo_for_new_hand();
