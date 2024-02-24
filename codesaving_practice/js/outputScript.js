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

    userHTML = myHTML;

    outputAreaLoad();

    // console.log(u_name);
    // document.getElementById("user-name-id").innerText = u_name;
}

let userCSS = "", userHTML = "";

function outputAreaLoad() {
   let webCode = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>username</title>
</head>
<body>
<div id="wd-support-selectable" 
style="background:rgba(0, 85, 255, 0.5);
outline: 0.125rem dashed black;

display: none;

position: absolute;
translate: none;
z-index: 1000;

pointer-events: none;"></div>
<div id="wd-support-selected" 
style="background:rgba(255, 85, 0, 0.5);
outline: 0.125rem dashed black;

display: none;

position: absolute;
translate: none;
z-index: 1000;

pointer-events: none;"><div id="wd-support-resizer" 
style="height: 0.875rem;
width: 0.875rem;

background: slategrey;
outline: 0.125rem outset black;

position: relative;
top: calc(100% - 0.875rem);
left: calc(100% - 0.875rem);"></div></div>

<!-- usercode -->`+ userHTML +
`</body>
</html>`;

    let webBLOB = new Blob([webCode], {type:'text/html'});
    let webURL = URL.createObjectURL(webBLOB);

    let wdUserIframe = document.getElementById('display-frame');
    wdUserIframe.src = webURL;
}

let wdSelectedElement = null;

// let saveBTN = document.getElementById("save-tool");

// function getUserCode () {
//     let userCode = document.getElementById("display-frame").contentDocument.body.innerHTML;
//     userCode = userCode.split("<!-- usercode -->")[1].split("</body>")[0];
//     return userCode;
// }

// saveBTN.onclick = function () {
//     codeMirrorHTMLTextArea.setValue(getUserCode());

//     // let html = document.getElementById("html-code").value;
//     // let css = document.getElementById("css-code").value;
//     // let js = document.getElementById("js-code").value;
//     // let project_name = document.getElementById("project-name").value;
//     // let user_name = document.getElementById("user-name-id").innerText;


//     // if(project_name != null)
//     // {
        
//     //     get(child(dbRef, `users/${user_name}/projects/${project_name}`)).then((snapshot) => {
//     //         console.log(user_name);
//     //         if (snapshot.exists()) {
//     //             alert("Project with same name exists!")
    
//     //         } else {
//     //             console.log("before set");
//     //             console.log(user_name);
//     //             set(ref(database, `users/${user_name}/projects/${project_name}`),
//     //             {
//     //                 HTML: html,
//     //                 CSS: css,
//     //                 JS: js,
//     //                 Project: project_name
//     //             });
//     //             console.log("after set");
//     //             console.log(user_name);
//     //          alert("Project created !!!");
//     //         }
//     //     }).catch((error) => {
//     //         console.error(error);
//     //     });
//     // }

// }