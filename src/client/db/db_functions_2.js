const database = new PouchDB("UYapDB");

// async function savePost(post) {
//   await database.post(post);
// }

// async function getAllPosts(){
//     const result = await database.allDocs({ include_docs: true });
//     const postList = [];
//     result.rows.forEach(row => {
//         //Identify all posrs
//       if(Object.keys(row.doc).includes("body")){
//         postList.push(row.doc);
//       }
//     });
//     return postList;
// }

// async function getPostsByTag(tag) {
//   const results = await Promise.all([
//     database.createIndex({
//       index: { fields: ["tags"] },
//     }),
//     database.find({
//       selector: {
//         tags: { $elemMatch: { $eq: tag } },
//       },
//     }),
//   ]);

//   return results[1].docs;
// }

// async function getPostsByTagListExclusive(tagList) {
//   const postlist = [];

//   tagList.forEach(async (tag) => {
//     postlist.push(await getPostsByTag(tag));
//   });

//   return postlist.filter((post) =>
//     post.tags.reduce((acc, t) => tagList.contains(t) && acc, true)
//   );
// }

//function getPostsInTimeFrame(start_time, end_time) {}

async function saveUser(username, password) {
  await database.put({ _id: username, password: password });
}

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

async function authenticate(username, password) {
  let user;
  try {
    user = await database.get(username);
  } catch (error) {
    return false;
  }

  return user.password === password;
}

export { doesUserExist, saveUser, authenticate };