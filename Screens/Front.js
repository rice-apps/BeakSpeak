import React, {Component} from 'react';
import {
    StyleSheet, 
    View,
    Image,
    Dimensions,
    AsyncStorage
} from 'react-native';
import {Button, Text} from 'native-base'

import NavigationService from '../Services/NavigationService'

const logo = require('../Assets/Images/logo.png')

// one idea for a front header -- button to navigate to posts with front validation
export class FrontHeader extends Component {
    
    render = () => {
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

// main component for front page with logo and front button
export class FrontBody extends Component {

    render = () => {
        return (
            <View style={{flex:1}}>
                <View style={[{height:50}]}/>
                <View style = {{flex:1, flexDirection:"row"}}>
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
                </View>
            </View>

        )
    }
}

{/*            
<View style={[{flex:1}]}>
<View style={[{height:25}]}/>

// front button
<View style={[{alignItems:"center", justifyContent: "center"}]}>
    <Button 
        bordered 
        info 
        rounded 
        onPress = {()=> NavigationService.navigate("MainPage")}
     >
        <Text>
            Front
        </Text>
    </Button>
</View>
</View>
*/}

// template for potential footer
export class FrontFooter extends Component {

    render = () => {
        return (
            <Text/>
        )
    }
}

// template for potential sidebar
export class FrontSidebar extends Component {

    render = () => {
        return (
            <Text/>
        )
    }
}

// main component 
export default class Front extends Component {

    constructor(props){
        super(props)

        this.getLoginInfo()
    }

    navigate = (screen) => {
        this.props.navigation.navigate(screen)
    }

    getLoginInfo = async () => {
        const userToken = await AsyncStorage.getItem('userToken')
        //this.navigate(userToken ? 'MainScreen' : 'LoginScreen' )
        this.navigate('MainScreen')
    }
    
    render = () => {
        const {height: screenHeight} = Dimensions.get('window');

        return (
                <View style={[styles.screenTheme,{height: screenHeight}]}>
                    <FrontBody/>
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