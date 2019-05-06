import { observable, action, decorate } from 'mobx';
import {NetInfo} from 'react-native'
import {SecureStore} from 'expo'

import {CONFIG} from '../config.js'
apiUrl = CONFIG.api_url
class UserStore {
    sortScheme = "hot"
    isConnected = true
    returnUrl = Expo.Linking.makeUrl();

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

    /* Validates the token by making a get request */
    async checkCredentials(navigation) {
        try {
            let res = await fetch(apiUrl + '/posts/' + this.sortScheme, {
              method: 'GET',
              headers: {
                'x-access-token': this.token,
              },
            });
            if (res.status == 401) {
                SecureStore.deleteItemAsync('token');
                navigation.navigate('Front')      
            }
          } catch (err) {
            console.log(err);
          }        
    }
}

decorate(UserStore, {
    token: observable,
    setToken: action,
    isConnected: observable,
    setConnected: action,
    sortScheme: observable,
    setSortScheme: action,
    setLoading: action
})

let userStore = new UserStore();
export default userStore;
