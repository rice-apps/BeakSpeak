import { observable, action} from "mobx"

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


let userStore = new UserStore();
export default userStore