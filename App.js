import React, {Component} from 'react'
import {Text,View} from 'react-native'

import {createStackNavigator} from 'react-navigation'
import NavigationService from './Services/NavigationService'

import {Font, AppLoading} from 'expo'

import Login from './Screens/Login.js'
import Posts from './Screens/Main.js'

// create our top level navigator
const Router = createStackNavigator({
    LoginPage: {screen: Login},
    MainPage: {screen: Posts}
}, {
    initialRouteName: 'LoginPage',
    headerMode: 'none',
    navigationOptions: {
        gesturesEnabled: false
    }
});

export default class App extends Component{
    constructor(props){
        super(props)
        this.state = {assetsLoaded: false}
    }

    // need to load in assets such as fonts from the start
    async componentDidMount(){
       await Font.loadAsync({
            'pacifico': require('./Assets/Fonts/Pacifico.ttf'),
            'caviar-dreams': require('./Assets/Fonts/CaviarDreams.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Entypo': require('@expo/vector-icons/fonts/Entypo.ttf')
        })
        this.setState({assetsLoaded:true})
    }

    render(){
        // wait for assets to load
        if(!this.state.assetsLoaded){
            return(
                <AppLoading/>
            )
        }

        // set top level navigator and navigate to login page
        else {
            return (
                <Router
                 ref={navigatorRef => {
                     NavigationService.setTopLevelNavigator(navigatorRef);
                 }}
            />)
        }
    }
}