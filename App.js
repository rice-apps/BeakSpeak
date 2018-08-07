import React, {Component} from 'react'
import {Font, AppLoading} from 'expo'

import AuthNav from './Navigators/AuthNav.js' 

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
            'Material Community Icons': require('native-base/Fonts/MaterialCommunityIcons.ttf'),            
        })
        
        this.setState({assetsLoaded:true})
    }

    render = () => {
        // wait for assets to load
        if(this.state.assetsLoaded){
            return(
                <AuthNav/>
            )
        }
        else {
            return (
                <AppLoading/>
            )
        }
    }
}