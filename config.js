import { environment } from './Environments/environment';

export let CONFIG;
ip = "YOUR IP ADDRESS HERE"
if (environment.production) {
  CONFIG = {
    api_url: 'https://beakspeak-backend-232019.appspot.com/api',
    cas_auth_url: 'https://idp.rice.edu/idp/profile/cas/login',
    cas_logout_url: 'https://idp.rice.edu/idp/profile/cas/logout',
    service_url: 'https://beakspeak-backend-232019.appspot.com/api/auth/app',
    refresh_posts_secs: 60, // seconds
    check_creds_secs: 30 * 60 // seconds

  };
} else {
  CONFIG = {
    api_url: 'http://' + ip + ':3000/api',
    cas_auth_url: 'https://idp.rice.edu/idp/profile/cas/login',
    cas_logout_url: 'https://idp.rice.edu/idp/profile/cas/logout',
    service_url: 'http://' + ip + ':3000/api/auth/app',
    refresh_posts_secs: 10, // seconds
    check_creds_secs: 5 // seconds
  };
}
