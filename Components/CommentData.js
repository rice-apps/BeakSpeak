import React, {Component} from 'react'
import {StyleSheet, View, Button} from "react-native"
import {Card, CardItem,Text} from 'native-base'


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

export class CommentReact extends Component{

    render = () => {
        return(
            <CardItem>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Button
                        onPress={null}
                        title={this.props.angry}
                    />

                </View>
            </CardItem>
        )
    }
}

export default class CommentData extends Component {

    constructor(props){
        super(props)


        this.state = {
            body: this.props.component,
            reactCounts: this.props.reactCounts
        }
        console.log(this.state.reactCounts)
    }

    render = () => {
        let body = this.state.body
        let angry = this.state.reactCounts["angry"]

        console.log("angry" + angry)
        return(
            <Card style = {styles.card}>
                <CommentBody body = {body}/>
                <CommentReact angry = {angry.toString()}/>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    card: {
        borderColor: "powderblue",
        borderWidth: 5,
        borderRadius: 15
    }
})