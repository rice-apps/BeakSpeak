import DatabaseService from "../Services/DatabaseService";
import CommentModel from "./Models/CommentModel";
import {action, decorate, observable} from "mobx"
import React from 'react'
import PostStore from './PostStore';

class CommentStore {

    comments = {};

    async fetchComments() {
        let posts = PostStore.posts;

        for (let p in posts) {
            let proto_comments = posts[p].comments;
            try {
                this.comments[posts[p]._id] = proto_comments.map(c => CommentModel.make(c));
            }
            catch (err) {
                this.comments[posts[p]._id] = [];
            }
        }
    };

    addComment = (postid, comment_body) => {
        let newComment = new CommentModel(comment_body)
        if (!(postid in this.comments)) {
            this.comments[postid] = [];
        }
        this.comments[postid].push(newComment)

        DatabaseService.postComment(postid, newComment)
    }

    getComments = (postid) => {
        if (!(postid in this.comments)) {
            this.comments[postid] = [];
        }
        return this.comments[postid]
    }

}

decorate(
    CommentStore,
    {
        comments: observable,
        addComment: action,
        fetchComments: action

    }
);

commentStore = new CommentStore();
export default commentStore