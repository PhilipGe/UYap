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

// async function removeAll() {
//   console.log("in remove all");
//   const result = await database.allDocs({ include_docs: true });

//   const promises = result.rows.map(async row => {
//       await database.remove(row.doc._id, row.doc._rev);
//   });

//   await Promise.all(promises);
// }

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

async function deletePost(postId) {
  try {
    const thisPost = await database.get(postId);
    await database.remove(thisPost._id, thisPost._rev);
  } catch (error) {
    alert("could not delete post");
  }
}

async function savePost(post) {
  try {
    const nxtId = await nextId();
    post._id = nxtId.toString();
    await database.post(post);
  } catch (error) {
    alert("couldn't save post");
  }
}

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

function getPostsInTimeFrame(start_time, end_time) {}

function getPostsByTag(tag) {}

//TODO
async function saveUser(username, password) {
  const exists = await doesUserExist(username);

  if(exists) throw new Error("User already exists!");
  await database.put({ _id: username, password: password });
  return "User saved successfully";
}

//TODO
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

//TODO
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
  getPostsInTimeFrame,
  getPostsByTag,
  saveUser,
  doesUserExist,
  authenticate,
  getAllPosts,
  updateUserPassword, // Export the new function
  nextId,
  deletePost,
};
