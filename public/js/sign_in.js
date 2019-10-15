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
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
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
// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
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
    // Now that we've initialized the JavaScript SDK, we call 
    // FB.getLoginStatus().  This function gets the state of the
    // person visiting this page and can return one of three states to
    // the callback you provide.  They can be:
    //
    // 1. Logged into your app ('connected')
    // 2. Logged into Facebook, but not your app ('not_authorized')
    // 3. Not logged into Facebook and can't tell if they are logged into
    //    your app or not.
    //
    // These three cases are handled in the callback function.
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
// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}