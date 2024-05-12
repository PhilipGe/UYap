import express from 'express';
import * as db from './db_functions.js';

const app = express();
app.use(express.static("src/client"));
app.use(express.json());

app.get("/get_all_posts", async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'application/json' });

  const result = await db.getAllPosts();
  res.end(JSON.stringify(result));
})

app.post("/savepost", async (req, res) => {
  db.savePost(req.body.post);
  res.end();
});

app.delete("/deletepost/:id", async (req, res) => {
  console.log("id that server received: ", req.params.id);
  db.deletePost(req.params.id);
})

const PORT = 3260;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});