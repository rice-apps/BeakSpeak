import React, {Component} from 'react'
import Post from '../Components/Post'
import {Posts} from '../Screens/Main'
import DatabaseService from '../Services/DatabaseService'
import {StyleSheet} from "react-native"
import {Card, View, Button, Text, Badge} from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome';

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
    upvoteScore = async() => {
        //let local_VotedPost = await DatabaseService.getPost(this.props.post._id)
        local_VotedPost = this.props.post  // assign local post

        post_id = local_VotedPost._id
        let updatedPost = await DatabaseService.updateVotes(post_id, 1) // send local post info to backend
        this.setState({post : updatedPost})
    }

    //increment vote count down by 1
    downvoteScore = async() => {
        //let local_VotedPost = await DatabaseService.getPost(this.props.post._id)
        local_VotedPost = this.props.post  // assign local post


        post_id = local_VotedPost._id
        let updatedPost = await DatabaseService.updateVotes(post_id, -1) // send local post info to backend
        this.setState({post : updatedPost})
    }

    // check if a button is pressed
    pressed = (reaction) => {
        user_id = '5b5f9a9ade57b741ffc3e61e'
        if (!(this.state.post.reacts.hasOwnProperty(user_id))) {
            return false
        }
        return this.state.post.reacts[user_id] == reaction

    }

    // increment react count up by 1
    pressReact = (reaction) => {

        user_id = '5b5f9a9ade57b741ffc3e61e'
        if (!(this.state.post.reacts.hasOwnProperty(user_id))) {
            this.state.post.reacts[user_id] = "none"
        }

        if (!(this.state.post.reacts[user_id].hasOwnProperty('none'))) {
            this.state.post.reactCounts[this.state.post.reacts[user_id]] -= 1
        }
        this.state.post.reacts[user_id] = reaction
        this.state.post.reactCounts[reaction] += 1
        postid = this.state.post._id
        DatabaseService.updateReact(postid, reaction)
        newPost = this.state.post

        this.setState({post : newPost})
    }

    // pass helper methods to Post component
    render = () => {
        let title = this.state.post.title
        let body = this.state.post.body

        let score = this.state.post.score
        let upvoteScore = this.upvoteScore
        let downvoteScore = this.downvoteScore

        let angry = this.state.post.reactCounts["angry"]
        let funny = this.state.post.reactCounts["funny"]
        let love = this.state.post.reactCounts["love"]
        let sad = this.state.post.reactCounts["sad"]
        let wow = this.state.post.reactCounts["wow"]

        return(
            <View>
            <Post upvoteScore = {upvoteScore}
                downvoteScore = {downvoteScore}
                title = {title}
                body = {body}
                score = {score}/>
            <View style={styles.container}>
                <Button onPress={() => this.pressReact("angry")} style={this.pressed("angry") ? styles.buttonPress : styles.button}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{marginLeft: -12, marginRight:-10}}>
                        😡:{angry.toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("funny")} style={this.pressed("funny") ? styles.buttonPress : styles.button}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{marginLeft: -12, marginRight:-10}}>
                        😂:{funny.toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("love")} style={this.pressed("love") ? styles.buttonPress : styles.button}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{marginLeft: -12, marginRight:-10}}>
                        😍:{love.toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("sad")} style={this.pressed("sad") ? styles.buttonPress : styles.button}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{marginLeft: -12, marginRight:-10}}>
                        😭:{sad.toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("wow")} style={this.pressed("wow") ? styles.buttonPress : styles.button}>
                    <Text adjustsFontSizeToFit={true} numberOfLines={1} style={{marginLeft: -12, marginRight:-10}}>
                        😮:{wow.toString()}</Text>
                </Button>
            </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
    button: {
    backgroundColor: "powderblue",
    height: 35,
    width: 70,
    borderWidth: 0.5,
    borderRadius: 15,
    justifyContent: 'center'
  },

    buttonPress: {
    backgroundColor: "#6f99bc",
    height: 35,
    width: 70,
    borderWidth: 0.5,
    borderRadius: 15,
    justifyContent: 'center'
  },
    card: {
        borderColor: "powderblue",
        borderWidth: 5,
        borderRadius: 15
    }
})