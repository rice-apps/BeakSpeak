import React, {Component} from 'react'
import {StyleSheet, View, Button} from 'react-native'
import {Card, CardItem,Text} from 'native-base'

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

export class CommentReact extends Component{
    render = () => {
        return(
            <CardItem>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <Button
                        onPress={null}
                        title = {"button"}
                    />
                </View>
            </CardItem>
        )
    }
}

// main component
export default class Comment extends Component{
    
    constructor(props){
        super(props)

        this.state = {
            body: this.props.body,
            reactCounts: this.props.reactCounts
        }
    }

    render = () => {
        let body = this.state.body
        let reacts = this.state.reactCounts


        return(
            <Card style = {styles.card}>
                <CommentBody body = {body}/>
                <CommentReact reacts = {reacts}/>
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