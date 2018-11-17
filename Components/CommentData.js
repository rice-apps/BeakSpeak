import React, {Component} from 'react'
import {Button, FlatList, StyleSheet} from "react-native"
import {Card} from 'native-base'
import Comment from '../Components/Comment'

export class CommentReact extends Component{

    render = () => {
        return(
            <Button onPress={null} title={this.props.react} style={styles.button}/>
        )
    }
}

export default class CommentData extends Component {

    constructor(props){
        super(props)
        console.log(this.props)

        this.state = {
            comments: this.props.comments,
            // reactCounts: this.props.reactCounts
        }
        console.log(this.state.reactCounts)
    }

    render = () => {

        let comments = this.state.comments
        // let angry = this.state.reactCounts["angry"]
        // let funny = this.state.reactCounts["funny"]
        // let love = this.state.reactCounts["love"]
        // let sad = this.state.reactCounts["sad"]
        // let wow = this.state.reactCounts["wow"]

        // console.log("angry" + angry)
        return(
                <FlatList
                data = {comments}
                listKey = {(item, index) => item._id}
                keyExtractor = {(item, index) => item._id}
                renderItem = {(item) => {
                    let comment = item.item

                    return(
                        <Card>
                        <Comment body = {comment.body}/>
                    <View style={styles.container}>
                    <CommentReact react={angry.toString()}/>
                    <CommentReact react={funny.toString()}/>
                    <CommentReact react={love.toString()}/>
                    <CommentReact react={sad.toString()}/>
                    <CommentReact react={wow.toString()}/>
                    </View>
                        </Card>
                    )
                }}
                />
            )
        }
}

const styles = StyleSheet.create({
    container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
    button: {
    backgroundColor: "powderblue",
    width: '15%',
    height: 15,
    borderColor: "powderblue",
    borderWidth: 15,
    borderRadius: 15
  },
    card: {
        borderColor: "powderblue",
        borderWidth: 5,
        borderRadius: 15
    }
})