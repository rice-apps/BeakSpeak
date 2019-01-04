import { observable, computed, action, extendObservable, set, transaction} from "mobx"
const uuidv4 = require('uuid/v4')

import DatabaseService from '../Services/DatabaseService'

class PostStore {
    @observable posts = []

    @action addPost = (title, body) => {
        let newPost = new PostModel(title, body)
        this.posts.unshift(newPost)
        DatabaseService.sendNewPost(title, body, newPost._id) // send post to database -- no need to await
    }

    @action async fetchPosts() {
        let proto_posts = await DatabaseService.getPosts()
        this.posts = proto_posts.map(p => PostModel.make(p))
    }

    @action async fetchPost(id) {
        let proto_post = await DatabaseService.getPost(id)
        let post = PostModel.make(proto_post)
        this.posts.forEach((val, index) => {
            if (val._id == id) {
                this.posts[index] = post
            }
        })
    }
}

export class PostModel {
    title = ""
    body = ""
    _id = ""
    @observable userVote = 0
    @observable score = 0
    @observable userReact = "none"
    @observable reactCounts = {
        "angry": 0,
        "funny": 0,
        "love": 0,
        "sad": 0,
        "wow": 0
    }
    @observable comments = []

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

    @action updateReact(old_react, new_react) {
        this.userReact = new_react
        this.reactCounts[old_react] -= 1
        this.reactCounts[new_react] += 1
        DatabaseService.updateReact(this._id, new_react)
    }

    @action async update() {
        console.log("updating")
        let proto_post = await DatabaseService.getPost(this._id)
        let post = PostModel.make(proto_post)

        transaction(() => {
            this.votes = post.votes
            this.score = post.score
            this.reactCounts = post.reactCounts
            this.reacts = post.reacts
        })
    }

}

postStore = new PostStore()
export default postStore