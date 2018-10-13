import React, {Component, PureComponent} from 'react' 
import Post from '../Components/Post'
import DatabaseService from '../Services/DatabaseService'

// main component - increments post vote counts up and down, returns total vote count
export default class PostData extends Component{
    
    // initialize with default values 
    constructor(props){
        super(props)
        console.log('no')
        // default state - post before vote changes 
        // noinspection JSAnnotator
        this.state = {
            post : this.props.post
        }
    }

    // increment vote count up by 1
    upvoteScore = async() => {
        var userVote = 0
        let votes = this.state.post.votes
        for (var i = 0; i < votes.length; i++) {
            if (votes[i].user == '5b5f9a9ade57b741ffc3e61e') {
                userVote = votes[i].vote
            }
        }
        console.log(userVote)
        if(!(userVote == 1)) {
            this.state.post.score += 1
            let post_new = await DatabaseService.updateVote(this.props.post._id, 1)
            // console.log(post_new)
            // newPost = this.props.post
            // console.log(post_new)
            this.setState({post: post_new})
        }
        console.log(this.state.post.votes)
    }

    //increment vote count down by 1 
    downvoteScore = async() => {
        var userVote = 0
        let votes = this.state.post.votes
        for (var i = 0; i < votes.length; i++) {
            if (votes[i].user == '5b5f9a9ade57b741ffc3e61e') {
                userVote = votes[i].vote
            }
        }
        console.log(userVote)
        if(!(userVote == -1)) {
            this.state.post.score -= 1
            let post_new = await DatabaseService.updateVote(this.props.post._id, -1)
            // console.log(post_new)
            // newPost = this.props.post
            this.setState({post: post_new})
        }
        console.log(this.state.post.votes)
    }

    // pass helper methods to Post component

    render = () => {

        // console.log(this.props.post._id)
        return(
            <Post
                upvoteScore = {this.upvoteScore}
                downvoteScore = {this.downvoteScore}
                title = {this.state.post.title}
                body = {this.state.post.body}
                score = {this.state.post.score}
            />
        )
    }
}