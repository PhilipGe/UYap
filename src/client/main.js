import { sendPost } from "./create_post/create_post.js";
import reloadPostCallback from ".home/home.js";
let current_page = "login-page";

const page_list = [
  "login-page",
  "signup-page",
  "home-page",
  "create-post-page",
];

const HOMEcreatePostButton = document.getElementById('HOME-create-post-button');
const profileButton = document.getElementById('profile-button');
const submitPostButton = document.getElementById('submit-post');
const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');
const signUpHere = document.getElementById('sign-up-here');
const loginHere = document.getElementById('log-in-here');
const refreshButton = document.getElementById("refresh-button");

function transitionToPage(page_id) {
    page_list.forEach((id) => {
        document.getElementById(id).style.visibility = "hidden";
    });
    
  current_page = page_id;
  document.getElementById(page_id).style.visibility = "visible";
}

transitionToPage("home-page");
reloadPostCallback();


HOMEcreatePostButton.addEventListener('click', () => transitionToPage('create-post-page'));
profileButton.addEventListener('click', () => transitionToPage('login-page'));
submitPostButton.addEventListener('click', () => {
  sendPost().then(() => 
    transitionToPage('home-page'));
    reloadPostCallback();
  });
loginButton.addEventListener('click', () => {
  transitionToPage('home-page');
  reloadPostCallback();

});
signupButton.addEventListener('click', () => {
  transitionToPage('home-page');
  reloadPostCallback();

});
signUpHere.addEventListener('click', () => {
  transitionToPage('signup-page');
})
loginHere.addEventListener('click', () => {
  transitionToPage('login-page');
})