import React, {Component} from 'react'
import {
    View,
    ActivityIndicator,
    StatusBar
} from 'react-native'

export default class Loading extends Component{

    render = () => {
        return(
            <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center'}]}>
                <ActivityIndicator color='skyblue'/>
                <StatusBar barStyle='default'/>
            </View>
        )
    }
}