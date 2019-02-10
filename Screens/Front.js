import React, {Component} from 'react';
import {
    Button,
    StyleSheet, 
    View,
    Text,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';
const logo = require('../Assets/Images/logo.png');
import {WebBrowser} from 'expo'

// main component for front page with logo and front button
export class FrontBody extends Component {

    render = () => {
        return (
            <View style={{flex: 1}}>
                <View style={[{height: 50}]}/>
                <View style = {{flex: 1, flexDirection: 'row'}}>
                    <View style={{flex: 1}}/>
                    <View style={{flex: 3}}>

                        {/* our logo */}
                        <Image
                            source = {logo}
                            style = {styles.image}
                        />
                    </View>
                    <View style={{flex:1}}/>
                </View>
                <View style={[{flex:1, alignItems:'center'}]}>

                    {/* fancy app title */}
                    <Text style={[{fontFamily: 'caviar-dreams', fontSize: 30, color: 'white'}]}>
                        BeakSpeak
                    </Text>
                    {this.props.children}
                </View>
            </View>

        )
    }
}

// main component 
export default class FrontScreen extends Component {

    constructor(props){
        super(props);

        this.state = {
            result: null
        };

        // this.getLoginInfo()
    }

    navigate = (screen) => {
        this.props.navigation.navigate(screen)
    };

    handleLogin = async () => {
        let returnUrl = Expo.Linking.makeUrl();
        let redirectUrl = 'http://localhost:3000/api/auth/app';

        let result = await WebBrowser.openAuthSessionAsync(
            'https://idp.rice.edu/idp/profile/cas/login?' +
            `&service=${redirectUrl}`, returnUrl);

        if (result.type === 'success') {
            let params = await Expo.Linking.parse(result.url).queryParams;
            let token = params.token;
            if (token) {
                this.props.navigation.navigate('Main')
            }
        }
    };

    getLoginInfo = async () => {
        AsyncStorage.clear();
        const userToken = await AsyncStorage.getItem('userToken');

        if(userToken == null){
            this.setState({
                modalVisible: true
            })
        }
        else {
            this.navigate('Main')
        }
};
    render = () => {
        const {height: screenHeight} = Dimensions.get('window');
        return (
            <View style={[styles.screenTheme, {height: screenHeight}]}>
                <FrontBody>
                    <Button title="Login with NetID" onPress={this.handleLogin} />
                </FrontBody>
            </View>
        );
    }
}



const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
        resizeMode: 'contain'
    },
    clearbutton: {
        backgroundColor: 'transparent',
        borderColor: 'lightblue',
        borderWidth: 3
    },
    seeBorders: {
        borderWidth: 1,
        borderColor: 'red'
    },
    screenTheme:{
        flex: 1,
        backgroundColor:'powderblue',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
    }
});