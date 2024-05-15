import { Post } from "../data_structures/post.js";
import { getCurrentUser } from "../utils/utils.js";
//import { getAllPosts } from "../db/db_functions_2.js";

const refreshButton = document.getElementById("refresh-button");
const URL = "http://localhost:3260";

/**
 * Creates a post box element with the given text.
 * @param {string} text - The HTML content representing a post including timestamp, user ID, and message.
 * @returns {HTMLDivElement} A div element styled as a post box containing the post.
 */
function createBox(text, deleteButton) {
  let temp = document.createElement("div");
  temp.innerHTML = text + "<br><br>";
  temp.classList.add("post-box");
  temp.appendChild(deleteButton);

  return temp;
}

/**
 * Renders posts into a specified parent element.
 * @param {HTMLElement} parent - The container element wh ere posts will be appended.
 * @param {Post[]} posts - An array of post objects to be displayed.
 */
function createPosts(parent, posts) {
  parent.innerHTML = '';
  posts.forEach((post) => {
    let postText =
      "posted " +
      post.timestamp +
      "<br><br><b>Title: </b> " +
      post.title +
      "<br><br><b>Author: </b>" +
      post.user_id +
      "<br><br>" +
      post.body +
      "<br><br>Tags: " +
      post.tags.reduce((acc, curr) => {
        return acc + "<button id ='filterB' style='background-color: #2c2e36; color: white';>" + curr + "</button>"
      }, '');
      if(getCurrentUser() === post.user_id){
        const thisDeleteButton = document.createElement('button');
        thisDeleteButton.id = 'delete_post_button';
        thisDeleteButton.innerText = "delete post";

        thisDeleteButton.addEventListener("click", async (event) => {
          console.log("deleting post with id: ", post._id);
          try {
            const response = await fetch(`${URL}/deletepost/${post._id}`, {
              method: "DELETE"
            });
            reloadPostCallback();
          } catch(error){
              alert("can't delete post")
          }
        })

        parent.appendChild(createBox(postText, thisDeleteButton));
      }
      else{
        parent.appendChild(createBox(postText, document.createElement("div")));
      }
  });
}

let tagFilters = [];
let tagObjList = [];
let allPosts = [];

/**
 * Creates or updates a tag button object.
 * @param {string} tagname - The name of the tag.
 * @returns {HTMLElement} A button element associated with the tag.
 */
function buildTagObject(tagname){
  const el = document.createElement('button');
  el.classList.add('tagButton');
  el.innerHTML = tagname;

  let tagObj;

  if(tagObjList.find((v) => v.tagname === tagname)){
    tagObj.DOMelement = el;
  } else{
    tagObj = {
      name: tagname,
      DOMelement: el,
      selected: false
    };
    tagObjList.push(tagObj)
  }

  if(tagObj.selected){
    el.style.backgroundColor = '#2c2e36';
  }else{
    el.style.backgroundColor = 'darkgray';
  }

  el.addEventListener('click', () => {
    if (!tagObj.selected) {
      el.style.backgroundColor = '#2c2e36';
      tagObj.selected = true;
      tagFilters.push(tagname);
      filterPostsAndUpdatePage();
    } else {
      el.style.backgroundColor = 'darkgray';
      tagObj.selected = false;
      tagFilters = tagFilters.filter((v) => v !== tagname);
      filterPostsAndUpdatePage();
    }
  });

  return el;
}

/**
 * Populates a given parent element with tag buttons for filtering posts.
 * @param {HTMLElement} parent - The parent element to append tag buttons to.
 * @param {string[]} tagList - An array of tag names to create buttons for.
 */
function buildTagButtonListForFiltering(parent, tagList){
  parent.innerHTML = '';
  tagObjList = [];
  tagList.forEach(tag => {
    parent.appendChild(buildTagObject(tag));
  })
}

/**
 * Retrieves an updated list of posts from the server.
 * @returns {Promise<Post[]>} A promise that resolves with an array of updated posts.
 */
async function getNewPostList() {
  try {
    return fetch(`${URL}/get_all_posts`, {method: "GET"}).then(response => response.json());
  } catch (err) {
    alert("there was an error retrieving the posts");
    return [];
  }
}

/**
 * Filters posts based on selected tags and updates the page with filtered posts.
 */
function filterPostsAndUpdatePage(){
  let filteredPosts = [];
  
  tagObjList.forEach(tagObj => {
    if(tagObj.selected) allPosts.forEach(post => {
      if(post.tags.find(post_t => {
        return tagObj.name === post_t;
      })){
        if(!filteredPosts.find((p) => p.timestamp === post.timestamp)){
          filteredPosts.push(post);
        }
      }
    });
  });

  if(filteredPosts.length === 0){
    filteredPosts = allPosts;
  }

  console.log(filteredPosts);

  createPosts(document.getElementById("feed"), filteredPosts);
}

/**
 * Reloads the posts when the refresh button is clicked and updates the filter buttons.
 */
async function reloadPostCallback() {
  try {
    tagObjList = [];
    allPosts = await getNewPostList();
    const allTags = [];
    allPosts.forEach(post => post.tags.forEach(t => {
      if(!allTags.includes(t)) {allTags.push(t);}
    }));

    buildTagButtonListForFiltering(document.getElementById('tag_list_container'), allTags);
    filterPostsAndUpdatePage();
    } catch (error) {
    document.getElementById("feed").innerHTML =
      error;
  }
}

function updateUsername(){
  console.log("Updating username to : " + getCurrentUser())
  document.getElementById("username-display").innerHTML = "Welcome " + getCurrentUser() + "!";
}

refreshButton.addEventListener('click', reloadPostCallback);
document.getElementById("refresh-button").addEventListener("click", reloadPostCallback);

// Change Password Functionality

/**
 * Handles the change password button click event.
 * Prompts the user for a new password and sends a PUT request to update the password.
 */
function handleChangePassword() {
  const newPassword = prompt("Enter your new password:");
  const confirmNewPassword = prompt("Confirm your new password:");

  if (newPassword && confirmNewPassword) {
    if(newPassword !== confirmNewPassword){
      alert("Passwords must match!");
      return;
    }
    
    const username = getCurrentUser();
    
    fetch(`${URL}/change_password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, newPassword })
    })
    .then(response => response.json())
    .then(data => {
      alert(data.message);
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Failed to update password.");
    });
  } else {
    alert("Username and new password are required.");
  }
}

document.addEventListener('DOMContentLoaded', function() {
  const changePasswordButton = document.getElementById('change-password-button');
  if (changePasswordButton) {
    changePasswordButton.addEventListener('click', handleChangePassword);
  } else {
    console.error('Change Password Button not found');
  }
});


export { reloadPostCallback, updateUsername };
