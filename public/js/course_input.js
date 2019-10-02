var count = 0;
var video_count = 0; //vidoe的編號 非個數

function add_section(obj) {
    video_count++;
    var section_titleDiv = document.createElement("div");
    section_titleDiv.className = "row-video";
    var section_titleContent = document.createTextNode("section title:");
    var section_titleP = document.createElement("p");
    section_titleP.appendChild(section_titleContent);
    section_titleDiv.appendChild(section_titleP);
    var section_title_input = document.createElement("input");
    section_title_input.id = "section_title"
    section_title_input.type = "text";
    section_title_input.name = "section_title";
    section_titleDiv.appendChild(section_title_input)
    var section_introDiv = document.createElement("div");
    section_introDiv.className = "row-video";
    var section_introContent = document.createTextNode("section introduction:");
    var section_introP = document.createElement("p");
    section_introP.appendChild(section_introContent);
    section_introDiv.appendChild(section_introP);
    var section_intro_textarea = document.createElement("textarea");
    section_intro_textarea.id = "section_intro"
    section_intro_textarea.style = "width:246px;height:100px;"
    section_intro_textarea.type = "text";
    section_intro_textarea.name = "section_intro";
    section_introDiv.appendChild(section_intro_textarea)
    var deleteSpan = document.createElement("span");
    var deleteImg = document.createElement("img");
    deleteImg.src = "../img/delete3.png"
    deleteImg.className = count
    deleteImg.setAttribute("onClick", "delete_section(" + video_count + ")");
    deleteSpan.appendChild(deleteImg);
    var videoDiv = document.createElement("div");
    videoDiv.className = "row-video"
    var videomainp = document.createElement("p");
    var videoContent = document.createTextNode("video:");
    videomainp.appendChild(videoContent);
    videoDiv.appendChild(videomainp);
    var videoinput = document.createElement("input");
    videoinput.type = "file";
    videoinput.name = "class_video";
    videoDiv.appendChild(videoinput);
    var sectionmainDiv = document.createElement("div");
    sectionmainDiv.className = "section";
    sectionmainDiv.id = "section" + video_count;
    sectionmainDiv.appendChild(section_titleDiv);
    sectionmainDiv.appendChild(section_introDiv);
    sectionmainDiv.appendChild(videoDiv);
    sectionmainDiv.appendChild(deleteSpan);
    document.getElementById(obj).appendChild(sectionmainDiv);
    console.log(video_count)
}

function add_chapter() {
    count++;
    // document.getElementById('count').value = count;
    var chaptermainDiv = document.createElement("div");
    chaptermainDiv.className = "chapter"
    var chapter_titleDiv = document.createElement("div");
    chapter_titleDiv.className = "row-video";
    var chapter_titleP = document.createElement("p");
    var chapter_titleContent = document.createTextNode("chapter title:");
    chapter_titleP.appendChild(chapter_titleContent);
    chapter_titleDiv.appendChild(chapter_titleP);
    var chapter_title_input = document.createElement("input");
    chapter_title_input.id = "chapter_title"
    chapter_title_input.type = "text";
    chapter_title_input.name = "chapter_title";
    chapter_titleDiv.appendChild(chapter_title_input)
    var add_sectionDiv = document.createElement("div");
    add_sectionDiv.className = "button"
    var add_sectioninput = document.createElement("input");
    add_sectioninput.value = "Add section"
    add_sectioninput.type = "button"
    add_sectioninput.setAttribute("onClick", "add_section(" + count + ")");
    add_sectionDiv.appendChild(add_sectioninput)
    var delete_chapyerSpan = document.createElement("span");
    var delete_chapyerImg = document.createElement("img");
    delete_chapyerImg.src = "../img/delete.png"
    delete_chapyerImg.className = count
    delete_chapyerImg.setAttribute("onClick", "delete_chapter(" + count + ")");
    delete_chapyerSpan.appendChild(delete_chapyerImg);
    chaptermainDiv.appendChild(chapter_titleDiv);
    chaptermainDiv.appendChild(add_sectionDiv);
    chaptermainDiv.appendChild(delete_chapyerSpan);
    var chapter_video_Div = document.createElement("div");
    chapter_video_Div.id = parseInt(count);
    chapter_video_Div.appendChild(chaptermainDiv);
    document.getElementById("videoinfo").appendChild(chapter_video_Div);
}

var delete_count = 0
    //delete_chapter()
function delete_chapter(obj) {
    delete_count++;
    // document.getElementById('count').value = count;
    var delete_chapter = document.getElementById(obj);
    delete_chapter.parentNode.removeChild(delete_chapter);
}
//delete_section()
function delete_section(obj) {
    video_count--;
    // document.getElementById('video_count').value = video_count;
    var delete_id = document.getElementById("section" + obj);
    delete_id.parentNode.removeChild(delete_id);
    console.log(video_count)
}


document.getElementById("submit").addEventListener("click", function() {
    var each_chapter_section_num_arr = [];
    // var chapter_num = Number(document.getElementById('count').value);
    var chapter_num = count - delete_count //chapter的個數
    document.getElementById('chapter_num').value = chapter_num;
    for (var i = 0; i < chapter_num; i++) {
        each_chapter_section_num_arr.push(((document.getElementsByName("chapter_title")[i]).parentNode.parentNode.parentNode.childNodes.length) - 1)
    }
    document.getElementById('each_chapter_section_num').value = each_chapter_section_num_arr;
});

// user_icon
function check_member_sign_status() {
    var accessToken = localStorage.getItem("accessToken")
    document.getElementById("user_token").value = accessToken
    var xml_icon = new XMLHttpRequest();
    xml_icon.open("get", "/profile/getinfo", true);
    xml_icon.setRequestHeader("Authorization", "Bearer" + " " + accessToken);
    xml_icon.send(null);
    xml_icon.onreadystatechange = function() {
        if (xml_icon.readyState == 4) {
            if (xml_icon.responseText == "error") {
                //還沒登入
                // var sign_li = document.createElement("li");
                // var signContent = document.createTextNode("登入");
                // var sign_a = document.createElement("a");
                // sign_a.href = "./sign_in.html"
                // sign_a.appendChild(signContent)
                // sign_li.appendChild(sign_a)
                // document.getElementById("clearfix").appendChild(sign_li)
                alert("請先登入帳號哦!");
                window.location.assign("./sign_in.html")
            } else {
                //已登入
                var sign_li = document.createElement("li");
                var signContent = document.createTextNode("Hello!");
                var sign_a = document.createElement("a");
                sign_a.href = "./profile.html"
                sign_a.appendChild(signContent)
                sign_li.appendChild(sign_a)
                document.getElementById("clearfix").appendChild(sign_li)
            }
        }
    }
}
check_member_sign_status();