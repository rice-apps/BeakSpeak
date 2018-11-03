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

        // default state - post before vote changes
        this.user_id = '5b5f9a9ade57b741ffc3e61e'

        this.state = {
            react: this.props.post.reacts[this.user_id],
            reactCounts : this.props.post.reactCounts
        }
    }

    // increment react count up by 1
    updateReact = (reaction) => {
        user_id = this.user_id
        post_id = this.props.post._id

        user_react = this.state.react
        react_counts = this.state.reactCounts
        new_react = reaction

        react_counts[user_react] -= 1 // decrement previous user's react count

        if (user_react == reaction) { // check if react was previously selected
            new_react = "none"
        }
        else { // new react selected
            react_counts[new_react] += 1
        }

        this.setState((state) => ({ // update state
            react: new_react,
            reactCounts : react_counts
        }))

        DatabaseService.updateReact(post_id, reaction)
    }

    // pass helper methods to Post component
    render = () => {
        let title = this.props.post.title
        let body = this.props.post.body

        let reactCounts = this.state.reactCounts
        let userReact = this.state.react

        return(
            <Post
                title = {title}
                body = {body}
                userReact = {userReact}
                reactCounts = {reactCounts}
                updateReact = {this.updateReact}
            />     
        )
    }
}

