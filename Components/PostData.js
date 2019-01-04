import React, {Component} from 'react'
import {observer} from 'mobx-react'

import Post from '../Components/Post'
import DatabaseService from '../Services/DatabaseService'

// main component - increments post vote counts up and down, returns total vote count
@observer
export default class PostData extends Component{

    // initialize with default values
    constructor(props){
        super(props)

        this.user_id = '5b5f9a9ade57b741ffc3e61e'
      
        // default state - post before any changes
        /*
        this.state = {
            react: this.props.post.reacts[this.user_id],
            reactCounts : this.props.post.reactCounts,
            score : this.props.post.score,
            votedFor : votedFor
        }
        */
    }

    // increment react count up by 1
    updateReact = (react) => {
        old_react = this.props.post.userReact
        new_react = (old_react == react) ? "none" : react
        
        this.props.post.updateReact(old_react, new_react)
    }

    _undoVote = async() => {
        this.setState((state) => ({
            score : state.score - state.votedFor,
        }))
    }

    // increment vote count up by 1
    upvoteScore = async() => {

        post = this.props.post

        vote = 0
        if (this.state.votedFor != 0){
            this._undoVote()
        }
        if (this.state.votedFor != 1){
            this.setState((state) => ({
                score : state.score + 1,
            }))
            vote = 1    
        }
        this.setState((state) => ({
            votedFor : vote
        }), () => DatabaseService.updateVotes(post._id, this.state.votedFor))
    }

    // increment vote count down by 1 
    downvoteScore = async() => {

        post = this.props.post

        vote = 0
        if (this.state.votedFor != 0){
            this._undoVote()
        }
        if (this.state.votedFor != -1){
            this.setState((state) => ({
                score : state.score - 1,
            }))
            vote = -1    
        }
        this.setState((state) => ({
            votedFor : vote
        }), () => DatabaseService.updateVotes(post._id, this.state.votedFor))
    }

    // pass helper methods to Post component
    render () {
        return(
            <Post
                title = {this.props.post.title}
                vote = {this.props.post.userVote}
                score = {this.props.post.score}
                userReact = {this.props.post.userReact}
                reactCounts = {this.props.post.reactCounts}
                
                updateReact = {this.updateReact}
                upvoteScore = {this.upvoteScore}
                downvoteScore = {this.downvoteScore}
            />     
        )
    }
}