import { observable, computed, action, decorate } from "mobx"

class PostStore {
    posts = []

    addPost = (post) => {
        this.posts = post
        console.log("hello")
    }
}

decorate(
    PostStore,
    {
        posts: observable,
        addPost: action
    }
)

postStore = new PostStore()
export default postStore