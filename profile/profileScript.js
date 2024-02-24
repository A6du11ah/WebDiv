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
let dbRef = ref(getDatabase());

window.onload = function () {
    let u_name = localStorage.getItem('myUserName');
    let f_name = localStorage.getItem('myFullName');

    console.log(f_name);
    document.getElementById("user-name-id").innerText = u_name;
    document.getElementById("full-name-id").innerText = f_name;


    let items = [];

    get(child(dbRef, `users/${u_name}/projects/`)).then((snapshot) => {
        snapshot.forEach(childSnapshot => {
            items.push(childSnapshot.val().Project);
        });
        console.log(items);

        items.forEach((element) => {
            let p_name = element;
            console.log("this is p_name");
            console.log(p_name);

            let pseudo_item = document.createElement('div');
            pseudo_item.classList.add('pseudo-item');

            let image_place = document.createElement('div');
            image_place.classList.add('image-place');

            let intro_class = document.createElement('div');
            intro_class.classList.add('intro');

            let para = document.createElement("p");
            para.classList.add('para');
            para.style.fontSize = "26px"
            para.style.fontFamily = "fantasy"
            let node = document.createTextNode(p_name);
            para.appendChild(node);

            let btn = document.createElement("button");
            btn.classList.add('deleteBtn');
            btn.innerText = "Delete";
            btn.setAttribute("id", p_name);

            intro_class.appendChild(para);
            image_place.appendChild(btn);

            let section_inner_wrapper = document.getElementById("inner-wrapper");
            section_inner_wrapper.appendChild(pseudo_item);
            pseudo_item.appendChild(image_place);
            pseudo_item.appendChild(intro_class);

            document.getElementById("inner-wrapper").addEventListener("click", function(e){
                if(e.target.classList.contains('deleteBtn')){
                    let project_delete = e.target.id;
                    console.log(project_delete);

                    remove(ref(database, `users/${u_name}/projects/${project_delete}`)).then(()=>{
                        location.reload();
                    })
                    .catch((error)=>{
                        console.log("Error");
                    })
                }
            });

            document.getElementById("inner-wrapper").addEventListener("click", function(e){
                if(e.target.classList.contains('intro')){
                    let pro_name = e.target.innerText;
                    console.log(pro_name);
                    console.log(u_name);
                    get(child(dbRef, `users/${u_name}/projects/${pro_name}`)).then((snapshot) => {
                        const projectInfo =  snapshot.val(); 
                        let myHTML = projectInfo.HTML;
                        let myCSS = projectInfo.CSS;
                        let myJS = projectInfo.JS;

                        localStorage.setItem('myHTML', myHTML);
                        localStorage.setItem('myCSS', myCSS);
                        localStorage.setItem('myJS', myJS);
                        localStorage.setItem('myProjectName', pro_name);

                        window.location.href = '../codesaving_practice/editorPage.html';

                    }).catch((error) => {
                        console.error(error);
                    });
                }
            });


        });
    });
};

const tabs = document.querySelectorAll('.tab_btn');
const all_content = document.querySelectorAll('.content');

tabs[0].classList.add('active');
all_content[0].classList.add('active');

tabs.forEach((tab, index) => {
    tab.addEventListener('click', (e) => {
        tabs.forEach(tab => {
            tab.classList.remove('active')
        });
        tab.classList.add('active');

        all_content.forEach(content => {
            content.classList.remove('active');
        });
        all_content[index].classList.add('active');
    });

});

let popup = document.getElementById("edit-pop");
let container = document.querySelector('.container');

// document.getElementById("save-edit").onclick = function(){
//     container.classList.remove('active');
//     popup.classList.remove("open-popup");
// };

document.getElementById("button-to-edit").onclick = function () {
    container.classList.add('active');
    popup.classList.add("open-popup");
};

// function openPopup() {
//     container.classList.add('active');
//     popup.classList.add("open-popup");
// }

// function closePopup() {
//     container.classList.remove('active');
//     popup.classList.remove("open-popup");
// }

let addButton = document.getElementById("button-to-add");

addButton.onclick = function () {
    let u_name = document.getElementById("user-name-id").innerText;
    localStorage.setItem('myUserName', u_name);

    localStorage.setItem('myHTML', "");
    localStorage.setItem('myCSS', "");
    localStorage.setItem('myJS', "");
    localStorage.setItem('myProjectName', "");

    window.location.href = '../codesaving_practice/editorPage.html';
}


document.getElementById("save-edit").onclick = function () {
    let new_name = document.getElementById("new-name").value;
    let new_mail = document.getElementById("new-email").value;
    let new_pass = document.getElementById("new-password").value;

    let u_name = document.getElementById("user-name-id").innerText;
    console.log(new_name);
    console.log(new_mail);
    console.log(new_pass);


    get(child(dbRef, `users/${u_name}`)).then((snapshot) => {
        if (snapshot.exists()) {
            let profileInfo = snapshot.val();
            console.log(new_name);
            console.log(profileInfo.fullname);
            if (new_name == "") {
                console.log(profileInfo.fullname);
            }
            else {
                update(ref(database, 'users/' + u_name),
                    {
                        fullname: new_name,
                    });
                console.log(profileInfo.fullname);

            }
            if (new_mail == "") {
                console.log(profileInfo.email);

            }
            else {
                update(ref(database, 'users/' + u_name),
                    {
                        email: new_mail
                    });
                console.log(profileInfo.email);

            }
            if (new_pass == "") {
                console.log(profileInfo.password);

            }
            else {
                update(ref(database, 'users/' + u_name),
                    {
                        password: new_pass,
                    });
                console.log(profileInfo.password);

            }

            alert("Changed !!!");
            document.getElementById("full-name-id").innerText = profileInfo.fullname;
            container.classList.remove('active');
            popup.classList.remove("open-popup");
        }
    }).catch((error) => {
        console.error(error);
    });

}

document.getElementById("logout").onclick = function(){
    window.location.href = '../webdiv/index.html';
}

