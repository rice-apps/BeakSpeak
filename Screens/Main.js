import React, {Component} from 'react'
import {
    FlatList,
    StyleSheet,
    TouchableWithoutFeedback,
    RefreshControl,
} from 'react-native'
import {
    Card,
    Container,
    Footer,
    Icon,
    View
} from 'native-base'
import Modal from 'react-native-modal'
import {AppLoading} from 'expo'
import {observer, inject} from 'mobx-react'

import Comment from '../Components/Comment'
import {NewPost} from '../Components/New'
import Blank from '../Components/Blank'
import CommentData from '../Components/CommentData'
import PostData from '../Components/PostData'


// Comments container of custom comment components
class Comments extends Component{

    render = () => {
        let comments = this.props.comments
        return(
            <FlatList
             data = {comments}
             listKey = {(item, index) => item._id}
             keyExtractor = {(item, index) => item._id}
             renderItem = {(item) => {
                let comment = item.item
                
                return(
                    <View style = {{borderTopWidth: 1, borderRadius: 25, borderColor: 'powderblue'}}>
                        <Comment body = {comment.body}/>
                    </View>
                )
            }}
            />
        )
    }
}


// List of posts
@inject('store')
@observer
class Posts extends Component{

    constructor(props){
        super(props)

        this.state = {
            loaded: false
        }
    }

    componentDidMount = async() => {
        this.props.store.fetchPosts()
            .then((posts) => this.setState({
                loaded: true,
                refresh: false
            })) // retrieve posts from store
    }

    postNavigate = (route, post_id) => {
        this.props.navigate(route, {id: post_id})
    }
    
    _onRefresh = async() => { 
        this.setState((state) => ({refresh: true})) // indicate we are refreshing
        this.props.store.fetchPosts()
            .then((posts) => this.setState((state) => ({refresh: false}))) // refresh data
    }


    _renderItem = (item) => {
        let post = item.item

        return(
            <TouchableWithoutFeedback onPress = {()=> this.postNavigate('PostDetail', post._id)}>
                <Card>
                    <PostData 
                        post = {post}
                    />
                    <Comments comments = {post.comments}/>
                </Card>
            </TouchableWithoutFeedback>
        )
    }
    render () {
        let loaded = this.state.loaded
        let posts = this.props.store.posts
        
        if(!loaded) { // wait for posts to load
            return(
                <AppLoading/>
            )
        }

        else{ // display posts in a list component
            let refresh = this.state.refresh
            return (
                <View style={{flex: 1}}>
                    <FlatList
                        data = {posts}
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
                        contentContainerStyle = {(posts == undefined || !posts.length) ? { flex: 1, alignItems: 'center' } : {}}
                    />
                </View>
            )               
        }
        
    }
}

// footer with new post button and new post creation modal
class MainFooter extends Component{

    constructor(props){
        super(props)

        this.state = {
            modalVisible: false
        }
    }

    renderModal = () => {
        this.setState({modalVisible: true})
    }

    hideModal = () => {
        this.setState({modalVisible: false})
    }

    render = () => {
        let isVisible = this.state.modalVisible
        return(
            <View>

                {/* new post creation modal */}
                <Modal
                    isVisible = {isVisible}
                    animationIn = {'slideInUp'}
                    animationOut = {'zoomOut'}
                    animationInTiming = {500}
                    animationOutTiming = {500}
                >
                    <View style={{
                                    borderRadius: 10, 
                                    padding: 10, 
                                    backgroundColor: 'white'
                                }}>
                        <View style={{
                                        flexDirection: 'row', 
                                        justifyContent: 'flex-end'
                                    }}>

                            {/* cancel button */}
                            <Icon 
                                name = 'close' 
                                fontSize = {30}
                                type = 'MaterialCommunityIcons'
                                style = {{color: 'skyblue'}}
                                onPress = {this.hideModal}
                            />
                        </View>

                        {/* new post creation form*/}
                        <NewPost closeView = {this.hideModal}/>
                    </View>
                </Modal>

                {/* actual footer */}
                <Footer>

                    {/* new post button */}
                    <TouchableWithoutFeedback onPress = {this.renderModal}>
                        <View style = {styles.newPostButton}>
                                <Icon 
                                    name = 'plus' 
                                    fontSize = {30}
                                    type = 'MaterialCommunityIcons'
                                    style = {{color: 'white'}}
                                />
                        </View>
                    </TouchableWithoutFeedback>
                </Footer>
            </View>
        )
    }
}


// main component
export default class MainScreen extends Component{
    
    render = () => {
        return(
            <Container style = {{backgroundColor: 'powderblue'}}>
                <View style = {{flex: 1}}>
                    <Posts navigate = {this.props.navigation.navigate}/>
                </View>
                <MainFooter/>
            </Container>
        )
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