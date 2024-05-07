import { Post } from "../data_structures/post.js";

let postOne = new Post(
  "hello world",
  "Hey everyone! It's such a beautiful day",
  ["umass", "silly"],
  "helloW1",
  "5"
);

let postTwo = new Post(
  "HELLO",
  "Hey everyone! Today is the big chess tournament!",
  ["umass", "events"],
  "helloW2",
  "10"
);

let postList = [postOne, postTwo];

["user1", "user2", "user3", "user4"].forEach((u, i) => {
  postList.push(
    new Post(
      "Hi!",
      `${u} talking!`,
      ["auto-generated", `tag${i}`],
      u,
      i.toString()
    )
  );
});
/**
 *
 * @param text -- the whole post, the time, the user id and the message the user says
 * @returns a div, which is the post
 */
function createBox(text) {
  let temp = document.createElement("div");
  temp.innerHTML = text;
  temp.classList.add("post-box");
  return temp;
}

/**
 *
 * @param {*} parent:div -- Where we plan on putting all these posts
 * @param {*} posts:array of posts/divs -- all of the posts in our database or arraylist
 */
function createPosts(parent, posts) {
  posts.forEach((post) => {
    let postText =
      "posted " +
      post.timestamp +
      " mins ago<br><br><b>" +
      post.user_id +
      "</b>" +
      " said: <br><br>" +
      post.body +
      "<br><br>Tags: " +
      "<button id ='filterB' style='background-color: #2c2e36; color: white';>" +
      post.tags[0] +
      "</buttonstyle='background-color: #2c2e36; color: white'>" +
      "<button style='background-color: #2c2e36; color: white'>" +
      post.tags[1] +
      "</button>";

    parent.appendChild(createBox(postText));
  });
}

/**
 *
 * @returns a promise where it sends the updated Postlist if resolved
 */

function getNewPostList() {
  return new Promise((resolve, reject) => {
    resolve(postList);
  });
}
/**
 * This function is called when the refresh button is clicked, it refreshes
 * the feed with the newest posts.
 */
async function reloadPostCallback() {
  try {
    createPosts(document.getElementById("feed"), await getNewPostList());
  } catch (error) {
    document.getElementById("feed").innerHTML =
      "Error. There are no posts currently.";
  }
}

document
  .getElementById("refresh-button")
  .addEventListener("click", () => reloadPostCallback());
// document.getElementById("refresh-button").addEventListener("DOMContentLoaded");
export { reloadPostCallback };
