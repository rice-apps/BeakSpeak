import { observable, computed, action, extendObservable, set, transaction, decorate} from "mobx"

import PostModel from './Models/PostModel'
import DatabaseService from '../Services/DatabaseService'

class PostStore {
    posts = []

    addPost = (title, body) => {
        let newPost = new PostModel(title, body)
        this.posts.unshift(newPost)
        DatabaseService.sendNewPost(title, body, newPost._id) // send post to database -- no need to await
    }

    async fetchPosts() {
        let proto_posts = await DatabaseService.getPosts()
        try {
            this.posts = proto_posts.map(p => PostModel.make(p))
        }
        catch(err) {
            console.log(err)
            this.posts = []
        }
    }

    async fetchPost(id) {
        let proto_post = await DatabaseService.getPost(id)
        let post = PostModel.make(proto_post)
        this.posts.forEach((val, index) => {
            if (val._id == id) {
                this.posts[index] = post
            }
        })
    }
}

decorate(
    PostStore,
    {
        posts: observable,
        addPost: action,
        fetchPosts: action,
        fetchPost: action
    }
)

postStore = new PostStore()
export default postStore