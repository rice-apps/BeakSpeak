import React, {Component, PureComponent} from 'react' 
import Post from '../Components/Post'
import DatabaseService from '../Services/DatabaseService'

// main component - increments post vote counts up and down, returns total vote count
export default class PostData extends Component{
    
    // initialize with default values 
    constructor(props){
        super(props)

        // default state - post before vote changes 
        this.state = {
            score : this.props.post.score,
            isUpvoted : false, 
            isDownvoted : false,
            upvoteIconColor : 'black',
            downvoteIconColor : 'black'
        }
    }

    // increment vote count up by 1
    upvoteScore = async() => {
        if (!this.state.isUpvoted) {
            // send +1 vote to backend 
            //local_VotedPost = this.props.post  
            //post_id = local_VotedPost._id
            //await DatabaseService.updateVotes(post_id, 1) 

            //update post locally 
            newScore = this.props.post.score + 1
            this.setState({
                score : newScore,
                isUpvoted : !this.state.isUpvoted, 
                isDownvoted : false,
                upvoteIconColor : 'orange',
                downvoteIconColor : 'black'
            })
        }
        else {
            this.setState({
                score : this.props.post.score,                
                isUpvoted : !this.state.isUpvoted, 
                isDownvoted : false,
                upvoteIconColor : 'black',
                downvoteIconColor : 'black'
            })            
        }
    }

    //increment vote count down by 1 
    downvoteScore = async() => {
        if (!this.state.isDownvoted) {
            //send -1 vote to backend 
            //local_VotedPost = this.props.post
            //post_id = local_VotedPost._id
            //await DatabaseService.updateVotes(post_id, -1) 

            //downvote post locally 
            newScore = this.props.post.score + -1
            this.setState({
                score : newScore,
                isUpvoted : false, 
                isDownvoted : !this.state.isDownvoted,
                upvoteIconColor : 'black',
                downvoteIconColor : 'blue'
            })
        }
        else {
            this.setState({
                score : this.props.post.score, 
                isUpvoted : false, 
                isDownvoted : !this.state.isDownvoted,
                upvoteIconColor : 'black',
                downvoteIconColor : 'black'
            })
        }
    }

    // pass helper methods to Post component 
    render = () => {
        let title = this.props.post.title
        let body = this.props.post.body 
        let score = this.state.score 
        let upvoteScore = this.upvoteScore
        let downvoteScore = this.downvoteScore
        let upvoteIconColor = this.state.upvoteIconColor
        let downvoteIconColor = this.state.downvoteIconColor

        return(
            <Post
                upvoteScore = {upvoteScore}
                downvoteScore = {downvoteScore}
                title = {title}
                body = {body}
                score = {score}
                upvoteIconColor = {upvoteIconColor}
                downvoteIconColor = {downvoteIconColor}
            /> 
        )
    }
}