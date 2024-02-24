import { initializeApp } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-app.js";
import { getDatabase, get, set, ref, child, update, remove } from "https://www.gstatic.com/firebasejs/10.0.0/firebase-database.js";

let firebaseConfig = {

    apiKey: "AIzaSyA8xeOvEJRmI2kDDuS5UcVjQB9_62JDlNg",

    authDomain: "webdiv-cabc9.firebaseapp.com",

    databaseURL: "https://webdiv-cabc9-default-rtdb.firebaseio.com",

    projectId: "webdiv-cabc9",

    storageBucket: "webdiv-cabc9.appspot.com",

    messagingSenderId: "617159358505",

    appId: "1:617159358505:web:56bd68fd94f671b07ec438"

};

let app = initializeApp(firebaseConfig);

let database = getDatabase(app);
const dbRef = ref(getDatabase());

let username = document.getElementById("username");
let errorName = document.getElementById("error-in-user-name");

window.onload = function(){
    document.getElementById("sign-up-form").reset();
    document.getElementById("log-in-form").reset();
}

username.oninput = function validation(){
    get(child(dbRef, `users/${username.value}`)).then((snapshot) => {
        if (snapshot.exists()) {
            errorName.innerText = "User name taken";
        } else {
            errorName.innerText = "";
        }
    }).catch((error) => {
        console.error(error);
    });
};

// document.getElementById("password").onfocus = function(e){
//     e.target.type = "password";
//     e.target.autocomplete = "off";
// }

// document.getElementById("password-login").onfocus = function(e){
//     e.target.type = "password";
//     e.target.autocomplete = "off";
// }

document.getElementById("sign-up-btn").addEventListener('click', function (e) {
    get(child(dbRef, `users/${document.getElementById("username").value}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const profileInfo =  snapshot.val();
            if(profileInfo.username == document.getElementById("username").value)
            {
                alert("This username already exists ");
            }

            else if(profileInfo.email == document.getElementById("email").value)
            {
                alert("You have an account with this email ");
            }

        } else {            
            set(ref(database, 'users/' + document.getElementById("username").value),
            {
                fullname: document.getElementById("fullname").value,
                username: document.getElementById("username").value,
                password: document.getElementById("password").value,
                email: document.getElementById("email").value
            });
         alert("Registered !!!");
        }
    }).catch((error) => {
        console.error(error);
    });
});


document.getElementById("log-in-btn").addEventListener('click', function (e) {
    get(child(dbRef, `users/${document.getElementById("username-login").value}`)).then((snapshot) => {
        if (snapshot.exists()) {
            const profileInfo =  snapshot.val();
            if(profileInfo.password == document.getElementById("password-login").value)
            {
                let u_name = profileInfo.username;
                let f_name = profileInfo.fullname;
                console.log(f_name);
                localStorage.setItem('myUserName', u_name);
                localStorage.setItem('myFullName', f_name);
                window.location.href = '../profile/profile.html';
            }
            else{
                alert("Wrong password!");
            }
        } else {
            alert("No data available");
        }
    }).catch((error) => {
        console.error(error);
    });
})


document.querySelector(".pseudo-item .intro p" ).addEventListener("click", function(){
    let pr_name = document.querySelector(".inner-wrapper .pseudo-item .intro p").innerText;
    console.log(pr_name);
})