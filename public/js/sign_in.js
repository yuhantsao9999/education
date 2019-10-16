//native
document.getElementById("sumbit").addEventListener("click", function() {
    if (document.getElementById("email").value == "") {
        alert("! 請輸入電子郵件地址");
    } else if (document.getElementById("password").value == '') {
        alert("! 請輸入密碼");
    } else {
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
            } else {
                var accessToken = JSON.parse(xml.responseText).data.access_token;
                // console.log(accessToken);
                localStorage.setItem("accessToken", accessToken);
                alert("sign in successful")
                window.location.assign('./profile.html')
            }
        }
    }
});


//FB
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    if (response.status === 'connected') {
        testAPI();
        // console.log("gggggg" + response.authResponse.accessToken);
        var accessToken = response.authResponse.accessToken;
        // localStorage.setItem('fb_Token', accessToken);
        //FB
        var xml = new XMLHttpRequest;
        xml.open('post', '/user/signin', true);
        xml.setRequestHeader('content-type', 'application/json')
        var profile_fb = {
            provider: "faceboook",
            fb_token: accessToken,
        }
        console.log("this is profile_fb" + JSON.stringify(profile_fb))
        xml.send(JSON.stringify(profile_fb));
        xml.onload = function() {
            console.log(xml.responseText)
            var accessToken = (JSON.parse(xml.responseText).data.access_token);
            console.log("accessToken" + accessToken)
            localStorage.setItem("accessToken", accessToken)
            window.location.assign("./profile.html")
        }
    } else {
        // The person is not logged into your app or we are unable to tell.
        document.getElementById('status').innerHTML = 'Please log ' +
            'into this app.';
    }
}


function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}
window.fbAsyncInit = function() {
    FB.init({
        appId: '513734669198278',
        cookie: true, // enable cookies to allow the server to access 
        // the session
        xfbml: true, // parse social plugins on this page
        version: 'v3.3' // The Graph API version to use for the call
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
        document.getElementById('status').innerHTML = 'Thanks for logging in, ' + response.name + '!';
    });
}