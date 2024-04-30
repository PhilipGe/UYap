import express from 'express';
import * as db from './db_functions.js';

const app = express();

// Cadence + Katelyn
app.post("/savepost", (req, res) => {
  // body: { post: Post, user_id: number }

  console.log('Save!');
  const post = req.body.post;

  db.savePost(post);

  res.status(400).send('Post saved!');
});

// Philip
app.get("/get_post_within_time_frame", (req, res) => {
  // body: { start_time: string, end_time: string, user_id: number }
  const posts = db.getPostsInTimeFrame(req.body.start_time, req.body.end_time);

  res.status(400).send(JSON.stringify(
    {posts: posts}
  ));
});

// Katelyn + Katelyn
app.get("/get_post_by_tag", (req, res) => {
    // body: { tags: string[] }
    const posts = db.getPostsByTag(req.body.tags);

});

// Mike
app.post("/saveuser", (req, res) => {
    // body: { user: User }

    // Send back user_id on sucess
});

// Mike + Philip
app.get("/getauthentication", (req, res) => {
    // Not sure

    // Send back 'Sucessful authentication' method
});

const PORT = 3260;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});