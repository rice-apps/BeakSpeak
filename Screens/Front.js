import React, {Component} from 'react';
import {
    StyleSheet, 
    View,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';
import {Button, Text, Icon} from 'native-base'
import Modal from 'react-native-modal'
import WebviewLogin from './WebviewLogin'

import AuthService from '../Services/AuthService'
import Login from './Login'

const logo = require('../Assets/Images/logo.png')

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
                </View>
            </View>

        )
    }
}

// main component 
export default class FrontScreen extends Component {

    constructor(props){
        super(props)

        this.state = {
            modalVisible: false
        };

        this.getLoginInfo()
    }

    renderModal = () => {
        this.setState({modalVisible: true})
    };

    loginSuccess = () => {
        this.setState({modalVisible: false}, ()=>this.navigate('Main'))
    };


    navigate = (screen) => {
        this.props.navigation.navigate(screen)
    };

    getLoginInfo = async () => {
        // AsyncStorage.clear();
        const userToken = await AsyncStorage.getItem('userToken');

        if(userToken == null){
            this.setState({
                modalVisible: true
            })
        }
        else{
            this.navigate('Main')
        }
};
    render = () => {
        const {height: screenHeight} = Dimensions.get('window');
        let isVisible = this.state.modalVisible;
        
        return (
            <View style={[styles.screenTheme, {height: screenHeight}]}>
                    {/* login modal */}
                    <Modal
                        isVisible = {isVisible}
                        animationIn = {'slideInUp'}
                        animationOut = {'zoomOut'}
                        animationInTiming = {500}
                        animationOutTiming = {500}
                        avoidKeyboard
                    >
                        <WebviewLogin success = {this.loginSuccess}/>
                    </Modal>
                    <FrontBody/>
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