import PouchDB from 'pouchdb';
const database = new PouchDB("UYapDB");

async function savePost(post) {
    console.log("in db savepost");
  await database.post(post);
}

async function getAllPosts(){
    const result = await database.allDocs({ include_docs: true });
    const postList = [];
    result.rows.forEach(row => {
        //Identify all posts
      if(Object.keys(row.doc).includes("body")){
        postList.push(row.doc);
      }
    });
    return postList;
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
    getAllPosts
};