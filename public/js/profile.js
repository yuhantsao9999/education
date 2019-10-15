function display_profile_user_info() {
    var accessToken = localStorage.getItem("accessToken")
        //公開資料獲取目前資料
    var xml_profileInfo = new XMLHttpRequest;
    xml_profileInfo.open('get', '/profile/getinfo', true);
    xml_profileInfo.setRequestHeader("Authorization", "Bearer" + " " + accessToken);
    xml_profileInfo.send(null);
    xml_profileInfo.onreadystatechange = function() {
        if (xml_profileInfo.readyState == 4) {
            var profile_info_obj = JSON.parse(xml_profileInfo.responseText);
            console.log("profiletestttttt : " + JSON.stringify(profile_info_obj))
                //user名稱
            var nameInput = document.createElement("input")
            nameInput.type = "text";
            nameInput.className = "name";
            nameInput.value = (profile_info_obj.info[0].name);
            document.getElementById("name").appendChild(nameInput);


            //更換圖片
            //TODO:換圖片
            // <img src="./img/pen.png" alt="">
            // <input type="image" src="" alt="send" name="user_picture" id="user_picture" onclick="send();" />
            var userPictureInput = document.createElement("input");
            userPictureInput.type = "image";
            userPictureInput.className = "user_picture"
            userPictureInput.name = "user_picture"
            userPictureInput.setAttribute("onclick", "updateUserImage()");
            var userPicturePath = profile_info_obj.info[0].user_image
            console.log(profile_info_obj.info[0].provider)
            console.log(userPicturePath)
            if (userPicturePath !== null) {
                if (profile_info_obj.info[0].provider == "facebook") {
                    userPictureInput.src = userPicturePath
                } else {
                    userPictureInput.src = "c" + userPicturePath;
                }
            } else {
                userPictureInput.src = "./img/profile_student.png"
            }
            document.getElementById("user_picture").appendChild(userPictureInput);


            //about_me
            var about_meContent = profile_info_obj.info[0].about_me
            if (about_meContent !== null) {
                var about_meContentNode = document.createTextNode(about_meContent);
                document.getElementsByClassName("about_me")[0].appendChild(about_meContentNode);
            }

            //PersonalWebsite
            var PersonalWebsiteInput = document.createElement("input")
            PersonalWebsiteInput.type = "text";
            PersonalWebsiteInput.className = "form-control";
            PersonalWebsiteInput.placeholder = "網址";
            PersonalWebsiteInput.name = "urlPersonalWebsite";
            var PersonalWebsiteContent = profile_info_obj.info[0].PersonalWebsite;
            PersonalWebsiteInput.value = PersonalWebsiteContent;
            document.getElementById("urlPersonalWebsite").appendChild(PersonalWebsiteInput);

            //facebookProfile
            var facebookProfileInput = document.createElement("input")
            facebookProfileInput.type = "text";
            facebookProfileInput.className = "form-control";
            facebookProfileInput.placeholder = "使用者名稱";
            facebookProfileInput.name = "facebookProfile";
            facebookProfileInput.value = profile_info_obj.info[0].facebookProfile;
            document.getElementById("input-group-facebook").appendChild(facebookProfileInput);


            //youtubeProfile
            var youtubeProfileInput = document.createElement("input")
            youtubeProfileInput.type = "text";
            youtubeProfileInput.className = "form-control";
            youtubeProfileInput.placeholder = "使用者名稱";
            youtubeProfileInput.name = "youtubeProfile";
            youtubeProfileInput.value = profile_info_obj.info[0].youtubeProfile;
            document.getElementById("input-group-youtube").appendChild(youtubeProfileInput);
        }
    }
}
display_profile_user_info();

//圖片的更換
// function updateUserImage() {
//     var accessToken = localStorage.getItem("accessToken")
//     var xml_img = new XMLHttpRequest;
//     xml_img.open('post', '/profile/updateUserImage', true);
//     xml_img.setRequestHeader("Authorization", "Bearer" + " " + accessToken);
//     var user_image = document.getElementsByName("user_image")[0].value;
//     xml_img.send(JSON.stringify(user_image));
//     // alert("圖片修改成功！")
//     xml_img.onreadystatechange = function() {

//     }
// }

//公開資料確認登入以及修改
function add_user_info() {
    var xml = new XMLHttpRequest;
    xml.open('post', '/profile/info', true);
    xml.setRequestHeader('content-type', 'application/json')
    var accessToken = localStorage.getItem("accessToken")
    xml.setRequestHeader("Authorization", "Bearer" + " " + accessToken);
    var user_name = document.getElementsByClassName("name")[0].value;
    // var user_image = document.getElementsByName("user_image")[0].value;
    var about_me = document.getElementsByClassName("about_me")[0].value;
    var urlPersonalWebsite = document.getElementsByName("urlPersonalWebsite")[0].value;
    var facebookProfile = document.getElementsByName("facebookProfile")[0].value;
    var youtubeProfile = document.getElementsByName("youtubeProfile")[0].value;

    var profile_detail = {
        user_name: user_name,
        about_me: about_me,
        // user_image: user_image,
        PersonalWebsite: urlPersonalWebsite,
        facebookProfile: facebookProfile,
        youtubeProfile: youtubeProfile,
    }
    xml.send(JSON.stringify(profile_detail));
    alert("修改成功！")
    xml.onreadystatechange = function() {
        if (xml.readyState == 4) {
            if (xml.responseText == "error") {
                //尚未登入會員
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
            } else {
                //已登入會員
                console.log("already sign in")

            }
        }
    }
}

//讓介紹文字自動增大
function setHeight(obj) {
    obj.style.height = obj.scrollHeight + 'px';
}