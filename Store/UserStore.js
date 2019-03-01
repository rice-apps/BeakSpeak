import { observable, action, decorate} from "mobx"

class UserStore {
    @observable token = "";

    constructor() {}

    getToken() {
        return this.token;
    }

    @action setToken(token) {
        this.token = token;
    }

}

decorate(UserStore, {
    token: observable,
    setToken: action
})

let userStore = new UserStore();
export default userStore