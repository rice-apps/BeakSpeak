import { observable, action, transaction, decorate } from 'mobx';

import DatabaseService from '../../Services/DatabaseService';
import CommentModel from './CommentModel';
const uuidv4 = require('uuid/v4');

export default class PostModel {
  title = '';
  body = '';
  _id = '';
  date = '';
  userVote = 0;
  score = 0;
  userReact = 'none';
  reactCounts = {
    angry: 0,
    funny: 0,
    love: 0,
    sad: 0,
    wow: 0,
  };
  comments = [];

    constructor(title, body) {
        this.title = title;
        this.body = body;
        this._id = uuidv4();
    }

  static make(newPost) {
    let proto_post = new PostModel(newPost.title, newPost.body);
    proto_post._id = newPost._id;
    proto_post.date = newPost.date;
    proto_post.score = newPost.score;
    proto_post.userVote = newPost.userVote;
    proto_post.userReact = newPost.userReact;
    proto_post.reactCounts = newPost.reactCounts;
    proto_post.comments = newPost.comments.map(c => CommentModel.make(c));
    return proto_post;
  }

    updateReact(old_react, new_react) {
        this.userReact = new_react;
        this.reactCounts[old_react] -= 1;
        this.reactCounts[new_react] += 1;
        DatabaseService.updateReact(this._id, new_react);
    }

    updateVote(new_vote, postid) {
        this.userVote = new_vote;
        DatabaseService.updateVotes(postid, new_vote);
    }

    addComment(body) {
        let new_comment = new CommentModel(body);
        this.comments.push(new_comment);
        DatabaseService.postComment(this._id, new_comment);
    }

    async update() {
        let proto_post = await DatabaseService.getPost(this._id);
        if (proto_post) {
            let post = PostModel.make(proto_post);
            transaction(() => {
                this.votes = post.votes;
                this.score = post.score;
                this.reactCounts = post.reactCounts;
                this.reacts = post.reacts;
                this.comments = post.comments;
            });
        }
    }
}

decorate(PostModel, {
  userVote: observable,
  userReact: observable,
  date: observable,
  score: observable,
  reactCounts: observable,
  comments: observable,
  updateReact: action,
  updateVote: action,
  addComment: action,
  update: action,
});
