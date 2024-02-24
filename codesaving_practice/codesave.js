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

window.onload = function(){
    let u_name = localStorage.getItem('myUserName');

    let myHTML = localStorage.getItem('myHTML');
    let myCSS = localStorage.getItem('myCSS');
    let myJS = localStorage.getItem('myJS');
    let myProjectName = localStorage.getItem('myProjectName');


    console.log(myHTML);
    console.log(myCSS);
    console.log(myJS);
    console.log(myProjectName);


    console.log(u_name);
    document.getElementById("user-name-id").innerText = u_name;
}

let saveBTN = document.getElementById("save");


saveBTN.onclick = function () {
    let html = document.getElementById("html-code").value;
    let css = document.getElementById("css-code").value;
    let js = document.getElementById("js-code").value;
    let project_name = document.getElementById("project-name").value;
    let user_name = document.getElementById("user-name-id").innerText;


    if(project_name != null)
    {
        
        get(child(dbRef, `users/${user_name}/projects/${project_name}`)).then((snapshot) => {
            console.log(user_name);
            if (snapshot.exists()) {
                alert("Project with same name exists!")
    
            } else {
                console.log("before set");
                console.log(user_name);
                set(ref(database, `users/${user_name}/projects/${project_name}`),
                {
                    HTML: html,
                    CSS: css,
                    JS: js,
                    Project: project_name
                });
                console.log("after set");
                console.log(user_name);
             alert("Project created !!!");
            }
        }).catch((error) => {
            console.error(error);
        });
    }

}

