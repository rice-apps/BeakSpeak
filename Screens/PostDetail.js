import React, {Component} from 'react'
import {AppLoading} from 'expo'
import {Header} from 'react-navigation'
import {
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    KeyboardAvoidingView,
    RefreshControl,
    TextInput,
    Text,
    ScrollView
}
from 'react-native'
import {Card, Container, Footer, Icon, Item, View, Input, Button} from 'native-base'

import DatabaseService from '../Services/DatabaseService'
import Blank from '../Components/Blank'
import Post from '../Components/Post'
import Comment from '../Components/Comment'
import Modal from "react-native-modal";
import {NewPost} from "../Components/New";


class PostDetailFooter extends Component{

    constructor(props){
        super(props);
        this.state = {input: ''};
    }

    onSubmit() {
        if(this.state.input){
            DatabaseService.postComment(this.props.post_id, this.state.input);
            this.setState({input: ''})
        }
    }

    render = () => {
        return(
            <View style={styles.container}>
                <Item regular>
                        <TextInput
                            placeholder = 'Put your comment here.'
                            onChangeText = {(text) => {this.setState({input: text})}}
                            onSubmitEditing = {() => {this.onSubmit()}}
                            value = {this.state.input}
                        />
                        <Button
                            rounded
                            warning
                            onPress = {() => this.onSubmit()}>
                            <Text>  Post!  </Text>
                        </Button>
                    </Item>
            </View>
        )
    }
}

// Comments container of custom comment components
class Comments extends Component{


    render = () => {
        let comments = this.props.comments;
        return(
            <FlatList
             data = {comments}
             listKey = {(item, index) => item._id}
             keyExtractor = {(item, index) => item._id}
             renderItem = {(item) => {
                let comment = item.item;
                
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
            loaded : false,
        }

        this.post_id = this.props.navigation.getParam('id') // use this post id to query the individual post from the backend

    }

    componentDidMount = async() => {
        this.mounted = true

        let post_id = this.props.navigation.getParam('id') // use this post id to query the individual post from the backend
        let post = await DatabaseService.getPost(post_id); // put database logic here -- look in Servcies/DatabaseService for the appropriate method
       
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
        let post = await DatabaseService.getPost(this.post_id) // refresh data
        this.setState((state) => ({ // refresh state -- use function
            post: post,
            refresh: false
        }))
    }
    
    _renderItem = (item) => {
        let post = item.item
        
        return(
            <View style = {{flex: 1}}>
                <Card>
                    <Post 
                        title = {post.title} 
                        body = {post.body}
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
                    {/*<View style = {{flex: 1}}>*/}
                    {/*<FlatList*/}
                    {/*data = {[post]}*/}
                    {/*renderItem = {(item) => {return this._renderItem(item)}}*/}
                    {/*keyExtractor = {(item, index) => item._id}*/}
                    {/*refreshControl = { // controls refreshing*/}
                        {/*<RefreshControl*/}
                            {/*refreshing = {refresh}*/}
                            {/*onRefresh = {this._onRefresh}*/}
                            {/*tintColor = 'skyblue'*/}
                        {/*/>*/}
                    {/*}*/}
                    {/*ListEmptyComponent = {<Blank/>}*/}
                    {/*contentContainerStyle = {(post == undefined) ? { flex: 1, alignItems: 'center' } : {}}*/}
                    {/*/>*/}
                    {/*</View>*/}

                    <KeyboardAvoidingView
                    keyboardVerticalOffset = {Header.HEIGHT + 20}
                    //style = {{ flex: 1 }}
                    style={styles.container}
                    //style = {{position: 'absolute', left: 0, right: 0, bottom: 0}}
                    behavior="position" enabled>
                    <ScrollView
                    keyboardShouldPersistTaps = 'never'>
                    {/*<View>*/}
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

                    {/*</View>*/}

                    {/*<View style = {{flex: 1,*/}
                                    {/*flexDirection: 'row',*/}
                                    {/*justifyContent: 'center',*/}
                                    {/*alignItems: 'stretch'*/}
                                    {/*}}>*/}
                        {/*<View style={{width: 50, height: 500, backgroundColor: 'skyblue'}} />*/}
                        {/*<View style={{width: 50, backgroundColor: 'steelblue'}} />*/}
                    {/*</View>*/}

                    {/*</ScrollView>*/}

                    <View style = {{backgroundColor: 'white'}}>
                    <PostDetailFooter post_id={this.state.post._id}
                    />
                    </View>

                    {/* uncomment to get comment input to scroll with the rest*/}
                    </ScrollView>

                    {/*<View style={{ height: 50 }}/>*/}
                    </KeyboardAvoidingView>
                </Container>
            )               
        }
    }
}

const styles = StyleSheet.create({
    newPostButton: {
        flex: 1,
        backgroundColor: 'powderblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'white'
    },
    seeBorders: {
        borderWidth: 1,
        borderColor:'red'
    }
})