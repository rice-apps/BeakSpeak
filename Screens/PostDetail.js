import React, {Component} from 'react';
import {
    View, 
    Header,
    Title,
    Body
} from 'native-base'

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

        if(this.mounted){ // put logic here to avoid memory leak
            pass;
        }
    }

    // nothing to code here, a security measure to prevent memory leak -- look up component lifecycle
    componentWillUnmount = () => {
        this.mounted = false
    }

    // render a post with comments -- use posts component from main as an example for structure
    render = () => {
        return(
            <Blank/>
        )
    }
}