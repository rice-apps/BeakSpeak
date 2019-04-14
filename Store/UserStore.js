import { observable, action, decorate } from 'mobx';
import {NetInfo} from 'react-native'

class UserStore {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJubnExIiwiYXR0cmlidXRlcyI6eyJlZHVQZXJzb25QcmltYXJ5QWZmaWxpYXRpb24iOiJzdHVkZW50In19LCJ1c2VySUQiOiI1YjVmOWE5YWRlNTdiNzQxZmZjM2U2MWUiLCJpYXQiOjE1MzI5OTIxNTR9.cr29eYKLTpaAuqcpk08XtrMt6FZj9S8Yvll3rzEMYus";
    sortScheme = "hot"
    isConnected = true
    constructor() {
        NetInfo.isConnected.fetch().then(conn => this.isConnected = conn)
    }
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

    getSortScheme() {
        return this.sortScheme;
    }

    setSortScheme(sortScheme) {
        this.sortScheme = sortScheme
    }
}

decorate(UserStore, {
    token: observable,
    setToken: action,
    isConnected: observable,
    setConnected: action,
    sortScheme: observable,
    setSortScheme: action
})

let userStore = new UserStore();
export default userStore;
