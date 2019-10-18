//native
document.getElementById("sumbit").addEventListener("click", function() {
    var xml = new XMLHttpRequest;
    xml.open('post', '/user/signin', true);
    xml.setRequestHeader('content-type', 'application/json')
        // var name = document.getElementById("name").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    // console.log(name, email, password)
    var profile = {
            provider: "native",
            name: name,
            email: email,
            password: password
        }
        // console.log(profile)
    xml.send(JSON.stringify(profile));
    xml.onload = function() {
        // console.log(xml.responseText)
        if (xml.responseText == "error") {
            alert("please sign up first!")
            window.location.assign('./sign_up.html')
        } else if (xml.responseText == "沒有填寫全部登入欄位") {
            alert("請確實填寫所有登入欄位")
            window.location.assign('./sign_in.html')
        } else {
            var accessToken = JSON.parse(xml.responseText).data.access_token;
            // console.log(accessToken);
            localStorage.setItem("accessToken", accessToken);
            alert("sign in successful")
            window.location.assign('./profile.html')
        }
    }
});


//FB

function statusChangeCallback(response) {
    if (response.status === 'connected') {
        console.log('Logged in and authenticated');
        testAPI();
    } else {
        console.log('Not authenticated')
    }
}

function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
        var accessToken = response.authResponse.accessToken;

        //FB
        var xml = new XMLHttpRequest;
        xml.open('post', '/user/signin', true);
        xml.setRequestHeader('content-type', 'application/json')
        var profile_fb = {
            provider: "faceboook",
            fb_token: accessToken,
        }
        xml.send(JSON.stringify(profile_fb));
        xml.onload = function() {
            var accessToken = (JSON.parse(xml.responseText).data.access_token);
            localStorage.setItem("accessToken", accessToken)
            window.location.assign("./profile.html")
        }
    });
}
window.fbAsyncInit = function() {
    FB.init({
        appId: '513734669198278',
        cookie: true,
        xfbml: true,
        version: 'v3.3'
    });
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};

(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        if (response && !response.error) {}
    });
}