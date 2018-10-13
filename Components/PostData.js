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
            post : this.props.post 
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

    // pass helper methods to Post component 
    render = () => {
        let title = this.props.post.title
        let body = this.props.post.body 
        let score = this.state.post.score
        let upvoteScore = this.upvoteScore
        let downvoteScore = this.downvoteScore

        return(
            <Post
                upvoteScore = {upvoteScore}
                downvoteScore = {downvoteScore}
                title = {title}
                body = {body}
                score = {score}
            /> 
        )
    }
}