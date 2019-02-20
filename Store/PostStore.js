import { observable, computed, action, extendObservable, set, transaction} from "mobx"

import PostModel from './Models/PostModel'
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
        try {
            this.posts = proto_posts.map(p => PostModel.make(p))
        }
        catch(err) {
            this.posts = []
        }
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


postStore = new PostStore()
export default postStore