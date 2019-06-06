import { observable, action, decorate, transaction } from 'mobx';

import PostModel from './Models/PostModel';
import DatabaseService from '../Services/DatabaseService';
const uuidv4 = require('uuid/v4');

class PostStore {
  posts = [];
  loading = false
  // changed this to go through database first
  addPost = async (title, body) => {
    /*
    let newPost = new PostModel(title, body);
    let newerPost = await DatabaseService.sendNewPost(title, body, newPost._id);
    this.posts.unshift(PostModel.make(newerPost));
    */

    // Loading logic
    this.loading = true
    DatabaseService.sendNewPost(title, body, uuidv4())
      .then(newPost => {
        this.posts.unshift(PostModel.make(newPost))
        this.loading = false
      })
      .catch(console.log)

  };

  async fetchPosts(refresh=false) {

    /*
    let proto_posts = await DatabaseService.getPosts();
    try {
      this.posts = proto_posts.map(p => PostModel.make(p));
    } catch (err) {
      console.log(err);
      this.posts = [];
    }
    */

    // Loading logic -- ignore for refresh to avoid interruptions to ui
    if (!refresh)   
      this.loading = true

    DatabaseService.getPosts()
      .then(posts => {
        this.posts = posts.map(p => PostModel.make(p))
        this.loading = false  
    })
      .catch(err => {
        console.log(err)
        this.posts = []
      })
  }

  async fetchPost(id) {
    /*
    let proto_post = await DatabaseService.getPost(id);
    let post = PostModel.make(proto_post);
    this.posts.forEach((val, index) => {
      if (val._id === id) {
        this.posts[index] = post;
      }
    });
    */

    // Loading logic
    this.loading = true
    DatabaseService.getPost(id)
      .then(post => {
        this.posts.forEach((val, index) => {
          if (val._id === post._id) {
            this.posts[index] = post;
            this.loading = false
          }
        });
      })
      .catch(err => {
        console.log(err)
      })
  }

  getPost(id) {
    return this.posts.find(val => val._id === id);
  }
}

decorate(PostStore, {
  posts: observable,
  loading: observable,
  addPost: action,
  fetchPosts: action,
  fetchPost: action,
});

let postStore = new PostStore();
export default postStore;
