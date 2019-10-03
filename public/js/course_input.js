var count = 0;
var videoCount = 0; //vidoe的編號 非個數

function add_section(obj) {
    videoCount++;
    var sectionTitleDiv = document.createElement("div");
    sectionTitleDiv.className = "row-video";
    var sectionTitleContent = document.createTextNode("section title:");
    var sectionTitleP = document.createElement("p");
    sectionTitleP.appendChild(sectionTitleContent);
    sectionTitleDiv.appendChild(sectionTitleP);

    var sectionTitleInput = document.createElement("input");
    sectionTitleInput.id = "section_title"
    sectionTitleInput.type = "text";
    sectionTitleInput.name = "section_title";
    sectionTitleInput.required = true;
    sectionTitleDiv.appendChild(sectionTitleInput)

    var sectionIntroDiv = document.createElement("div");
    sectionIntroDiv.className = "row-video";
    var sectionIntroContent = document.createTextNode("section introduction:");
    var sectionIntroP = document.createElement("p");
    sectionIntroP.appendChild(sectionIntroContent);
    sectionIntroDiv.appendChild(sectionIntroP);

    var sectionIntroTextarea = document.createElement("textarea");
    sectionIntroTextarea.id = "section_intro"
    sectionIntroTextarea.style = "width:246px;height:100px;"
    sectionIntroTextarea.type = "text";
    sectionIntroTextarea.name = "section_intro";
    sectionIntroTextarea.required = true;
    sectionIntroDiv.appendChild(sectionIntroTextarea);

    var deleteSpan = document.createElement("span");
    var deleteImg = document.createElement("img");
    deleteImg.src = "../img/delete3.png"
    deleteImg.className = count
    deleteImg.setAttribute("onClick", "deleteSection(" + videoCount + ")");
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
    videoinput.required = true;
    videoDiv.appendChild(videoinput);

    var sectionMainDiv = document.createElement("div");
    sectionMainDiv.className = "section";
    sectionMainDiv.id = "section" + videoCount;

    sectionMainDiv.appendChild(sectionTitleDiv);
    sectionMainDiv.appendChild(sectionIntroDiv);
    sectionMainDiv.appendChild(videoDiv);
    sectionMainDiv.appendChild(deleteSpan);
    document.getElementById(obj).appendChild(sectionMainDiv);
    console.log(videoCount)
}

function add_chapter() {
    count++;
    // document.getElementById('count').value = count;
    var chapterMainDiv = document.createElement("div");
    chapterMainDiv.className = "chapter"
    var chapterTitleDiv = document.createElement("div");
    chapterTitleDiv.className = "row-video";
    var chapterTitleP = document.createElement("p");
    var chapter_titleContent = document.createTextNode("chapter title:");
    chapterTitleP.appendChild(chapter_titleContent);
    chapterTitleDiv.appendChild(chapterTitleP);
    var chapterTitleInput = document.createElement("input");
    chapterTitleInput.id = "chapter_title"
    chapterTitleInput.type = "text";
    chapterTitleInput.name = "chapter_title";
    chapterTitleInput.required = true;

    chapterTitleDiv.appendChild(chapterTitleInput)
    var addSectionDiv = document.createElement("div");
    addSectionDiv.className = "button"
    var addSectioninput = document.createElement("input");
    addSectioninput.value = "Add section"
    addSectioninput.type = "button"
    addSectioninput.required = true;
    addSectioninput.setAttribute("onClick", "add_section(" + count + ")");
    addSectionDiv.appendChild(addSectioninput)
    var deleteChapyerSpan = document.createElement("span");
    var deleteChapyerImg = document.createElement("img");
    deleteChapyerImg.src = "../img/delete.png"
    deleteChapyerImg.className = count
    deleteChapyerImg.setAttribute("onClick", "deleteChapter(" + count + ")");
    deleteChapyerSpan.appendChild(deleteChapyerImg);
    chapterMainDiv.appendChild(chapterTitleDiv);
    chapterMainDiv.appendChild(addSectionDiv);
    chapterMainDiv.appendChild(deleteChapyerSpan);
    var chapterVideoDiv = document.createElement("div");
    chapterVideoDiv.id = parseInt(count);
    chapterVideoDiv.appendChild(chapterMainDiv);
    document.getElementById("videoinfo").appendChild(chapterVideoDiv);
}

var deleteCount = 0
    //deleteChapter()
function deleteChapter(obj) {
    deleteCount++;
    // document.getElementById('count').value = count;
    var deleteChapter = document.getElementById(obj);
    deleteChapter.parentNode.removeChild(deleteChapter);
}
//deleteSection()
function deleteSection(obj) {
    videoCount--;
    // document.getElementById('videoCount').value = videoCount;
    var deleteId = document.getElementById("section" + obj);
    deleteId.parentNode.removeChild(deleteId);
    console.log(videoCount)
}


document.getElementById("submit").addEventListener("click", function() {
    var eachChapterSectionNumberArray = [];
    // var chapterNumber = Number(document.getElementById('count').value);
    var chapterNumber = count - deleteCount //chapter的個數
    document.getElementById('chapterNumber').value = chapterNumber;
    for (var i = 0; i < chapterNumber; i++) {
        eachChapterSectionNumberArray.push(((document.getElementsByName("chapter_title")[i]).parentNode.parentNode.parentNode.childNodes.length) - 1)
    }
    document.getElementById('each_chapter_section_num').value = eachChapterSectionNumberArray;
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