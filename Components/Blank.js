import React, {Component} from 'react'
import {View, Title} from 'native-base'

export default class Blank extends Component{
    render = () => {
        return(
            <View style = {[{flex: 1, justifyContent: 'center'}]}>
                <Title style = {{color: 'skyblue', fontSize: 25}}>
                    Nothing here yet.
                </Title>
            </View>
        )
    }
}