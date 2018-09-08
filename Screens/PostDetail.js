import React, {Component} from 'react'

import Blank from '../Components/Blank'

//TODO: implement this class
export default class PostDetailScreen extends Component{
    
    // initialize with default values -- DO NOT fetch data here
    constructor(props){
        super(props)
    }

    // fetch data from database 
    componentDidMount = async() => {
        this.mounted = true

        post_id = this.props.navigation.getParam('id') // use this post id to query the individual post from the backend

        if(this.mounted) { // put database logic here to avoid memory leak
            console.log('mounted') // delete me
        }
    }

    // nothing to code here, a security measure to prevent memory leak -- look up react component lifecycle
    componentWillUnmount = () => {
        this.mounted = false
    }

    // render a post with comments -- use posts component from main as an example for structure
    render = () => {
        return(
            <Blank/> //placeholder, delete with actual code 
            /*Use Post from Components folder*/
            /*Use Comment from Componenst folder and construct comments*/
            /*BONUS: create an input field for new comments*/
        )
    }
}