//search
function search_course_enter() {
    if (event.keyCode == 13)
        search_course();
}

// get search course data 
function search_course() {
    var client_keyword = document.getElementsByClassName("search__input")[0].value;
    var result = capitalize_the_word(client_keyword);
    window.location.replace("./search.html?keyword=" + result);
}

function capitalize_the_word(str) {
    var lowcase_keyword = str.replace(/\s+/g, "").toLowerCase();
    var keyword_arr = lowcase_keyword.split(' ');
    for (var i = 0; i < keyword_arr.length; i++) {
        var result = keyword_arr[i].substring(0, 1).toUpperCase() + keyword_arr[i].substring(1).toLowerCase();
    }
    return result
}