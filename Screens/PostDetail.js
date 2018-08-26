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
    
    // initialize with default values
    constructor(props){
        super(props)
    }

    // fetch data from database 
    componentDidMount = async() => {
        this.mounted = true
        pass;
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