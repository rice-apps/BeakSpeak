import React, {Component, PureComponent} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import {Card, CardItem} from 'native-base'

// body with comment content
export class CommentBody extends Component{
    render = () => {
        return(
            <CardItem>
                <Text>
                    {this.props.body}
                </Text>
            </CardItem>
        )
    }
}

// main component
export default class Comment extends PureComponent{
    
    render = () => {
        let body = this.props.body

        return(
                <CommentBody body = {body}/>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        borderColor: "powderblue",
        borderWidth: 5,
        borderRadius: 15
    },
    seeBorders: {
        borderWidth: 1,
        borderColor:'red'
    }
})