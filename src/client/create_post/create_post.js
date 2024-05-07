import {Post} from "../data_structures/post.js";
import {savePost} from "../db/db_functions_2.js"

const bodyEl = document.getElementById("body-text");
const loadEl = document.getElementById("loading");
const titleEl = document.getElementById("title-text");
const menuEl = document.getElementById("menu");
const checkList = document.getElementById('list1');

const placeholderID = 234221;

let tags = ["tag one", "tag two", "tag three", "tag four", "tag five"];
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
    db.put({_id: "bodytext", text: bodyEl.value});
})
titleEl.addEventListener("keyup", (event) => {
    db.put({_id: "titletext", text: titleEl.value});
})


/**
   * Sets the title and body texts as their values in storage
   *
   */
function retrieveStoredText() {
    db.get("bodytext")
    .then(document => {
        bodyEl.value = document.text;
    })
    .catch(error => {
        // body text is not in storage
        bodyEl.value = "";
    });
    db.get("titletext")
    .then(document => {
        titleEl.value = document.text;
    })
    .catch(error => {
        // title text is not in storage
        titleEl.value = "";
    });
}


/**
   * Clears the title and body texts, both the elements and in storage
   *
   */
function clearText() {
    loadEl.textContent = "";
    bodyEl.value = "";
    titleEl.value = "";

    db.get("bodytext")
        .then(document => {
            db.remove("bodytext", document._rev);
        })
        .catch(error => {
            console.error('Error retrieving document:', error);
        })
    db.get("titletext")
        .then(document => {
            db.remove("titletext", document._rev);
        })
        .catch(error => {
            console.error('Error retrieving document:', error);
        })
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
    if(titleEl.value === "") {
        alert("Please write a title for your post.");
        return;
    }
    if(bodyEl.value === "") {
        alert("Please write the body of your post.");
        return;
    }

    loadEl.textContent = "Sending post...";

    let tags = getTags();
    let newPost = new Post(titleEl.value, bodyEl.value, tags, placeholderID, Date.now());

    try {
        const response = await savePost(newPost);
    } catch (error) {
        alert("There was an error saving your post.");
    }

    clearText();
}

setUpTags();
retrieveStoredText();

export {sendPost}