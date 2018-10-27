import React, {Component, PureComponent} from 'react' 
import Post from '../Components/Post'
import DatabaseService from '../Services/DatabaseService'

// main component - increments post vote counts up and down, returns total vote count
export default class PostData extends Component{
    
    // initialize with default values 
    constructor(props){
        super(props)
        console.log(this.props.post)
        votes = this.props.post.votes
        isUpvoted = false
        isDownvoted = false
        //TODO: replace default user_id with an actual one once authentication works
        for (var i = 0; i < votes.length; i++) {
            if (votes[i].user == '5b5f9a9ade57b741ffc3e61e') {
                if (votes[i].vote == 1) {
                    isUpvoted = true
                    isDownvoted = false
                }
            }
            else if (votes[i].vote == -1) {
                isUpvoted = false
                isDownvoted = true
            }
        }
        // default state - post before vote changes 
        this.state = {
            score : this.props.post.score,
            isUpvoted : isUpvoted, 
            isDownvoted : isDownvoted,
            upvoteIconColor : 'black',
            downvoteIconColor : 'black'
        }
    }

    // increment vote count up by 1
    upvoteScore = async() => {
        // store this post's id 
        local_VotedPost = this.props.post
        post_id = local_VotedPost._id

        if (!this.state.isUpvoted) {
             // send +1 vote to backend 
           // backendPost = await DatabaseService.updateVotes(post_id, 1)
            // update post locally 
            newScore = this.props.post.score + 1
            this.setState((state) => ({
                score : newScore,
                //score : backendPost.score,
                isUpvoted : !this.state.isUpvoted,
                isDownvoted: false,
                upvoteIconColor: 'orange',
                downvoteIconColor: 'black'
            }))

            // send +1 vote to backend 
            backendPost = await DatabaseService.updateVotes(post_id, 1)
        }
        else {
                        // undo vote on backend 
            //backendPost = await DatabaseService.updateVotes(post_id, 0)
            // undo post locally 
            oldScore = this.props.post.score
            this.setState((state) => ({
                score : oldScore,  
                //score : backendPost.score,              
                isUpvoted : !this.state.isUpvoted,
                isDownvoted : false,
                upvoteIconColor : 'black',
                downvoteIconColor : 'black'
            }))

            // undo vote on backend 
            backendPost = await DatabaseService.updateVotes(post_id, 0)
        }

        //console.log(backendPost)
    }

    // increment vote count down by 1 
    downvoteScore = async() => {
        // store this post's id 
        local_VotedPost = this.props.post
        post_id = local_VotedPost._id

        if (!this.state.isDownvoted) {
                        //send -1 vote to backend 
                       //backendPost = await DatabaseService.updateVotes(post_id, -1)
            //downvote post locally 
            newScore = this.props.post.score + -1
            this.setState((state) => ({
                score : newScore,
                //score : backendPost.score,
                isUpvoted : false,
                isDownvoted: !this.state.isDownvoted,
                upvoteIconColor: 'black',
                downvoteIconColor: 'blue'
            }))
            //send -1 vote to backend 
            backendPost = await DatabaseService.updateVotes(post_id, -1)
        }
        else {
                        // undo vote on backend 
                        //backendPost = await DatabaseService.updateVotes(post_id, 0)
            // undo vote locally 
            oldScore = this.props.post.score
            this.setState((state) => ({
                score : oldScore, 
                //score : backendPost.score,
                isUpvoted : false, 
                isDownvoted : !this.state.isDownvoted,
                upvoteIconColor : 'black',
                downvoteIconColor: 'black'
            }))
            // undo vote on backend 
            backendPost = await DatabaseService.updateVotes(post_id, 0)
        }

       // console.log(backendPost)
    }

    // pass helper methods to Post component 
    render = () => {
        let title = this.props.post.title
        let body = this.props.post.body 
        let score = this.props.post.score 
        console.log(score)
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