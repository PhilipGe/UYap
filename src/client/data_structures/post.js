class Post {
  // Post(title: string, body: string, tags: string
  constructor(title, body, tags, user_id, timestamp) {
    this.title = title;
    this.body = body;
    this.tags = tags;
    this.user_id = user_id;
    this.timestamp = timestamp;
    this.type = 'POST';
  }
}
export { Post };

