import { transitionToPage } from "../main.js";
import {
  doesUserExist,
  saveUser,
  authenticate,
} from "../db/db_functions_2.js";
// Person and Post data structures could be defined here if needed

// function dummyBackendAuthOutput(username, password){
//     return new Promise((resolve, reject) => {
//         resolve(true);
//     });
// }

/**
 * Attempts to log in a user and sets the username in local storage if successful.
 * Uses local storage to check if the provided credentials match the stored values.
 * @param {string} username - The username input from the user.
 * @param {string} password - The password input from the user.
 * @returns {Promise<boolean>} Promise that resolves to true if login is successful, false otherwise.
 */
function loginUser(username, password) {
  return new Promise((resolve, reject) => {
    // Retrieve credentials from local storage
    authenticate(username, password)
      .then((valid) => {
        // register new user login on localStorage
        if(valid){
            transitionToPage("home-page");
            localStorage.setItem("last-user", username);
            updateUsername();
        }else{
            alert("Incorrect username or password.");
        }
      })
      .catch((err) => {
        alert("Incorrect username or password.");
      });
  });
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

// /**
//  * Simulates a database check to see if a username exists in local storage.
//  * @param {string} username - The username to check.
//  * @returns {Promise<boolean>} Promise that resolves to true if user exists, false otherwise.
//  */
// function doesUserExist(username) {
//     return new Promise(resolve => {
//         // Simulate checking the local storage for an existing username
//         // const existingUsername = localStorage.getItem('username');
//         resolve(false);
//     });
// }

/**
 * Registers a new user, stores credentials in local storage.
 * Handles validation of the password and checks if the user already exists.
 * @param {string} username - The username input from the user.
 * @param {string} password - The password input from the user.
 * @returns {Promise<void>} Promise that resolves when user is created, or rejects if user exists or password is invalid.
 */
function registerUser(username, password, password_confirm) {
  return new Promise((resolve, reject) => {
    if (password_confirm !== password) {
      reject("Passwords do not match!");
    }

    doesUserExist(username).then(async (exists) => {
      if (!exists && validatePassword(password)) {
        // TODO: Stick in call for database saving (await)
        await saveUser(username, password);
        resolve("User saved successfully");
      } else if (exists) {
        console.log("Here!");
        reject("User already exists");
      } else {
        reject(
          "Password does not meet requirements. Must be characters and have a number and letter in it."
        );
      }
    });
  });
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
    loginUser(username, password);
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
      .then(() => {
        transitionToPage("home-page");
        localStorage.setItem("last-user", username);
        updateUsername();
        localStorage.setItem("session-active", true);
      })
      .catch((error) => {
        alert(error);
      });
  });
