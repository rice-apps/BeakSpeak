import React, {Component} from 'react'
import {
    View,
    ActivityIndicator,
    StatusBar
} from 'react-native'
import {Icon} from 'native-base'

export default class Blank extends Component{

    render(){
        return(
            <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
                <ActivityIndicator color='skyblue'/>
                <StatusBar barStyle='default'/>
            </View>
        )
    }
}