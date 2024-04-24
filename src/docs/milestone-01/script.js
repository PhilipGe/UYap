// document.getElementById('vision')
// document.createElement()

let post = {
    username : "",
    text : "",
    time : 0,
    filter : []
};
let listPost = [];

let postOne = {
    username : "helloW1",
    text:"Hey everyone! It's such a beautiful day",
    time: 1220,
    filter: ["Umass", "Silly"]
}

let postTwo= {
    username : "helloW2",
    text:"Hey everyone! Today is the big chess tournament!",
    time: 1220,
    filter: ["Umass", "Events"]
}


Array.from(document.getElementsByClassName('wf-img')).forEach(e => {
    console.log(e);
    e.addEventListener('click', () =>{
        e.style.width === "1000px" ? e.style.width = "500px" : e.style.width = "1000px" ;
    });
});
sfdsfg d
