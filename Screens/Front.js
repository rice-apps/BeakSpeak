import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {Button} from 'native-base'
import { WebBrowser, SecureStore } from 'expo'
import {inject} from 'mobx-react'

const logo = require('../Assets/Images/logo.png');
import {CONFIG} from "../config";



// main component for front page with logo and front button
export class FrontBody extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={[{ height: 50 }]} />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 3 }}>
            {/* our logo */}
            <Image source={logo} style={styles.image} />
          </View>
          <View style={{ flex: 1 }} />
        </View>
        <View style={[{ flex: 1, alignItems: 'center' }]}>
          {/* fancy app title */}
          <Text style={[{ fontFamily: 'caviar-dreams', fontSize: 30, color: 'white' }]}>
            BeakSpeak
          </Text>
          {this.props.children}
        </View>
      </View>
    );
  }
}

// main component 
const FrontScreen = inject('userStore')(class FrontScreen extends Component {

    constructor(props){
        super(props);
        this.state = {
            loginError: ''
        };
        //this.props.navigation.navigate('Main');
        this.getLoginInfo()
    }

    navigate = (screen) => {
        this.props.navigation.navigate(screen)
    };

    handleLogin = async () => {
        let returnUrl = Expo.Linking.makeUrl();

        let result = await WebBrowser.openAuthSessionAsync(
          CONFIG.cas_auth_url +
          `?service=${CONFIG.service_url}` + `?return=${returnUrl}`,
          returnUrl
        );
        if (result.type === 'success') {
            let params = await Expo.Linking.parse(result.url).queryParams;
            let token = params.token;
            if (token) {
                SecureStore.setItemAsync('token', token);
                this.props.userStore.setToken(token);
                this.props.navigation.navigate('Main');

            }
        }

        else {
            this.setState((state) => ({
                loginError: 'Error logging in, please try again.'}))
        }
    };

    getLoginInfo = async () => {
        SecureStore.getItemAsync('token').then((token) => {
                if (token) {
                    this.props.userStore.setToken(token);
                    this.props.navigation.navigate('Main')
                }
            }
        );
    
    };
        
    
    render () {
        const {height: screenHeight} = Dimensions.get('window');
        return (
            <View style={[styles.screenTheme, {height: screenHeight}]}>
                <FrontBody>
                    <TouchableOpacity
                        style ={{
                            height: 40,
                            width:160,
                            borderRadius:10,
                            backgroundColor : "#14141D",
                            marginTop :50,
                            marginBottom :20,
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        onPress={this.handleLogin}
                        >
                        <Text style = {{color: "white", fontSize: 20, fontFamily: 'caviar-dreams'}}>Login</Text>
                    </TouchableOpacity>
                    <Text>{this.state.loginError}</Text>
                </FrontBody>
            </View>
        );
    }
});

export default FrontScreen;

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'contain',
  },
  clearbutton: {
    backgroundColor: 'transparent',
    borderColor: 'lightblue',
    borderWidth: 3,
  },
  seeBorders: {
    borderWidth: 1,
    borderColor: 'red',
  },
  screenTheme: {
    flex: 1,
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
