import { Post } from '../data_structures/post.js';;

let postOne = new Post("hello world","Hey everyone! It's such a beautiful day",["umass", "silly"],"helloW1", "5");

let postTwo = new Post("HELLO","Hey everyone! Today is the big chess tournament!",["umass", "events"],"helloW2", "10");

let postList = [postOne, postTwo];

["user1","user2","user3","user4"].forEach((u,i) => {
  postList.push(new Post("Hi!",`${u} talking!`,["auto-generated",`tag${i}`],u,i.toString()))
})

function createBox(text){
  let temp = document.createElement("div");
  temp.innerHTML = text;
  temp.classList.add('post-box')
  return temp;
  
}

function createPosts(parent, posts) {
  posts.forEach(post => {
    let postText = "posted " + post.timestamp + " mins ago<br><br><b>" + post.user_id + "</b>"+" said: <br><br>" + post.body + "<br><br>Tags: " + "<button id ='filterB' style='background-color: #2c2e36; color: white';>"+post.tags[0]+"</buttonstyle='background-color: #2c2e36; color: white'>" + "<button style='background-color: #2c2e36; color: white'>"+post.tags[1]+"</button>";
     
    parent.appendChild(createBox(postText));
  });
}

createPosts(document.getElementById('feed'), postList)