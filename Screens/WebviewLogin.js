import React, { Component } from 'react';
import { WebView } from 'react-native';

class Webviewlogin extends Component {
    render() {
        return (
            <WebView
                source={{uri: 'https://idp.rice.edu/idp/profile/cas/login?service=https://speak.riceapps.org/auth'}}
                style={{marginTop: 20}}
            />
        );
    }
}

export default Webviewlogin