const database = new PouchDB('UYapDB')

async function savePost(post) {
    await database.post(post);
}

async function getPostsByTag(tag) {
    const results = await Promise.all([
        database.createIndex({
            index: {fields: ['tags']}
        }),
        database.find({
            selector: {
            tags: { $elemMatch: { $eq: tag } }
            }
        })
    ]);

    return results[1].docs;
}

//function getPostsInTimeFrame(start_time, end_time) {}

async function saveUser(username, password) {
    await database.put({_id: username, password: password});
}

async function doesUserExist(userId) {
    console.log("User exists running");
    try {
        await database.get(userId);
        return true;
    } catch(error) {
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

export {
    savePost,
    doesUserExist,
    getPostsByTag,
    saveUser,
    authenticate
};
