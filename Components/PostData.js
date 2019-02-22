import React, {Component} from 'react'
import {observer} from 'mobx-react'

import Post from '../Components/Post'

// main component - increments post vote counts up and down, returns total vote count
@observer
export default class PostData extends Component{

    // initialize with default values
    constructor(props){
        super(props)

        this.user_id = '5b5f9a9ade57b741ffc3e61e'
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
    upvoteScore = () => { 
        old_vote = this.props.post.userVote
        score = this.props.post.score
        if (old_vote == 1) {
            new_vote = 0
            score -= 1
        }
        if (old_vote == 0) {
            new_vote = 1
            score += 1
        }
        if (old_vote == -1) {
            new_vote = 1
            score += 2
        }
        this.props.post.updateVote(new_vote, this.props.post._id)
        this.props.post.score = score

    }

    // increment vote count down by 1
    downvoteScore = async() => {
        old_vote = this.props.post.userVote
        score = this.props.post.score

        if (old_vote == 1) {
            new_vote = -1
            score -= 2
        }
        if (old_vote == 0) {
            new_vote = -1
            score -= 1
        }
        if (old_vote == -1) {
            new_vote = 0
            score += 1
        }
        this.props.post.updateVote(new_vote, this.props.post._id)
        this.props.post.score = score
    }

    // pass helper methods to Post component
    render() {
        return(
            <Post
                title = {this.props.post.title}
                vote = {this.props.post.userVote}
                score = {this.props.post.score}
                userReact = {this.props.post.userReact}
                reactCounts = {this.props.post.reactCounts}
                body = {this.props.post.body}
                updateReact = {this.updateReact}
                upvoteScore = {this.upvoteScore}
                downvoteScore = {this.downvoteScore}
            />     
        )
    }
}