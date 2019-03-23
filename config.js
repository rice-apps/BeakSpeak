import { environment } from './Environments/environment';

export let CONFIG;

var ip = "10.112.176.223"
if (environment.production) {
    CONFIG = {
        api_url: 'https://beakspeak-backend-232019.appspot.com/api',
        cas_auth_url: 'https://idp.rice.edu/idp/profile/cas/login',
        cas_logout_url: 'https://idp.rice.edu/idp/profile/cas/logout',
        service_url: 'https://beakspeak-backend-232019.appspot.com/api/auth/app'
    };
} else {
    CONFIG = {
        api_url: 'http://'+ip+':3000/api',
        cas_auth_url: 'https://idp.rice.edu/idp/profile/cas/login',
        cas_logout_url: 'https://idp.rice.edu/idp/profile/cas/logout',
        service_url: 'http://'+ip+':3000/api/auth/app'
    };
}
