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