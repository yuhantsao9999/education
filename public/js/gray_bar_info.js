//gray bar info
function gray_bar_info() {
    var xml_gray = new XMLHttpRequest();
    xml_gray.open("get", "/gray/info", true);
    xml_gray.send(null);
    xml_gray.onreadystatechange = function() {
        if (xml_gray.readyState == 4) {
            var obj = JSON.parse(xml_gray.responseText)

            var userNum_content = document.createTextNode(obj.user_num);
            var courseNum_content = document.createTextNode(obj.course_num);
            var commentNum_content = document.createTextNode(obj.comment_num);
            var starAver_content = document.createTextNode(obj.total_class_average_star);


            document.getElementsByClassName("count")[0].appendChild(userNum_content)
            document.getElementsByClassName("count")[1].appendChild(courseNum_content)
            document.getElementsByClassName("count")[2].appendChild(starAver_content)
            document.getElementsByClassName("count")[3].appendChild(commentNum_content)
        }
    }
}
gray_bar_info();