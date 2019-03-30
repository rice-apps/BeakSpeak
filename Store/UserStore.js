import { observable, action, decorate } from 'mobx';

class UserStore {
    token = ""
    //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJubnExIiwiYXR0cmlidXRlcyI6eyJlZHVQZXJzb25QcmltYXJ5QWZmaWxpYXRpb24iOiJzdHVkZW50In19LCJ1c2VySUQiOiI1YjVmOWE5YWRlNTdiNzQxZmZjM2U2MWUiLCJpYXQiOjE1MzI5OTIxNTR9.cr29eYKLTpaAuqcpk08XtrMt6FZj9S8Yvll3rzEMYus";

    getToken() {
        return this.token;
    }

    getConnected() {
        return this.isConnected;
    }

    setConnected(connected) {
        this.isConnected = connected;
    }

    setToken(token) {
        this.token = token;
    }
}

decorate(UserStore, {
    token: observable,
    setToken: action,
    isConnected: observable,
    setConnected: action
})

let userStore = new UserStore();
export default userStore;
