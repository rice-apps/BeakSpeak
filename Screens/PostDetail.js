import React, {Component} from 'react'
import {
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    RefreshControl
} from 'react-native'
import {
    Card,
    Container,
    Header,
    Left,
    Title,
    Right,
    Body,
    Footer,
    Icon,
    View
} from 'native-base'
import {AppLoading} from 'expo'

import Post from '../Components/Post'
import Comment from '../Components/Comment'
import Blank from '../Components/Blank'
import DatabaseService from '../Services/DatabaseService'


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

    componentDidMount = async() => {
        this.mounted = true

        post_id = this.props.navigation.getParam('id') // use this post id to query the individual post from the backend
        let post = await DatabaseService.getPost(post_id) // put database logic here -- look in Servcies/DatabaseService for the appropriate method
        console.log(post)
        if(this.mounted) { // set state here to avoid memory leak
            this.setState({
                post : post, 
                loaded : true,
                 refresh : false})
        }
    }

    // nothing to code here, a security measure to prevent memory leak -- look up react component lifecycle
    componentWillUnmount = () => {
        this.mounted = false
    }

    _onRefresh = async() => {
        this.setState((state) => ({refresh:true})) // indicate we are refreshing
        post_id = this.props.navigation.getParam('id') // query this post's id from backend 
        let post = await DatabaseService.getPost() // refresh data
        this.setState((state) => ({post:post, refresh:false})) // refresh state -- use function
    }

    _renderItem = (item) => {
        let post = item.item
        
        return(
            <Card>
                <Post 
                    title = {post.title} 
                    body = {post.body}
                />
             </Card>
        )
    }

    // render a post with comments -- use posts component from main as an example for structure
    render = () => {
        let loaded = this.state.loaded 

        if(!loaded) {
            return(
                <AppLoading/>
            )
        }
        
        else {
            let post = this.state.post
            let refresh = this.state.refresh
            let comments = post.comments

            return(
                <Card style = {styles.card}>
                    <View>
                    <Post
                        title={post.title}
                        body={post.body}
                    /> 
                    <FlatList
                        data= {comments}
                        renderItem={(item) => { return this._renderItem(item) }}
                        keyExtractor={(item, index) => item._id}
                        //TODO: fix refresh error
                        refreshControl={ // controls refreshing
                            <RefreshControl
                                refreshing={refresh}
                                onRefresh={this._onRefresh}
                                tintColor='skyblue'
                            />
                        }
                        ListEmptyComponent={<Blank />}
                        contentContainerStyle={(comments == undefined || !comments.length) ? { flex: 1, alignItems: 'center' } : {}}
                    />
                    </View>
                </Card>
                /*Use Post from Components folder*/
                /*Use Comment from Componenst folder and construct comments*/
                /*BONUS: create an input field for new comments*/
            )
        }
    }
}

const styles = StyleSheet.create(
    {
        titlefont:{
            fontWeight: 'bold',
        },
        card:{
            borderColor: 'powderblue',
            borderWidth: 5,
            borderRadius: 15
        }
    }
)