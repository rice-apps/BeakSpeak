import React, {Component} from 'react';
import { StyleSheet, View, Image, Dimensions } from 'react-native';
import {Button, Text} from 'native-base'

import NavigationService from '../Services/NavigationService'

const logo = require('../Assets/Images/logo.png')

// one idea for a login header -- button to navigate to posts with login validation
export class LoginHeader extends Component {
    
    render(){
        return (
            <View style = {{ flexDirection: "row"}}>
                <View style = {{flex:1, justifyContent: "center", alignItems: "center"}}>
                    <Text >
                        {this.props.text}
                    </Text>
                </View>
                <View style = {{flex:1, justifyContent: "center", alignItems: "center"}}>
                    <Button
                        title = "Posts"
                        onPress ={()=> NavigationService.navigate("MainPage")}
                    />
                </View>
            </View>
        )
    }
}

// main component for login page with logo and login button
export class LoginBody extends Component {

    render(){
        return (
            <View style={{flex:1}}>
                <View style = {{flex:0.75, flexDirection:"row"}}>
                    <View style={{flex:1}}/>
                    <View style={{flex:3}}>

                        {/* our logo */}
                        <Image
                            source = {logo}
                            style = {styles.image}
                        />
                    </View>
                    <View style={{flex:1}}/>
                </View>
                <View style={[{flex:1, alignItems:"center"}]}>

                    {/* fancy app title */}
                    <Text style={[{fontFamily:"caviar-dreams", fontSize:30, color:"white"}]}>
                        BeakSpeak
                    </Text>
                    <View style={[{flex:1}]}>
                        <View style={[{height:25}]}/>
                        
                        {/* login button */}
                        <View style={[{alignItems:"center", justifyContent: "center"}]}>
                            <Button 
                                bordered 
                                info 
                                rounded 
                                onPress = {()=> NavigationService.navigate("MainPage")}
                             >
                                <Text>
                                    Login
                                </Text>
                            </Button>
                        </View>
                    </View>
                </View>
            </View>

        )
    }
}

// template for potential footer
export class LoginFooter extends Component {

    render(){
        return (
            <Text/>
        )
    }
}

// template for potential sidebar
export class LoginSidebar extends Component {

    render(){
        return (
            <Text/>
        )
    }
}

// main component 
export default class Login extends Component {

    render() {
        const {height: screenHeight} = Dimensions.get('window');

        return (
                <View style={[styles.screenTheme,{height: screenHeight}]}>
                    <LoginBody/>
                </View>
        );
    }
}

const styles = StyleSheet.create({
    image:{
        flex:1,
        height:undefined,
        width:undefined,
        resizeMode:"contain"
    },
    clearbutton:{
        backgroundColor:"transparent",
        borderColor: "lightblue",
        borderWidth: 3
    },
    seeBorders:{
        borderWidth:1,
        borderColor:"red"
    },
    screenTheme:{
        flex: 1,
        backgroundColor:"powderblue",
        justifyContent:"center",
        alignItems:"center",
        flexDirection:"row"
    }
})