import React, { Component } from 'react';
import { WebView } from 'react-native';

class Webviewlogin extends Component {

    constructor(props){
        super(props);
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(props){
        if(!props.loading){
            if(props.url.includes('https://speak.riceapps.org/auth?ticket=')){
                console.log(props.url.substring(props.url.indexOf("ticket="), props.url.length))
                this.props.closeView();
            }
        }
    }

    render() {
        return (
            <WebView
                onNavigationStateChange={this.handleChange}
                source={{uri: 'https://idp.rice.edu/idp/profile/cas/login?service=https://speak.riceapps.org/auth'}}
                style={{marginTop: 20}}
            />
        );
    }
}

export default Webviewlogin