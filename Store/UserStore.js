import { observable, action, decorate, computed} from "mobx"

class UserStore {
    token = "";

    getToken() {
        return this.token;
    }

    setToken(token) {
        this.token = token;
    }

}

decorate(UserStore, {
    token: observable,
    setToken: action
})
let userStore = new UserStore();
export default userStore