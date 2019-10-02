 //已完成的課程
 function display_classinfo_done() {
     var accessToken = localStorage.getItem("accessToken")
     var js = document.getElementById('content')
     var xml = new XMLHttpRequest;
     xml.open('get', '/profile/done', true);
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

             } else {
                 var my_class_h3 = document.createElement("h3");
                 var my_class_Content = document.createTextNode("已完成的課程");
                 my_class_h3.appendChild(my_class_Content);
                 document.getElementById("profile_add_info").appendChild(my_class_h3)
                 if (xml.responseText == "no done class") {
                     // console.log("no done class")
                     var noclass_done_Content = document.createTextNode("尚未完成任何課程哦!");
                     document.getElementById("profile_add_info").appendChild(noclass_done_Content)
                 } else {
                     var obj = JSON.parse(xml.responseText);
                     console.log(JSON.stringify(obj))
                     var count = obj.length;
                     for (var i = 0; i < count; i++) {
                         //替換課程
                         var starDiv = document.createElement("div");
                         starDiv.className = "star"
                         var start1_Input = document.createElement("input");
                         var start2_Input = document.createElement("input");
                         var start3_Input = document.createElement("input");
                         var start4_Input = document.createElement("input");
                         var start5_Input = document.createElement("input");

                         start1_Input.type = "radio";
                         start1_Input.name = "rdStar";
                         start1_Input.value = "1";
                         start1_Input.setAttribute("onClick", "star_num(1)");

                         start2_Input.type = "radio";
                         start2_Input.name = "rdStar";
                         start2_Input.value = "2";
                         start2_Input.setAttribute("onClick", "star_num(2)");

                         start3_Input.type = "radio";
                         start3_Input.name = "rdStar";
                         start3_Input.value = "3";
                         start3_Input.setAttribute("onClick", "star_num(3)");

                         start4_Input.type = "radio";
                         start4_Input.name = "rdStar";
                         start4_Input.value = "4";
                         start4_Input.setAttribute("onClick", "star_num(4)");

                         start5_Input.type = "radio";
                         start5_Input.name = "rdStar";
                         start5_Input.value = "5";
                         start5_Input.setAttribute("onClick", "star_num(5)");

                         starDiv.appendChild(start1_Input)
                         starDiv.appendChild(start2_Input)
                         starDiv.appendChild(start3_Input)
                         starDiv.appendChild(start4_Input)
                         starDiv.appendChild(start5_Input)



                         var titleInput = document.createElement("input");
                         titleInput.type = "hidden";
                         titleInput.name = "class_name";
                         titleInput.value = obj[i].course_title
                         var titleContent = document.createTextNode(obj[i].course_title);
                         var classDiv_a = document.createElement("a");
                         classDiv_a.href = ("/course.html?title=" + obj[i].course_title);
                         classDiv_a.appendChild(titleContent)
                         classDiv_a.appendChild(titleInput)


                         var title_comment_form = document.createElement("form");
                         title_comment_form.action = "/profile/done/comment"
                         title_comment_form.method = "post"

                         var comment_textarea = document.createElement("textarea");
                         comment_textarea.className = "comment_textarea"
                         comment_textarea.type = "text";
                         comment_textarea.name = "comment";

                         var starInput = document.createElement("input");
                         starInput.type = "hidden";
                         starInput.id = "star_number";
                         starInput.name = "star_number";
                         starInput.value = "5";

                         var tokenInput = document.createElement("input");
                         tokenInput.type = "hidden";
                         tokenInput.id = "user_token";
                         tokenInput.name = "user_token";
                         tokenInput.value = accessToken;

                         var submitInput = document.createElement("input");
                         submitInput.type = "submit";
                         submitInput.id = "submit"
                         submitInput.value = "送出評論";

                         title_comment_form.appendChild(classDiv_a)

                         var star_number = obj[i].star
                         console.log("star_number :  " + star_number)
                         if (star_number == null || star_number == undefined || star_number == '') {
                             title_comment_form.appendChild(starDiv)
                             title_comment_form.appendChild(starInput)
                             title_comment_form.appendChild(comment_textarea)
                             title_comment_form.appendChild(submitInput)
                         } else {
                             var commentContent = document.createTextNode("感謝評論課程！");
                             var commentDiv = document.createElement("div");
                             commentDiv.className = "thank_text"
                             commentDiv.appendChild(commentContent)
                             title_comment_form.appendChild(commentDiv)
                         }
                         title_comment_form.appendChild(tokenInput)


                         var classImg = document.createElement("img");
                         var classImg_a = document.createElement("a");
                         classImg.src = "https://cad-education-project.s3-ap-northeast-1.amazonaws.com/class-video-picture/" + obj[i].main_image
                         classImg_a.href = "./course.html?title=" + obj[i].course_title
                             // classDiv_a.appendChild(classImg)

                         var classDiv = document.createElement("div");
                         classDiv.className = "profile_class_info";
                         classDiv.appendChild(title_comment_form)


                         var imgDiv_a = document.createElement("a");
                         imgDiv_a.href = ("/course.html?title=" + obj[i].course_title);

                         var imgDiv_img = document.createElement("img");
                         imgDiv_img.src = "https://cad-education-project.s3-ap-northeast-1.amazonaws.com/class-video-picture/" + obj[i].main_image

                         imgDiv_a.appendChild(imgDiv_img)

                         var profileDiv = document.createElement("div");
                         profileDiv.className = "profile_info"


                         profileDiv.appendChild(imgDiv_a)
                         profileDiv.appendChild(classDiv)


                         document.getElementById("profile_add_info").appendChild(profileDiv)
                     }
                 }
             }
         }
     }
 }
 display_classinfo_done();