    //版面內容
    function display_classinfo_now() {
        var urlParams = new URLSearchParams(window.location.search);
        var course_id = urlParams.get('course_id');
        console.log(course_id)
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("get", "/course_update?course_id=" + course_id, true)
        xmlhttp.send();
        xmlhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                var obj = JSON.parse(xmlhttp.responseText)
                console.log(JSON.stringify(obj))

                // var video_id_arr = [];
                //替換課程名稱
                var courseTitleDiv = document.createElement("div");
                var courseTitleContent = document.createTextNode(obj.data.Course_title);
                courseTitleDiv.appendChild(courseTitleContent);
                courseTitleDiv.id = "course_title"
                document.getElementsByClassName("row-maininfo")[0].appendChild(courseTitleDiv);
                //替換課程領域
                var courseFieldDiv = document.createElement("div");
                var courseFieldContent = document.createTextNode(obj.data.Course_field);
                courseFieldDiv.appendChild(courseFieldContent);
                document.getElementsByClassName("row-maininfo")[1].appendChild(courseFieldDiv);
                //替換課程圖片
                var course_image_img = document.createElement("img");
                course_image_img.className = "courseImageImg"
                course_image_img.src = "https://d3u7d6vbm9yroa.cloudfront.net/" + obj.data.main_image
                document.getElementsByClassName("row-maininfo")[2].appendChild(course_image_img);

                var count = 0;
                var video_count = 0; //vidoe的編號 非個數
                //章chapter名稱
                for (i = 0; i < obj.data.Course_detail.length; i++) {
                    count++;
                    document.getElementById('count').value = count;
                    // console.log(count)
                    var chaptermainDiv = document.createElement("div");
                    chaptermainDiv.className = "chapter"
                        //chapter_auto_id標記在此
                    chaptermainDiv.id = obj.data.Course_detail[i].Chapter_auto_id

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
                    chapter_title_input.value = obj.data.Course_detail[i].Chapter_title

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
                    chapter_video_Div.id = "chapter" + parseInt(count);
                    chapter_video_Div.appendChild(chaptermainDiv);

                    document.getElementById("videoinfo").appendChild(chapter_video_Div);

                    console.log("圈數: " + i + " 長度" + obj.data.Course_detail[i].Chapter_detail.length)
                    for (j = 0; j < obj.data.Course_detail[i].Chapter_detail.length; j++) {
                        //節section名稱替換
                        console.log("oooooo")
                        document.getElementById('video_count').value = video_count;
                        video_count++;
                        document.getElementById('count').value = count;
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
                        section_title_input.value = obj.data.Course_detail[i].Chapter_detail[j].Section_title;
                        console.log(obj.data.Course_detail[i].Chapter_detail[j].Section_title)
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
                        section_intro_textarea.value = obj.data.Course_detail[i].Chapter_detail[j].Section_intro
                        section_introDiv.appendChild(section_intro_textarea)


                        var deleteSpan = document.createElement("span");
                        var deleteImg = document.createElement("img");
                        deleteImg.src = "../img/delete3.png"
                        deleteImg.className = count
                        deleteImg.setAttribute("onClick", "delete_section(" + video_count + ")");
                        deleteSpan.appendChild(deleteImg);


                        var videoNowDiv = document.createElement("div");
                        videoNowDiv.className = "row-video"
                        var videoNowp = document.createElement("p");
                        var videoNowContent = document.createTextNode("目前的課程影片:");
                        videoNowp.appendChild(videoNowContent);
                        videoNowDiv.appendChild(videoNowp);


                        var videoNowVideo = document.createElement("video");
                        //Video_id標記在此
                        videoNowVideo.id = obj.data.Course_detail[i].Chapter_detail[j].Video_id;
                        videoNowVideo.className = "videoNow"
                        videoNowVideo.src = "https://d3u7d6vbm9yroa.cloudfront.net/" + obj.data.Course_detail[i].Chapter_detail[j].Video
                        videoNowDiv.appendChild(videoNowVideo);

                        var videoDiv = document.createElement("div");
                        videoDiv.className = "row-video"
                        var videomainp = document.createElement("p");
                        var videoContent = document.createTextNode("想要更新的課程影片:");
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
                        sectionmainDiv.appendChild(videoNowDiv);
                        sectionmainDiv.appendChild(videoDiv);
                        sectionmainDiv.appendChild(deleteSpan);
                        console.log("i " + i)
                        document.getElementById("chapter" + (i + 1)).appendChild(sectionmainDiv);
                    }
                }
            }
        }
    }
    display_classinfo_now();

    function add_section(obj) {
        video_count = Number(document.getElementById('video_count').value) + 1
            // console.log("section 代號: " + video_count)
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
        section_title_input.required = true;
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
        section_intro_textarea.required = true;
        section_introDiv.appendChild(section_intro_textarea)


        var deleteSpan = document.createElement("span");
        var deleteImg = document.createElement("img");
        deleteImg.src = "../img/delete3.png"
            // count = document.getElementById('count').value
            // deleteImg.className = count
        deleteImg.setAttribute("onClick", "delete_section(" + video_count + ")");
        deleteSpan.appendChild(deleteImg);

        // <input type="hidden" id="course_id" name="course_id">

        var origin_videoInput = document.createElement("input");
        origin_videoInput.type = "hidden"
        origin_videoInput.className = "videoNow"
            // origin_videoInput.id = "course_id";

        var videoDiv = document.createElement("div");
        videoDiv.className = "row-video"
        var videomainp = document.createElement("p");
        var videoContent = document.createTextNode("新增的課程影片:");
        videomainp.appendChild(videoContent);
        videoDiv.appendChild(videomainp);

        var videoinput = document.createElement("input");
        videoinput.type = "file";
        videoinput.name = "class_video";
        videoinput.required = true;
        videoDiv.appendChild(videoinput);

        var sectionmainDiv = document.createElement("div");
        sectionmainDiv.className = "section";
        sectionmainDiv.id = "section" + video_count;

        sectionmainDiv.appendChild(section_titleDiv);
        sectionmainDiv.appendChild(section_introDiv);
        sectionmainDiv.appendChild(section_introDiv);
        sectionmainDiv.appendChild(origin_videoInput);
        sectionmainDiv.appendChild(videoDiv);
        sectionmainDiv.appendChild(deleteSpan);

        document.getElementById("chapter" + obj).appendChild(sectionmainDiv);
        document.getElementById('video_count').value = video_count;
        // console.log(video_count)
    }

    function add_chapter() {
        count = document.getElementById('count').value
        count++;

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
        chapter_title_input.required = true;

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
        chapter_video_Div.id = "chapter" + parseInt(count);

        chapter_video_Div.appendChild(chaptermainDiv);

        document.getElementById("videoinfo").appendChild(chapter_video_Div);
        document.getElementById('count').value = count;
        // console.log("count" + count)
    }

    var delete_count = 0
        //delete_chapter()
    function delete_chapter(obj) {
        delete_count++;
        // document.getElementById('count').value = count;
        var delete_chapter = document.getElementById("chapter" + obj);
        delete_chapter.parentNode.removeChild(delete_chapter);

        var count = document.getElementById('count').value;
    }
    //delete_section()
    function delete_section(obj) {
        video_count--;
        // document.getElementById('video_count').value = video_count;
        var delete_id = document.getElementById("section" + obj);
        delete_id.parentNode.removeChild(delete_id);
    }

    //submit
    function course_update_submit() {
        document.getElementById("submit").addEventListener("click", function() {
            var old_image_path_arr = [];
            var main_image_input = document.getElementsByName('main_image')[0].value;
            // alert("heyeyeyey: " + main_image_input.length)
            var old_image = document.getElementsByClassName('courseImageImg')[0].src.substr(-28);
            if (main_image_input.length == "") {
                //沒更新
                old_image_path_arr.push(old_image);
                document.getElementById('old_image_path_arr').value = old_image_path_arr;
            } else {
                //有更新
                old_image_path_arr.push(null);
                document.getElementById('old_image_path_arr').value = old_image_path_arr;
            }

            var urlParams = new URLSearchParams(window.location.search);
            var course_id = urlParams.get('course_id');
            document.getElementById('course_id').value = course_id;

            var each_chapter_section_num_arr = [];
            var count = document.getElementById('count').value;

            var chapter_num = (Number(count) - delete_count) //chapter的個數
            document.getElementById('chapter_num').value = chapter_num; //1
            //計算chapter_auto_id
            var chapter_auto_id_arr = [];
            for (var i = 0; i < chapter_num; i++) {

                var chapter_auto_id = document.getElementsByClassName('chapter')[i].id
                if (chapter_auto_id.length == 0) {
                    chapter_auto_id_arr.push(null);

                    console.log("rrrrrrr")
                } else {
                    chapter_auto_id_arr.push(document.getElementsByClassName('chapter')[i].id);
                }
                each_chapter_section_num_arr.push(((document.getElementsByName("chapter_title")[i]).parentNode.parentNode.parentNode.childNodes.length) - 1)
            }
            // alert(chapter_auto_id_arr)
            // alert("each_chapter_section_num_arr : " + each_chapter_section_num_arr)

            var section_num = 0
            for (var i = 0; i < each_chapter_section_num_arr.length; i++) {
                section_num += Number(each_chapter_section_num_arr[i])
            }

            var class_video_arr = [];
            var video_id_array = [];

            // alert("section num : " + section_num)
            for (var i = 0; i < section_num; i++) {
                //影片更新
                // alert("loop : " + i)
                var class_video = document.getElementsByName('class_video')[i].value;
                if (class_video.length == 0) { //沒有更新
                    // alert("no update")

                    var oldVideo_src = document.getElementsByClassName('videoNow')[i].src;
                    var oldVideo_src_filename = oldVideo_src.substr(-29)
                    class_video_arr.push(oldVideo_src_filename)
                    var video_id = document.getElementsByClassName('videoNow')[i].id;
                    video_id_array.push(video_id)
                        // alert("QQQ")

                } else {
                    //新增
                    // alert("Add");
                    class_video_arr.push(null)
                        // alert(document.getElementsByClassName('videoNow')[i].id.length);
                    if (document.getElementsByClassName('videoNow')[i].id.length != 0) {
                        // alert("舊有的")
                        video_id_array.push(document.getElementsByClassName('videoNow')[i].id)
                    } else {
                        // alert("新增新章節")
                        video_id_array.push(null)
                    }
                }
            }
            // console.log(count)
            // alert("class_video_arr : " + class_video_arr)
            document.getElementById('each_video_src').value = class_video_arr;
            document.getElementById('chapter_auto_id_arr').value = chapter_auto_id_arr;
            document.getElementById('video_id_arr').value = video_id_array;
            document.getElementById('each_chapter_section_num').value = each_chapter_section_num_arr;
        });
    }
    course_update_submit();