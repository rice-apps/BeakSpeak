import React, {Component, PureComponent} from 'react' 
import Post from '../Components/Post'

// main component - increments post vote counts up and down, returns total vote count
export default class PostData extends Component{
    
    // initialize with default values 
    constructor(props){
        super(props)

        // default state - post before vote changes 
        this.state = {
            post = this.props.post 
        }
    }

    // increment vote count up by 1
    upvoteScore = () => {
        this.props.post.score += 1
        console.log(this.props.post.score)
        newPost = this.props.post
        this.setState({post : newPost})
    }

    //increment vote count down by 1 
    downvoteScore = () => {
        this.props.post.score += -1
        newPost = this.props.post 
        this.setState({post : newPost})
    }

    // pass helper methods to Post component 
    render = () => {
        return(
            <Post> 
                upvoteScore = {this.upvoteScore}
                downvoteSCore = {this.downvoteScore}
            </Post> 
        )
    }
}