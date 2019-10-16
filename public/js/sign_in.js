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
// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    // console.log('statusChangeCallback');
    // console.log(response);

    if (response.status === 'connected') {

        testAPI();


    } else {
        // The person is not logged into your app or we are unable to tell.
        console.log('Not authenticated')
    }
}
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
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
        console.log("this is profile_fb" + JSON.stringify(profile_fb))
        xml.send(JSON.stringify(profile_fb));
        xml.onload = function() {
            console.log(xml.responseText)
            var accessToken = (JSON.parse(xml.responseText).data.access_token);
            console.log("accessToken" + accessToken)
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
// Load the SDK asynchronously
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