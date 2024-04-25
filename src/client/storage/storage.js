// // Import PouchDB module
// // import Pouch from '//cdn.jsdelivr.net/npm/pouchdb@8.0.1/dist/pouchdb.min.js';

// import { Post } from "../data_structures/post.js";

// class Storage {

//     constructor(){
//         this.db = new PouchDB('my_db');
//     }
    
//     static #store = new Storage();
//     static get_instance(){
//         return this.#store;
//     }

//     savePost(post){
//         this.db.put({_id:'007', type:'POST'});
//     }

//     getAllPosts(){
//         return this.db.bulkGet({docs:['005']}, {revs: false, attachments: false});
//     }
// }

// const post1 = new Post('one', 'two', 'three', 'four', 'five');
// const post2 = new Post('three', 'two', 'three', 'four', 'five');

// Storage.get_instance().savePost(post1);
// // Storage.get_instance().savePost(post2);
// Storage.get_instance().getAllPosts();