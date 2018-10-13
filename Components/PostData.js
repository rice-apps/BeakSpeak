import React, {Component} from 'react'
import Post from '../Components/Post'
import {StyleSheet} from "react-native"
import {Card, View, Button, Text, Badge} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';
import DatabaseService from "../Services/DatabaseService";

// main component - increments post vote counts up and down, returns total vote count
export default class PostData extends Component{

    // initialize with default values
    constructor(props){
        super(props)

        console.log(props)
        // default state - post before vote changes
        this.state = {
            post: this.props.post
        }
    }

    // increment vote count up by 1
    pressReact = (reaction) => {
        this.state.post.reactCounts[reaction] += 1
        console.log('pressed and added')
        console.log(this.state.post._id)
        postid = this.state.post._id
        DatabaseService.updateReact(postid, reaction)
        newPost = this.state.post
        this.setState({post : newPost})
    }


    // pass helper methods to Post component
    render = () => {
        let title = this.state.post.title
        let body = this.state.post.body
        let angry = this.state.post.reactCounts["angry"]
        let funny = this.state.post.reactCounts["funny"]
        let love = this.state.post.reactCounts["love"]
        let sad = this.state.post.reactCounts["sad"]
        let wow = this.state.post.reactCounts["wow"]

        return(
            <View>
                <Post title={title} body={body}>
                    upvoteScore = {this.upvoteScore}
                    downvoteSCore = {this.downvoteScore}
                </Post>
                <View style={styles.container}>
                    <Button onPress={() => this.pressReact("angry")} style={styles.button}>
                        <Text>😡:{angry.toString()}</Text>
                    </Button>
                    <Button onPress={() => this.pressReact("funny")} style={styles.button}>
                        <Text>😂:{funny.toString()}</Text>
                    </Button>
                    <Button onPress={() => this.pressReact("love")} style={styles.button}>
                        <Text>😍:{love.toString()}</Text>
                    </Button>
                    <Button onPress={() => this.pressReact("sad")} style={styles.button}>
                        <Text>😭:{sad.toString()}</Text>
                    </Button>
                    <Button onPress={() => this.pressReact("wow")} style={styles.button}>
                        <Text>😮:{wow.toString()}</Text>
                    </Button>
                </View>
            </View>
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
    width: 60,
    height: 35,
    borderWidth: 0,
    borderRadius: 15
  },
    card: {
        borderColor: "powderblue",
        borderWidth: 5,
        borderRadius: 15
    }
})