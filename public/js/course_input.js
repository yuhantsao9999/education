var count = 0;
var video_count = 0; //vidoe的編號 非個數

function add_section(obj) {
    video_count++;
    var section_title_div = document.createElement("div");
    section_title_div.className = "row-video";
    var section_title_content = document.createTextNode("section title:");
    var section_title_p = document.createElement("p");
    section_title_p.appendChild(section_title_content);
    section_title_div.appendChild(section_title_p);

    var section_title_Input = document.createElement("input");
    section_title_Input.id = "section_title"
    section_title_Input.type = "text";
    section_title_Input.name = "section_title";
    section_title_Input.required = true;
    section_title_div.appendChild(section_title_Input)

    var section_intro_div = document.createElement("div");
    section_intro_div.className = "row-video";
    var section_intro_content = document.createTextNode("section introduction:");
    var section_intro_p = document.createElement("p");
    section_intro_p.appendChild(section_intro_content);
    section_intro_div.appendChild(section_intro_p);

    var section_intro_textarea = document.createElement("textarea");
    section_intro_textarea.id = "section_intro"
    section_intro_textarea.style = "width:246px;height:100px;"
    section_intro_textarea.type = "text";
    section_intro_textarea.name = "section_intro";
    section_intro_textarea.required = true;
    section_intro_div.appendChild(section_intro_textarea);

    var delete_span = document.createElement("span");
    var delete_img = document.createElement("img");
    delete_img.src = "../img/delete3.png"
    delete_img.className = count
    delete_img.setAttribute("onClick", "delete_section(" + video_count + ")");
    delete_span.appendChild(delete_img);

    var video_div = document.createElement("div");
    video_div.className = "row-video"
    var video_main_p = document.createElement("p");
    var video_content = document.createTextNode("video:");
    video_main_p.appendChild(video_content);
    video_div.appendChild(video_main_p);

    var video_input = document.createElement("input");
    video_input.type = "file";
    video_input.name = "class_video";
    video_input.required = true;
    video_div.appendChild(video_input);

    var section_main_div = document.createElement("div");
    section_main_div.className = "section";
    section_main_div.id = "section" + video_count;

    section_main_div.appendChild(section_title_div);
    section_main_div.appendChild(section_intro_div);
    section_main_div.appendChild(video_div);
    section_main_div.appendChild(delete_span);
    document.getElementById(obj).appendChild(section_main_div);
    console.log(video_count)
}

function add_chapter() {
    count++;
    // document.getElementById('count').value = count;
    var chapter_main_div = document.createElement("div");
    chapter_main_div.className = "chapter"
    var chapter_title_div = document.createElement("div");
    chapter_title_div.className = "row-video";
    var chapter_title_p = document.createElement("p");
    var chapter_title_content = document.createTextNode("chapter title:");
    chapter_title_p.appendChild(chapter_title_content);
    chapter_title_div.appendChild(chapter_title_p);
    var chapter_title_input = document.createElement("input");
    chapter_title_input.id = "chapter_title"
    chapter_title_input.type = "text";
    chapter_title_input.name = "chapter_title";
    chapter_title_input.required = true;

    chapter_title_div.appendChild(chapter_title_input)
    var add_section_div = document.createElement("div");
    add_section_div.className = "button"
    var add_section_input = document.createElement("input");
    add_section_input.value = "Add section"
    add_section_input.type = "button"
    add_section_input.required = true;
    add_section_input.setAttribute("onClick", "add_section(" + count + ")");
    add_section_div.appendChild(add_section_input)
    var delete_chapter_span = document.createElement("span");
    var delete_chapter_img = document.createElement("img");
    delete_chapter_img.src = "../img/delete.png"
    delete_chapter_img.className = count
    delete_chapter_img.setAttribute("onClick", "delete_chapter(" + count + ")");
    delete_chapter_span.appendChild(delete_chapter_img);
    chapter_main_div.appendChild(chapter_title_div);
    chapter_main_div.appendChild(add_section_div);
    chapter_main_div.appendChild(delete_chapter_span);
    var chapter_video_div = document.createElement("div");
    chapter_video_div.id = parseInt(count);
    chapter_video_div.appendChild(chapter_main_div);
    document.getElementById("videoinfo").appendChild(chapter_video_div);
    // alert(count)
}

var deleteCount = 0
    //delete_chapter()
function delete_chapter(obj) {
    deleteCount++;
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
    // console.log(video_count)
}


function isvalid() {
    if (document.getElementsByName('section_title').length < 2) {
        alert("至少要有兩隻課程影片的內容！")
        return false;
    } else {
        var each_chapter_section_number_array = [];
        // var chapter_number = Number(document.getElementById('count').value);
        var chapter_number = count - deleteCount //chapter的個數
        document.getElementById('chapter_num').value = chapter_number;
        // alert("chapter_number : " + chapter_number)
        for (var i = 0; i < chapter_number; i++) {
            each_chapter_section_number_array.push(((document.getElementsByName("chapter_title")[i]).parentNode.parentNode.parentNode.childNodes.length) - 1)
        }
        document.getElementById('each_chapter_section_num').value = each_chapter_section_number_array;

        return true;
    }
}



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
                // var signLi = document.createElement("li");
                // var signContent = document.createTextNode("登入");
                // var signA = document.createElement("a");
                // signA.href = "./sign_in.html"
                // signA.appendChild(signContent)
                // signLi.appendChild(signA)
                // document.getElementById("clearfix").appendChild(signLi)
                alert("請先登入帳號哦!");
                window.location.assign("./sign_in.html")
            } else {
                //已登入
                var signLi = document.createElement("li");
                var signContent = document.createTextNode("Hello!");
                var signA = document.createElement("a");
                signA.href = "./profile.html"
                signA.appendChild(signContent)
                signLi.appendChild(signA)
                document.getElementById("clearfix").appendChild(signLi)
            }
        }
    }
}
check_member_sign_status();