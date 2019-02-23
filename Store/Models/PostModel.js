import { observable, action, transaction} from "mobx"
const uuidv4 = require('uuid/v4');

import DatabaseService from '../../Services/DatabaseService'
import CommentModel from "./CommentModel";

export default class PostModel {
    title = "";
    body = "";
    _id = "";
    @observable userVote = 0;
    @observable score = 0;
    @observable userReact = "none";
    @observable reactCounts = {
        "angry": 0,
        "funny": 0,
        "love": 0,
        "sad": 0,
        "wow": 0
    };
    @observable comments = []

    constructor(title, body) {
        this.title = title
        this.body = body
        this._id = uuidv4()
    }

    static make(newPost) {
        let proto_post = new PostModel(newPost.title, newPost.body);
        proto_post._id = newPost._id;
        proto_post.score = newPost.score;
        proto_post.userVote = newPost.userVote;
        proto_post.userReact = newPost.userReact;
        proto_post.reactCounts = newPost.reactCounts;
        proto_post.comments = newPost.comments.map(c => observable(CommentModel.make(c)));
        // proto_post.comments = newPost.comments

        return proto_post
    }

    @action updateReact(old_react, new_react) {
        this.userReact = new_react;
        this.reactCounts[old_react] -= 1;
        this.reactCounts[new_react] += 1;
        DatabaseService.updateReact(this._id, new_react)
    }

    @action updateVote(new_vote, postid) {
        this.userVote = new_vote
        DatabaseService.updateVotes(postid, new_vote)
    }

    @action addComment = (body) => {
        console.log("In addComment")
        console.log(body)
        let newComment = new CommentModel(body)
        console.log(newComment)
        this.comments.push(newComment)
        DatabaseService.postComment(this._id, body, newComment._id)
    }

    @action async update() {
        let proto_post = await DatabaseService.getPost(this._id)
        let post = PostModel.make(proto_post)

        transaction(() => {
            this.votes = post.votes
            this.score = post.score
            this.reactCounts = post.reactCounts
            this.reacts = post.reacts
            this.comments = post.comments
        })
    }

}
