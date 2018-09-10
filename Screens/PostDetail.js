import React, {Component} from 'react'

import DatabaseService from '../Services/DatabaseService'
import Blank from '../Components/Blank'

//TODO: implement this class
export default class PostDetailScreen extends Component{
    
    // initialize with default values -- DO NOT fetch data here
    constructor(props){
        super(props)

        // default state -- we have no post and nothing is loaded
        this.state = {
            post : null,
            loaded : false
        }
    }

    // TODO: fetch data from database 
    componentDidMount = async() => {
        this.mounted = true

        post_id = this.props.navigation.getParam('id') // use this post id to query the individual post from the backend
        let post = null // put database logic here -- look in Servcies/DatabaseService for the appropriate method
        if(this.mounted) { // set state here to avoid memory leak
            console.log('make sure to set refresh to false and load to true -- like in Main screen!')
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