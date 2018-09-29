import React, {Component, PureComponent} from 'react' 
import Post from '../Components/Post'
import DatabaseService from '../Services/DatabaseService'

// main component - increments post vote counts up and down, returns total vote count
export default class PostData extends Component{
    
    // initialize with default values 
    constructor(props){
        super(props)
        // default state - post before vote changes 
        // noinspection JSAnnotator
        this.state = {
            post : this.props.post
        }
    }

    // increment vote count up by 1
    upvoteScore = async() => {
        this.props.post.score += 1
        let post_new = await DatabaseService.updateVote(this.props.post._id, 1)
        // console.log(post_new)
        // newPost = this.props.post
        this.setState({post : post_new})

    }

    //increment vote count down by 1 
    downvoteScore = () => {
        this.props.post.score += -1
        newPost = this.props.post 
        this.setState({post : newPost})
    }

    // pass helper methods to Post component

    render = () => {

        // console.log(this.props.post._id)
        return(
            <Post
                upvoteScore = {this.upvoteScore}
                downvoteScore = {this.downvoteScore}
                title = {this.props.post.title}
                body = {this.props.post.body}
                score = {this.props.post.score}
            />
        )
    }
}