const bodyEl = document.getElementById("body-text");
const buttonEl = document.getElementById("submit");
const loadEl = document.getElementById("loading");
const titleEl = document.getElementById("title-text");
const tagEl = document.getElementById("slct");
const menuEl = document.getElementById("menu");

import {Post} from "./post.js";

let allPosts = [];
const placeholderID = 234221;

let tags = ["tag one", "tag two", "tag three", "tag four"];
let checkBoxEls = [];

//put tags in options list
for(let i=0; i<tags.length; i++) {
    let listItem = document.createElement('li');
    listItem.innerHTML = tags[i];
    let checkBox = document.createElement('input')
    checkBox.type = "checkbox";
    listItem.prepend(checkBox);
    menuEl.appendChild(listItem);
    checkBoxEls.push(checkBox);
}

var checkList = document.getElementById('list1');
checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
  if (checkList.classList.contains('visible'))
    checkList.classList.remove('visible');
  else
    checkList.classList.add('visible');
}


buttonEl.addEventListener("click", (event) => {
    sendPost();
});

export async function getAllPosts() {
    return new Promise((resolve, reject) => {
        setTimeout(
            () => resolve(allPosts),
            Math.random() * 1000 + 1000,
        );
    });
}

function getTags() {
    let t = [];
    for(let i=0; i<tags.length; i++) {
        console.log("checking tag");
        if(checkBoxEls[i].checked) {
            t.push(tags[i]);
        }
    }
    return t;
}


async function sendPost() {
    loadEl.textContent = "Sending post...";
    return new Promise((resolve, reject) => {
        setTimeout(
        () => {
            //put the tags in the post object
            //let tags = [];
            //tags.push(tagEl.value);

            let tags = getTags();
            let newPost = new Post(titleEl.value, bodyEl.value, tags, placeholderID, Date.now());

            allPosts.push(newPost);
            console.log(allPosts);

            loadEl.textContent = "";
            bodyEl.value = "";
            titleEl.value = "";
            resolve(1);
        },

        Math.random() * 1000 + 1000,
        );
    });
}

