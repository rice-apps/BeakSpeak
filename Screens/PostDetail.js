import React, {Component} from 'react'
import {AppLoading} from 'expo'
import {Header} from 'react-navigation'
import {
    FlatList,
    StyleSheet,
    KeyboardAvoidingView,
    RefreshControl,
    Keyboard
}
from 'react-native'
import {Card, Container, Footer, Icon, Item, View, Input, Button, Body} from 'native-base'
import DatabaseService from '../Services/DatabaseService'
import Blank from '../Components/Blank'
import Post from '../Components/Post'
import Comment from '../Components/Comment'

class PostDetailFooter extends Component{

    constructor(props){
        super(props);
        this.state = {
            input: ''
        };
    }

    onSubmit() {
        if(this.state.input){
            DatabaseService.postComment(this.props.post_id, this.state.input)
                .then(res => {this.props.update(res)});
            this.setState((state) => ({input: ''}))
            let wait = new Promise((resolve) => setTimeout(resolve, 1000))
            wait.then( () => {
                this.setState(() => this.props.scrollToEnd())
            })

        }
    }

    render = () => {

        return(
            <View style={{backgroundColor: 'white', flex: 1}}>
                <Item regular>
                    <Input
                        placeholder = 'Your comment here...'
                        onChangeText = {(text) => {this.setState({input: text})}}
                        onSubmitEditing = {() => {this.onSubmit()}}
                        value = {this.state.input}
                    />
                    <Button
                        transparent
                        onPress = {() => {this.onSubmit()}}>
                        <Icon name ='telegram'
                            type = 'MaterialCommunityIcons'
                            style = {{color: 'powderblue'}}/>
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

        this.offset = 0
        this.post_id = this.props.navigation.getParam('id'); // use this post id to query the individual post from the backend
        this.main_refresh = this.props.navigation.getParam('refresh');
        this.isShowToTop = false

    }

    componentDidMount = async() => {
        this.mounted = true
        let post = await DatabaseService.getPost(this.post_id); // put database logic here -- look in Servcies/DatabaseService for the appropriate method

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

    update = (post) => {
        this.setState((state) => ({post: post}));
        this.main_refresh();
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

    _handleScroll = newY => {
        isUp = newY - this.offset <= 0
        return isUp
    }

    _scrollToEnd = () => {
        Keyboard.dismiss()
        this.list.scrollToEnd({animated: true})
    }

    _onScroll(e) {
        var offsetY = e.nativeEvent.contentOffset.y;
        if(offsetY > 100) {
            this.setState({isShowToTop: true})
        } else {
            this.setState({isShowToTop: false})
        }
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
                <KeyboardAvoidingView
                    keyboardVerticalOffset = {Header.HEIGHT}
                    style = {[{backgroundColor: 'powderblue', flex: 1}]}
                    contentContainerStyle = {{flex: 1}}
                    behavior="position" enableds>

                    {/*Scrolling list of comments + post*/}
                    <View style ={{flex: 1}}>
                        <FlatList
                        ref = {ref => this.list = ref}
                        data = {[post]}
                        renderItem = {(item) => {return this._renderItem(item)}}
                        keyExtractor = {(item, index) => item._id}
                        //onScroll={(e)=>this._onScroll(e)}
                        onScrollBeginDrag = {(e) => this.offset = e.nativeEvent.contentOffset.y}
                        onScrollEndDrag = {(e) => this._handleScroll(e.nativeEvent.contentOffset.y) ? Keyboard.dismiss() : {}}
                        refreshControl = { // controls refreshing
                            <RefreshControl
                                refreshing = {refresh}
                                onRefresh = {this._onRefresh}
                                tintColor = 'skyblue'
                            />
                        }
                        ListEmptyComponent = {<Blank/>}
                        contentContainerStyle = {(post == undefined) ? { flex: 1, alignItems: 'center', flexWrap: 'wrap'} : {}}
                        />
                        <Button
                            transparent
                            onPress = {() => {this.list.scrollToIndex({index: 0, viewOffset: 0, viewPosition: 0})}}>
                            <Icon name ='arrow-collapse-up'
                                type = 'MaterialCommunityIcons'
                                style = {{color: 'white'}}/>
                        </Button>
                    </View>

                    {/*Comments field*/}        
                    <Footer>
                        <PostDetailFooter
                            post_id={this.state.post._id}
                            update={this.update}
                            scrollToEnd = {this._scrollToEnd}
                        />
                    </Footer>
                </KeyboardAvoidingView>
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
        borderWidth: 5,
        borderColor:'red'
    }
})