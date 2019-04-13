import postStore from "../Store/PostStore";
import userStore from "../Store/UserStore";
import commentStore from "../Store/CommentStore";

class RootStore {
    constructor() {
        this.userStore = userStore;
        this.postStore = postStore;
        this.commentStore = commentStore;
    }
}

let rootStore = new RootStore();
export default rootStore