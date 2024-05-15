import PouchDB from "pouchdb";
import pouchdbFind from "pouchdb-find";
PouchDB.plugin(pouchdbFind);
const database = new PouchDB("UYapDB");

function alert(alert_str) {
  console.log("ALERT: " + alert_str);
}

async function doesItemExist(id) {
  try {
    const doc = await database.get(id);
    return true;
  } catch (error) {
    return false;
  }
}

/**
   * Get the next available ID to assign to a post from the IDcounter document. Create the IDcounter document if it does not exist yet.
   */
async function nextId() {
  try {
    const IDcounter = await database.get("IDcounter");
    IDcounter.count++;
    database.put(IDcounter);
    return IDcounter.count;
  } catch (err) {
    console.log("creating counter");
    database.put({ _id: "IDcounter", count: 1 });
    return 1;
  }
}

/**
   * Delete a post from the database
   * @param {string} the ID of the post to delete
   */
async function deletePost(postId) {
  try {
    const thisPost = await database.get(postId);
    await database.remove(thisPost._id, thisPost._rev);
  } catch (error) {
    alert("could not delete post");
  }
}

/**
   * Save a post to the database.
   * @param {object} an object containing all the data of the post
   */
async function savePost(post) {
  try {
    const nxtId = await nextId();
    post._id = nxtId.toString();
    await database.post(post);
  } catch (error) {
    alert("couldn't save post");
  }
}

/**
   * Get all posts in the database
   * @param {object[]} an array of all the posts in the database
   */
async function getAllPosts() {
  try {
    const result = await database.allDocs({ include_docs: true });
    const postList = [];
    result.rows.forEach((row) => {
      //Identify all posts
      if (Object.keys(row.doc).includes("body")) {
        postList.push(row.doc);
      }
    });
    return postList;
  } catch (error) {
    alert("can't get post list");
  }
}

/**
 * Updates the password of an existing user.
 * 
 * @async
 * @function updateUserPassword
 * @param {string} uname - The username of the user.
 * @param {string} newPassword - The new password to set.
 * @returns {Promise<boolean>} - Returns true if the password was updated, false if the user does not exist.
 */

async function updateUserPassword(uname, newPassword) {
  const exists = await doesUserExist(uname);
  if (exists) {
    const user = await database.get(uname);
    // console.log(user);
    user.password = newPassword;
    await database.put(user);
    return true; // Password updated
  }
  return false;
}

/**
 * Saves a new user with the specified username and password.
 * 
 * @async
 * @function saveUser
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @throws {Error} - Throws an error if the user already exists.
 * @returns {Promise<string>} - Returns a success message when the user is saved.
 */
async function saveUser(username, password) {
  const exists = await doesUserExist(username);

  if(exists) throw new Error("User already exists!");
  await database.put({ _id: username, password: password });
  return "User saved successfully";
}

/**
 * Checks if a user exists in the database.
 * 
 * @async
 * @function doesUserExist
 * @param {string} userId - The ID of the user to check.
 * @returns {Promise<boolean>} - Returns true if the user exists, false otherwise.
 */

async function doesUserExist(userId) {
  console.log("User exists running");
  try {
    await database.get(userId);
    return true;
  } catch (error) {
    console.log("user does not exist");
    return false;
  }
}

/**
 * Authenticates a user by checking if the provided password matches the stored password.
 * 
 * @async
 * @function authenticate
 * @param {string} username - The username of the user.
 * @param {string} password - The password to authenticate.
 * @returns {Promise<boolean>} - Returns true if authentication is successful, false otherwise.
 */

async function authenticate(username, password) {
  let user;
  try {
    user = await database.get(username);
  } catch (error) {
    return false;
  }

  return user.password === password;
}

export {
  savePost,
  saveUser,
  doesUserExist,
  authenticate,
  getAllPosts,
  updateUserPassword, // Export the new function
  nextId,
  deletePost,
};
