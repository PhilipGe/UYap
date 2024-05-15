/**
   * Get the tags selected from user input
   *
   * @returns {string} the username of active user or an empty string if there is currently no one logged in
   */
function getCurrentUser() {
    // change to fetch from server later
    const lastLoggedInUser = localStorage.getItem("last-user");
    const active = localStorage.getItem("session-active");

  if (active && lastLoggedInUser) {
    return lastLoggedInUser;
  } else {
    return "";
  }
}

export {
    getCurrentUser
};