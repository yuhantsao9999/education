//版面內容
function display_table_of_course_content() {
    var urlParams = new URLSearchParams(window.location.search);
    var title = urlParams.get('title');
    var chapter = urlParams.get('chapter');
    var section = urlParams.get('section');
    // var section_id = urlParams.get('section_id');

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("get", "/education/classinfo?title=" + title, true)
    xmlhttp.send();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(xmlhttp.responseText)
            console.log(JSON.stringify(obj))
                // 課程名稱
            document.getElementsByClassName("level")[0].innerHTML = title + " > " + chapter + " > " + section;
            //下方介紹
            var about_classP = document.createElement("p");
            var about_classContent = document.createTextNode(obj.data.Course_detail[Number(chapter) - 1].Chapter_detail[Number(section) - 1].Section_intro)
            about_classP.appendChild(about_classContent)

            var for_who_p = document.createElement("p");
            var for_who_content = document.createTextNode(obj.data.For_who)
            for_who_p.appendChild(for_who_content)


            var course_teacher_content = document.createTextNode("關於講師 : " + obj.data.Course_teacher)
            document.getElementById("teacher_intro").appendChild(course_teacher_content)

            var course_teacher_intro_p = document.createElement("p");
            var course_teacher_intro_content = document.createTextNode(obj.data.Course_teacher_intro)
            course_teacher_intro_p.appendChild(course_teacher_intro_content)


            document.getElementById("section_intro").appendChild(about_classP)
            document.getElementById("for_who").appendChild(for_who_p)
            document.getElementById("teacher_intro").appendChild(course_teacher_intro_p)
                //左側列表
            var chapter_number = obj.data.Course_detail.length
            for (i = 0; i < chapter_number; i++) {
                var section_number = obj.data.Course_detail[i].Chapter_detail.length
                var chapterDiv = document.createElement("div");
                var chapterUl = document.createElement("ul");
                for (k = 0; k < section_number; k++) {

                    var sectionLi = document.createElement("li");
                    var section_a = document.createElement("a");
                    var section_div = document.createElement("div");
                    // section_a.className = "section_a"
                    var section_title = obj.data.Course_detail[i].Chapter_detail[k].Section_title
                    var sectionContent = document.createTextNode(section_title);
                    section_div.appendChild(sectionContent)
                    sectionLi.appendChild(sectionContent)
                    sectionLi.className = "scroll_section"
                        //chapter_id現在是chapter_auto_id
                    var chapter_id = obj.data.Course_detail[i].Chapter_id
                    var section_id = obj.data.Course_detail[i].Chapter_detail[k].Section_id
                    section_a.href = `./video.html?title=${title}&chapter=${chapter_id}&section=${k+1}&section_id=${section_id}`

                    section_a.appendChild(sectionLi)
                    chapterUl.appendChild(section_a)
                }
                chapterDiv.appendChild(chapterUl)
                var chapterH3 = document.createElement("h3");
                chapterH3.className = "scroll_chapter"
                var chapter_title = obj.data.Course_detail[i].Chapter_title;
                var chapterContent = document.createTextNode(chapter_title);

                chapterH3.appendChild(chapterContent)
                document.getElementById("course_menu").appendChild(chapterH3)
                document.getElementById("course_menu").appendChild(chapterDiv)
            }
        }
    }
}
display_table_of_course_content();

//新增使用者播放進度％
function display_user_video_percentage() {
    window.addEventListener("load", function() {
        var access_token = localStorage.getItem("accessToken")
        var xml_percent = new XMLHttpRequest();
        xml_percent.open("post", "/video_percent", true)
        xml_percent.setRequestHeader('Content-Type', 'application/json');
        console.log(access_token)
            //TODO:要改
        var urlParams = new URLSearchParams(window.location.search);
        var title = urlParams.get('title');
        var chapter = urlParams.get('chapter');
        var section = urlParams.get('section');
        var section_id = urlParams.get('section_id');
        var videopercent_obj = {
            title: title,
            chapter: chapter,
            section: section,
            section_id: section_id,
            access_token: access_token
        }

        xml_percent.send(JSON.stringify(videopercent_obj));
        xml_percent.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(xml_percent.responseText)
                    // console.log("wowwwwwwww : " + JSON.stringify(obj))
                for (var i = 0; i < obj.length; i++) {
                    //顯示看到％的功能
                    var section_percent = Number(obj[i])

                    console.log(typeof(section_percent))
                    if (section_percent == 100) {
                        var video_pecentImg = document.createElement("img");
                        video_pecentImg.src = "./img/check.png"
                        video_pecentImg.className = "all_done"

                        // var list = document.getElementById("myList");
                        // list.insertBefore(newItem, list.childNodes[0]);
                        document.getElementsByClassName("scroll_section")[i].appendChild(video_pecentImg)
                    } else {
                        var video_pecentDiv = document.createElement("div");
                        var video_pecentContent = document.createTextNode(obj[i] + "%");
                        console.log("每個課程進度 : " + obj[i] + "%")
                        video_pecentDiv.appendChild(video_pecentContent)
                        document.getElementsByClassName("scroll_section")[i].appendChild(video_pecentDiv)

                    }

                }
            }
        }
    })
}
display_user_video_percentage();


//新增使用者播放進度
function update_user_video_percentage() {
    accessToken = localStorage.getItem("accessToken")
    var urlParams = new URLSearchParams(window.location.search);
    var title = urlParams.get('title');
    var chapter = urlParams.get('chapter');
    var section = urlParams.get('section');
    var section_id = urlParams.get('section_id');
    var xmlhttp_video = new XMLHttpRequest();

    //TODO:
    xmlhttp_video.open("post", "/education/videoinfo", true)
    var videoinfo_obj = {
        title: title,
        chapter: chapter,
        section: section,
        section_id: section_id,
        user_token: accessToken
    }
    xmlhttp_video.setRequestHeader('Content-Type', 'application/json');
    console.log(JSON.stringify(videoinfo_obj))
    xmlhttp_video.send(JSON.stringify({
        videoinfo_obj
    }));
    xmlhttp_video.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log("oooooooooo : " + xmlhttp_video.responseText)
            if (xmlhttp_video.responseText == "no registered") {
                alert("請先註冊此課程才能觀看哦～")
                window.location.assign("./course.html?title=" + title)
            } else {
                var obj = JSON.parse(xmlhttp_video.responseText)
                console.log("obj" + JSON.stringify(obj.data))
                var video_name = obj.data[0].video;
                var video_user_currentTime = obj.data[0].user_currentTime;
                var video = document.createElement("video");
                // console.log(video_name)
                // console.log(video_user_currentTime)
                video.id = "video"
                video.controls = "controls"
                video.src = "https://d3u7d6vbm9yroa.cloudfront.net/" + video_name
                video.currentTime = video_user_currentTime;
                document.getElementById("videoDiv").appendChild(video)
            }
        }
    }
}
update_user_video_percentage();


function send_ajax() {
    var urlParams = new URLSearchParams(window.location.search);
    var title = urlParams.get('title');
    var chapter = urlParams.get('chapter');
    var section = urlParams.get('section');
    var section_id = urlParams.get('section_id');
    var video = document.getElementById("video")
    var currentTime = document.getElementById("video").currentTime;
    var totalTime = document.getElementById("video").duration;
    var js = {
        title: title,
        chapter: chapter,
        section_id: section_id,
        currentTime: currentTime,
        totalTime: totalTime,
        accessToken: localStorage.getItem("accessToken")
    }
    var xmlhttp_videotime = new XMLHttpRequest();
    xmlhttp_videotime.open("post", "/videoupdate", true)
    xmlhttp_videotime.setRequestHeader('Content-Type', 'application/json');
    xmlhttp_videotime.send(JSON.stringify(js));
}

setInterval("send_ajax()", 3000);




function up_play_speed() {
    myVid = document.getElementById("video");
    myVid.playbackRate = (myVid.playbackRate) + 0.5;
}

function down_play_speed() {
    myVid = document.getElementById("video");
    myVid.playbackRate = (myVid.playbackRate) - 0.5;
}

function getPlaySpeed() {
    myVid = document.getElementById("video");
    alert(myVid.playbackRate);
}