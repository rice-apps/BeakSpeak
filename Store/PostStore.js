import { observable, computed, action, extendObservable} from "mobx"
const uuidv4 = require('uuid/v4')

import DatabaseService from '../Services/DatabaseService'

class PostStore {
    @observable posts = []
    @observable number = true

    @action addPost = (title, body) => {
        console.log("fuck you")
        let newPost = new PostModel(title, body)
        this.posts.push(newPost)
        console.log(newPost.id)
        DatabaseService.sendNewPost(title, body, newPost.id) // send post to database -- no need to await

    }
}

const PostModel = function(title, body) {
    extendObservable(this, {
        title: title,
        body: body,
        id: uuidv4(), // create out of time stamp + hashed username
        userReact: null,
        votes: [],
        score: 0,
        reacts: {},
        reactCounts: {
            "angry": 0,
            "funny": 0,
            "love": 0,
            "sad": 0,
            "wow": 0
        }
    })
}

postStore = new PostStore()
export default postStore