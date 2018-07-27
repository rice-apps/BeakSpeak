import React, {Component} from 'react'
import {View, StyleSheet} from 'react-native'
import {Icon} from 'native-base'

export default class Sidebar extends Component{
    
    navigate = (route) => {
        this.props.navigation.navigate(route)
    }

    render = () => {
        return(
                <View style={styles.container}>
                    <Icon 
                        name="note-text" 
                        fontSize={30}
                        type="MaterialCommunityIcons"
                        style = {{color: "white"}}
                        onPress = {() => this.navigate("MainScreen")}
                    />
                    <Icon 
                        name="settings" 
                        fontSize={30}
                        type="MaterialCommunityIcons"
                        style = {{color: "white"}}
                        onPress = {() => this.navigate("SettingsScreen")}
                    />
                    <Icon 
                        name="information-variant" 
                        fontSize={30}
                        type="MaterialCommunityIcons"
                        style = {{color: "white"}}
                        onPress = {() => this.navigate("InfoScreen")}
                    />
                </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:"space-evenly",
        alignItems: "center",
        backgroundColor: "powderblue",

    },
    seeBorders:{
        borderWidth:1,
        borderColor:"red"
    }
})