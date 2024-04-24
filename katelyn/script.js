import { Post } from './post.js';;

let postOne = new Post("hello world","Hey everyone! It's such a beautiful day",["umass", "silly"],"helloW1", "5");

let postTwo = new Post("HELLO","Hey everyone! Today is the big chess tournament!",["umass", "events"],"helloW2", "10");

let postList = [postOne, postTwo];

function createBox(text){
  let temp = document.createElement("div");
  temp.style.height = "130%";
  temp.style.width ="90%";
  temp.style.backgroundColor = "maroon";
  temp.style.margin = "15px";
  temp.innerHTML = text;
  temp.style.color = "white";
  temp.style.borderRadius = "10px";
  temp.style.margin= "15px auto";
  temp.style.paddingLeft="15px"
  
  return temp;
  
}

function createPost(post) {
  postList.forEach(post => {
    let postText = "posted " + post.timestamp + " mins ago<br><br><b>" + post.user_id + "</b>"+" said: <br><br>" + post.body + "<br><br>Filters: " + "<button id ='filterB' style='background-color: maroon; color: #00ff00';>"+post.tags[0]+"</buttonstyle='background-color: maroon; color: #00ff00'>" + "<button style='background-color: maroon; color: #00ff00'>"+post.tags[1]+"</button>";
     
    document.body.appendChild(createBox(postText));
  });
}
createPost();