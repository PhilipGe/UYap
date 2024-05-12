import { sendPost } from "./create_post/create_post.js";
import { reloadPostCallback, updateUsername } from "./home/home.js";

/**
 * Tracks the current page ID as a string.
 * @type {string}
 */
let current_page = "login-page";

/**
 * A list of valid page IDs for navigation.
 * @type {string[]}
 */
const page_list = [
  "login-page",
  "signup-page",
  "home-page",
  "create-post-page",
];

// DOM element references
const HOMEcreatePostButton = document.getElementById("HOME-create-post-button");
const profileButton = document.getElementById("profile-button");
const submitPostButton = document.getElementById("submit-post");
const loginButton = document.getElementById("login-button");
const signupButton = document.getElementById("signup-button");
const signUpHere = document.getElementById("sign-up-here");
const loginHere = document.getElementById("log-in-here");

/**
 * Changes the visibility of pages to show the specified page only.
 * Triggers additional actions when navigating to certain pages.
 * @param {string} page_id - The ID of the page to navigate to.
 */
function transitionToPage(page_id) {
  page_list.forEach((id) => {
    document.getElementById(id).style.visibility = "hidden";
  });

  current_page = page_id;
  document.getElementById(page_id).style.visibility = "visible";
  if (page_id === "home-page") {
    reloadPostCallback();
  }
}

// Event listeners for user interface interactions
HOMEcreatePostButton.addEventListener("click", () =>
  transitionToPage("create-post-page")
);
profileButton.addEventListener("click", () => {
  localStorage.setItem("session-active", false);
  transitionToPage("login-page");
});
submitPostButton.addEventListener("click", () => {
  sendPost().then(() => transitionToPage("home-page"));
});
signUpHere.addEventListener("click", () => {
  transitionToPage("signup-page");
});
loginHere.addEventListener("click", () => {
  transitionToPage("login-page");
});

/**
 * Checks local storage for session status and decides the initial page to display.
 */
document.addEventListener("DOMContentLoaded", () => {
  const existsOldSession = JSON.parse(localStorage.getItem("session-active"));
  if (existsOldSession) {
    console.log("Running this");
    transitionToPage("home-page");
  } else {
    transitionToPage("login-page");
  }
});

export { transitionToPage };
