function display_search_course_info() {
    const currentUrl = new URL(window.location.href);
    const keyword = currentUrl.searchParams.get("keyword");
    let courseUrl = "/education/classinfo/search/?keyword=" + keyword;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", courseUrl, true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var obj = JSON.parse(xmlhttp.responseText)
            console.log(JSON.stringify(obj))
            if (obj.length == 0) {
                var contentDiv = document.createElement("div");
                var noclassContent = document.createTextNode("沒有任何相關課程哦~");
                contentDiv.appendChild(noclassContent)
                document.getElementById("class_container").appendChild(contentDiv)
            } else {
                for (var i = 0; i < obj.length; i++) {
                    //替換課程圖片
                    var classImg = document.createElement("img");
                    var colDiv = document.createElement("div");
                    var rowA = document.createElement("a");
                    // var titleContent = document.createTeLINExtNode(obj.Course_title);
                    classImg.className = "class_picture";
                    classImg.src = "https://d3u7d6vbm9yroa.cloudfront.net/" + obj[i].main_image
                    colDiv.className = "col-4"
                    rowA.className = "row clearfix"


                    rowA.href = ("/course.html?title=" + obj[i].course_title);
                    console.log("TITLE IS" + obj[i].title)

                    colDiv.appendChild(classImg)
                        // document.getElementById("class_container").appendChild(rowDiv)
                        //替換課程標題

                    var titleh3 = document.createElement("h3");
                    var introP = document.createElement("p");
                    var col_8Div = document.createElement("div");
                    titleh3.className = "title"

                    col_8Div.className = "col-8"

                    var titleContent = document.createTextNode(obj[i].course_title);
                    console.log(titleContent)
                    var introContent = document.createTextNode(obj[i].course_intro);
                    titleh3.appendChild(titleContent)
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
}
display_search_course_info();


//image_for new_hand
function display_classinfo_for_new_hand() {
    var xml_new_hand = new XMLHttpRequest();
    xml_new_hand.open("get", "/education/classinfo/for_beginner", true);
    xml_new_hand.send(null);
    xml_new_hand.onreadystatechange = function() {
        if (xml_new_hand.readyState == 4) {
            var obj = JSON.parse(xml_new_hand.responseText)
            console.log(obj)
            for (i = 0; i < obj.data.length; i++) {
                var courseImg_img = document.createElement("img");
                courseImg_img.src = "https://d3u7d6vbm9yroa.cloudfront.net/" + obj.data[i].main_image

                var courseImg_a = document.createElement("a");
                courseImg_a.href = ("/course.html?title=" + obj.data[i].course_title);


                var courseImg_div = document.createElement("div");
                courseImg_div.className = "col-2"

                courseImg_a.appendChild(courseImg_img)
                courseImg_div.appendChild(courseImg_a)
                document.getElementById("for_newHand").appendChild(courseImg_div);
            }
        }
    }
}
display_classinfo_for_new_hand();