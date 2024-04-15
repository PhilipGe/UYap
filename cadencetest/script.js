const pb = document.getElementById("body-text");
const b = document.getElementById("submit");
const l = document.getElementById("loading");
const t = document.getElementById("title-text");

let allPosts = [];

b.addEventListener("click", (event) => {
    sendPost();
});

async function sendPost() {
    l.textContent = "Sending post...";
    return new Promise((resolve, reject) => {
        setTimeout(
        () => {
            let post = {};
            post.body = pb.value;
            post.user_id = 132342;
            post.time_stamp = Date.now();
            post.title = t.value;
            allPosts.push(post);
            console.log(allPosts);

            l.textContent = "";
            pb.value = "";
            t.value = "";
            resolve(1);
        },

        Math.random() * 1000 + 1000,
        );
  });
}

