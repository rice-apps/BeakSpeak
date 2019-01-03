import { observable, computed, action, extendObservable, set} from "mobx"
const uuidv4 = require('uuid/v4')

import DatabaseService from '../Services/DatabaseService'

class PostStore {
    @observable posts = []
    @observable number = true

    @action addPost = (title, body) => {
        let newPost = new PostModel(title, body)
        this.posts.unshift(newPost)
        console.log(newPost)
        DatabaseService.sendNewPost(title, body, newPost.id) // send post to database -- no need to await
    }
}

export class PostModel {
    title = ""
    body = ""
    id = ""
    @observable votes = []
    @observable score = 0
    @observable reacts = {}
    @observable reactCounts = {
        "angry": 0,
        "funny": 0,
        "love": 0,
        "sad": 0,
        "wow": 0
    }
    
    constructor(title, body) {
        this.title = title
        this.body = body
        this.id = uuidv4()
    }

    @computed get userVote() {
        for (var i = 0; i < this.votes.length; i++) {
            if (votes[i].user == '5b5f9a9ade57b741ffc3e61e') {
                return votes[i].vote
            }
        }
    }

    @computed get userReact() {
        console.log("user react retrieved")
        return this.reacts['5b5f9a9ade57b741ffc3e61e']
    }

    set userReact(react) {
        this.reacts['5b5f9a9ade57b741ffc3e61e'] = react
        DatabaseService.updateReact(this.id, this.react)
    }

}

postStore = new PostStore()
export default postStore