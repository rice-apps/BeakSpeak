import { observable, action, decorate } from 'mobx';
import {NetInfo} from 'react-native'

class UserStore {
    token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJubnExIiwiYXR0cmlidXRlcyI6eyJlZHVQZXJzb25QcmltYXJ5QWZmaWxpYXRpb24iOiJzdHVkZW50In19LCJ1c2VySUQiOiI1YjVmOWE5YWRlNTdiNzQxZmZjM2U2MWUiLCJpYXQiOjE1MzI5OTIxNTR9.cr29eYKLTpaAuqcpk08XtrMt6FZj9S8Yvll3rzEMYus";
    sortScheme = "hot"
    isConnected = true
    isLoading = false
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
        this.sortScheme = sortScheme.toLowerCase()
    }

    getLoading() {
        return this.getLoading;
    }
    setLoading(loading) {
        this.isLoading = loading;
    }
}

decorate(UserStore, {
    token: observable,
    setToken: action,
    isConnected: observable,
    isLoading: observable,
    setConnected: action,
    sortScheme: observable,
    setSortScheme: action,
    setLoading: action
})

let userStore = new UserStore();
export default userStore;
