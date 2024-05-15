import PouchDB from 'pouchdb';
const database = new PouchDB("UYapDB");

async function savePost(post) {
  console.log("in db savepost");
  await database.post(post);
}

async function getAllPosts() {
  const result = await database.allDocs({ include_docs: true });
  const postList = [];
  result.rows.forEach(row => {
    // Identify all posts
    if (Object.keys(row.doc).includes("body")) {
      postList.push(row.doc);
    }
  });
  return postList;
}

async function updateUserPassword(username, newPassword) {
  const result = await database.find({ selector: { username } });
  if (result.docs.length > 0) {
    const user = result.docs[0];
    user.password = newPassword;
    await database.put(user);
    return true; // Password updated
  }
  return false; // User not found
}

function getPostsInTimeFrame(start_time, end_time) {}

function getPostsByTag(tag) {}

function saveUser(user) {}

function getAuthentication(username, password) {}

export {
  savePost,
  getPostsInTimeFrame,
  getPostsByTag,
  saveUser,
  getAuthentication,
  getAllPosts,
  updateUserPassword // Export the new function
};
