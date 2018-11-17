import React, {Component} from 'react'
import Post from '../Components/Post'
import DatabaseService from '../Services/DatabaseService'

// main component - increments post vote counts up and down, returns total vote count
export default class PostData extends Component{

    // initialize with default values
    constructor(props){
        super(props)

        this.user_id = '5b5f9a9ade57b741ffc3e61e'

        votes = this.props.post.votes
        votedFor = 0
        console.log(votes)
        if (this.user_id in votes) {
            votedFor = votes[this.user_id]
        }
        console.log(votedFor)
      
        // default state - post before any changes
        this.state = {
            react: this.props.post.reacts[this.user_id],
            reactCounts : this.props.post.reactCounts,
            score : this.props.post.score,
            votedFor : votedFor
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
    render = () => {
        let title = this.props.post.title
        let body = this.props.post.body

        let reactCounts = this.state.reactCounts
        let userReact = this.state.react
        let vote = this.state.votedFor
        let score = this.state.score

        return(
            <Post
                title = {title}
                body = {body}
                userReact = {userReact}
                reactCounts = {reactCounts}
                updateReact = {this.updateReact}
                vote = {vote}
                score = {score}
                upvoteScore = {this.upvoteScore}
                downvoteScore = {this.downvoteScore}
            />     
        )
    }
}