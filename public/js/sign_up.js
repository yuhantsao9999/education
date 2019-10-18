document.getElementById("sumbit").addEventListener("click", function() {
    var xml = new XMLHttpRequest;
    xml.open('post', '/user/signup', true);
    xml.setRequestHeader('content-type', 'application/json')
    var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    console.log("this is" + name, email, password)
    var profile = {
            provider: "native",
            name: name,
            email: email,
            password: password
        }
        // console.log(profile)
    xml.send(JSON.stringify(profile));
    xml.onload = function() {
        if (xml.responseText == "error") {
            // console.log("duplicate")
            alert("Cannot repeat registration!please sign in!")
            window.location.assign('./sign_in.html')
        } else if (xml.responseText == "沒有填寫全部註冊欄位") {
            alert("請確實填寫所有註冊欄位")
            window.location.assign('./sign_up.html')
        } else {
            console.log("not duplicate")
            alert("sign up successful")
                // localStorage.setItem("accessToken", accessToken);
                // var accessToken = JSON.parse(xml.responseText).data.access_token;
                // localStorage.setItem("accessToken", accessToken);
            window.location.assign('./sign_in.html');
        }
    }
});