import { transitionToPage } from "../main.js";
import { updateUsername } from "../home/home.js"

const URL = "http://localhost:3260";

/**
 * Attempts to log in a user and sets the username in local storage if successful.
 * Uses local storage to check if the provided credentials match the stored values.
 * @param {string} username - The username input from the user.
 * @param {string} password - The password input from the user.
 * @returns {Promise<void>} Promise that resolves to true if login is successful, false otherwise.
 */
async function loginUser(username, password) {
  
  const res = await fetch(`${URL}/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username: username,
      password: password
    })
  });

  if(res.status === 200){
    const success = (await res.json()).success;
    if(success) return true;
    else return false;
  }


  throw new Error(await res.text());

}

/**
 * Validates the password requirements.
 * Ensures the password is at least 8 characters long and contains at least one number and one letter.
 * @param {string} password - The password input from the user.
 * @returns {boolean} True if the password meets the requirements, false otherwise.
 */
function validatePassword(password) {
  return (
    password.length >= 8 && /[a-zA-Z]/.test(password) && /\d/.test(password)
  );
}

/**
 * Registers a new user, stores credentials in local storage.
 * Handles validation of the password and checks if the user already exists.
 * @param {string} username - The username input from the user.
 * @param {string} password - The password input from the user.
 * @returns {Promise<void>} Promise that resolves when user is created, or rejects if user exists or password is invalid.
 */
async function registerUser(username, password, password_confirm) {
  if (password_confirm !== password) {
    throw new Error("Passwords do not match!");
  }

 const res = await fetch(`${URL}/create_user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    })
  
  if(res.status === 200){
    return;
  }

  throw new Error(await res.text());
}

// Automatically populate the username field if a last logged-in user exists
document.addEventListener("DOMContentLoaded", () => {
  const lastLoggedInUser = localStorage.getItem("last-user");
  if (lastLoggedInUser) {
    document.getElementById("username").value = lastLoggedInUser;
  }
});

// Handle login form submission
document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    loginUser(username, password).then(
      loginSuccessful => {
        if(loginSuccessful){
          document.getElementById("password").value = "";

          transitionToPage("home-page");
          localStorage.setItem("last-user", username);
          updateUsername();
        }else{
          alert("Incorrect username or password.");
        }
      }
    ).catch(err => alert(err.message));
    localStorage.setItem("session-active", true);
  });

// Handle signup form submission
document
  .getElementById("signupForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    const confirm_password = document.getElementById("confirmPassword").value;

    registerUser(username, password, confirm_password)
      .then((v) => {
        document.getElementById("newUsername").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";

        transitionToPage("home-page");
        localStorage.setItem("last-user", username);
        updateUsername();
        localStorage.setItem("session-active", true);
      })
      .catch((error) => {
        console.error(error);
        alert(error);
      });
  });
