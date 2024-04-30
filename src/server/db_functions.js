import pouchdb from 'pouchdb';

const database = new pouchdb('UYapDB')

function savePost(user_id, post) {
//saves in database using pouchdb
    database.put(
        // Something
    )
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
    getAuthentication
};