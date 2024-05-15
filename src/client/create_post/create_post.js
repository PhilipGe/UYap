import {Post} from "../data_structures/post.js";
import { getCurrentUser } from "../utils/utils.js";
const URL = "http://localhost:3260";


const bodyEl = document.getElementById("body-text");
const loadEl = document.getElementById("loading");
const titleEl = document.getElementById("title-text");
const menuEl = document.getElementById("menu");
const checkList = document.getElementById('list1');

let tags = ["Announcement", "Job", "Yap", "Event"];
let checkBoxEls = [];

/**
   * Constructs the choosing tags menu by appending tag options and setting the opening feature
   *
   */
function setUpTags() {
    for(let i=0; i<tags.length; i++) {
        let listItem = document.createElement('li');
        listItem.innerHTML = tags[i];
        let checkBox = document.createElement('input')
        checkBox.type = "checkbox";
        listItem.prepend(checkBox);
        menuEl.appendChild(listItem);
        checkBoxEls.push(checkBox);
    }
    
    checkList.getElementsByClassName('anchor')[0].onclick = function(evt) {
        if (checkList.classList.contains('visible'))
            checkList.classList.remove('visible');
        else
            checkList.classList.add('visible');
    }
}

/**
   * Adding an event listener to save input
   *
   */
bodyEl.addEventListener("keyup", (event) => {
    localStorage.setItem("bodytext", bodyEl.value);
})
titleEl.addEventListener("keyup", (event) => {
    localStorage.setItem("titletext", titleEl.value);
})


/**
   * Sets the title and body texts as their values in storage
   *
   */
function retrieveStoredText() {
    bodyEl.value = localStorage.getItem("bodytext");
    titleEl.value = localStorage.getItem("titletext");
}


/**
   * Clears the title and body texts, both the elements and in storage
   *
   */
function clearText() {
    loadEl.textContent = "";
    bodyEl.value = "";
    titleEl.value = "";

    localStorage.setItem("bodytext", bodyEl.value);
    localStorage.setItem("titletext", titleEl.value);
}


/**
   * Get the tags selected from user input
   *
   * @returns {string[]} an array of the tags selected by the user
   */
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

/**
   * Construct the post from the user input and store it in the database
   */
async function sendPost() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();
    const hours = date.getHours();
    let minutes = date.getMinutes();
    if(minutes < 10 ){minutes = `0${minutes}`;}
    const totalDate = `${month}/${day}/${year} at ${hours}:${minutes}`;

    if(titleEl.value === "") {
        alert("Please write a title for your post.");
        return;
    }
    if(bodyEl.value === "") {
        alert("Please write the body of your post.");
        return;
    }

    loadEl.textContent = "Sending post...";

    const currentID = await getCurrentUser();
    let tags = getTags();
    let newPost = new Post(titleEl.value, bodyEl.value, tags, currentID, totalDate);

    try {
        const response = await fetch(`${URL}/savepost`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    post: newPost
                })
            });
    } catch (err) {
        alert("There was an error saving your post.")
    }   

    clearText();
}

setUpTags();
retrieveStoredText();

export {sendPost}