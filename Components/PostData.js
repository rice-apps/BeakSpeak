import React, {Component, PureComponent} from 'react' 
import Post from '../Components/Post'
import DatabaseService from '../Services/DatabaseService'

// main component - increments post vote counts up and down, returns total vote count
export default class PostData extends Component{
    
    // initialize with default values 
    constructor(props){
        super(props)
        votes = this.props.post.votes
        votedFor = 0
        //TODO: replace default user_id with an actual one once authentication works
        for (var i = 0; i < votes.length; i++) {
            if (votes[i].user == '5b5f9a9ade57b741ffc3e61e') {
                votedFor = votes[i].vote
        }
        // default state - post before vote changes 
        this.state = {
            score : this.props.post.score,
            votedFor : votedFor,
        }
    }
}

    _undoVote = async() => {
        this.setState((state) => ({
            score : state.score - state.votedFor,
        }))
    }

    // increment vote count up by 1
    upvoteScore = async() => {
        // store this post's id 
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
        // store this post's id 
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
        let score = this.state.score 
        let upvoteScore = this.upvoteScore
        let downvoteScore = this.downvoteScore
        let vote = this.state.votedFor

        return(
            <Post
                vote = {vote}
                title = {title}
                body = {body}
                score = {score}
                upvoteScore = {upvoteScore}
                downvoteScore = {downvoteScore}
            /> 
        )
    }

}