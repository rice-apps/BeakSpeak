import { observable, action, transaction, decorate} from "mobx"
const uuidv4 = require('uuid/v4')

import DatabaseService from '../../Services/DatabaseService'
import CommentModel from "./CommentModel";

export default class PostModel {
    title = ""
    body = ""
    _id = ""
    userVote = 0
    score = 0
    userReact = "none"
    reactCounts = {
        "angry": 0,
        "funny": 0,
        "love": 0,
        "sad": 0,
        "wow": 0
    }

    constructor(title, body) {
        this.title = title
        this.body = body
        this._id = uuidv4()
    }

    static make(newPost) {
        let proto_post = new PostModel(newPost.title, newPost.body)
        proto_post._id = newPost._id
        proto_post.score = newPost.score
        proto_post.userVote = newPost.userVote
        proto_post.userReact = newPost.userReact
        proto_post.reactCounts = newPost.reactCounts
        return proto_post
    }

    updateReact(old_react, new_react) {
        this.userReact = new_react
        this.reactCounts[old_react] -= 1
        this.reactCounts[new_react] += 1
        DatabaseService.updateReact(this._id, new_react)
    }

    updateVote(new_vote, postid) {
        this.userVote = new_vote
        DatabaseService.updateVotes(postid, new_vote)
    }

    addComment(body) {
        let new_comment = new CommentModel(body)
        this.comments.push(new_comment)
        DatabaseService.postComment(this._id, new_comment)
    }

    async update() {
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

decorate(PostModel, {
    userVote: observable,
    userReact: observable,
    score: observable,
    reactCounts: observable,
    comments: observable,
    updateReact: action,
    updateVote: action,
    addComment: action,
    update: action
})
