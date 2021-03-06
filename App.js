import React, {Component} from 'react'
import {YellowBox} from 'react-native'
import {Font, AppLoading} from 'expo'
import {Provider} from 'mobx-react'

import AuthNav from './Navigators/AuthNav'
import postStore from './Store/PostStore' 
import userStore from './Store/UserStore'

YellowBox.ignoreWarnings(["Require cycle:"])
YellowBox.ignoreWarnings(['Setting a timer']);

export default class App extends Component{
    constructor(props){
        super(props)

        this.state = {assetsLoaded: false}

    }

    // need to load in assets such as fonts from the start
    componentDidMount = async() => {
        await Font.loadAsync({
            'pacifico': require('./Assets/Fonts/Pacifico.ttf'),
            'caviar-dreams': require('./Assets/Fonts/CaviarDreams.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            'Material Design Icons': require('native-base/Fonts/MaterialCommunityIcons.ttf'),
            'MaterialCommunityIcons': require('native-base/Fonts/MaterialCommunityIcons.ttf'),
            'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
            'FontAwesome' : require('native-base/Fonts/FontAwesome.ttf')
        })

        this.setState({assetsLoaded: true})

    }

    render = () => {

        // wait for assets to load
        if(this.state.assetsLoaded) {
            return(
                <Provider store = {postStore} userStore = {userStore}>
                    <AuthNav/>                                    
                </Provider>
            )
        }
        else {
            return (
                <AppLoading/>
            )
        }
    }
  };
