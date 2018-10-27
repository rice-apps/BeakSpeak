import React, {Component} from 'react'
import {AppLoading} from 'expo'
import {
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    RefreshControl}
from 'react-native'
import {Card, Container, View} from 'native-base'

import DatabaseService from '../Services/DatabaseService'
import Blank from '../Components/Blank'
import Post from '../Components/Post'
import Comment from '../Components/Comment'
import PostData from '../Components/PostData';

// Comments container of custom comment components
class Comments extends Component{

    constructor(props){
        super(props)

        this.state = {
            comments: this.props.comments
        }
    }

    render = () => {
        let comments = this.state.comments
        return(
            <FlatList
             data = {comments}
             listKey = {(item, index) => item._id}
             keyExtractor = {(item, index) => item._id}
             renderItem = {(item) => {
                let comment = item.item
                
                return(
                    <Comment body = {comment.body}/>
                )
            }}
            />
        )
    }
}

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

    componentDidMount = async() => {
        this.mounted = true

        post_id = this.props.navigation.getParam('id') // use this post id to query the individual post from the backend
        let post = await DatabaseService.getPost(post_id) // put database logic here -- look in Servcies/DatabaseService for the appropriate method
        //console.log(post)
        if(this.mounted) { // set state here to avoid memory leak
            this.setState({
                post: post,
                loaded: true,
                refresh: false
            })
        }
    }

    // nothing to code here, a security measure to prevent memory leak -- look up react component lifecycle
    componentWillUnmount = () => {
        this.mounted = false
    }

    _onRefresh = async() => { 
        this.setState((state) => ({refresh: true})) // indicate we are refreshing
        let posts = await DatabaseService.getPosts() // refresh data
        console.log(posts[0])
        this.setState((state) => ({ // refresh state -- use function
            posts: posts,
            refresh: false
        }))
    }
    
    _renderItem = (item) => {
        let post = item.item

        return(
            <View style = {{flex: 1}}>
                <Card>
                    <PostData
                        post = {post}
                    />                
                 </Card>
                <Comments comments = {post.comments}/>
            </View>
            
        )
    }

    // render a post with comments -- use posts component from main as an example for structure
    render = () => {
        let loaded = this.state.loaded

        if(!loaded) { // wait for posts to load
            return(
                <AppLoading/>
            )
        }

        else{ // display posts in a list component
            let post = this.state.post
            let refresh = this.state.refresh

            return (
                <Container style = {{backgroundColor: 'powderblue'}}>
                    <FlatList
                    data = {[post]}
                    renderItem = {(item) => {return this._renderItem(item)}}
                    keyExtractor = {(item, index) => item._id}
                    refreshControl = { // controls refreshing
                        <RefreshControl
                            refreshing = {refresh}
                            onRefresh = {this._onRefresh}
                            tintColor = 'skyblue'
                        />
                    }
                    ListEmptyComponent = {<Blank/>}
                    contentContainerStyle = {(post == undefined) ? { flex: 1, alignItems: 'center' } : {}}
                    />
                </Container>
            )               
        }
    }
}
