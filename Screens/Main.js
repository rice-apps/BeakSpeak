import React, {Component} from 'react'
import {FlatList, RefreshControl, ScrollView, StyleSheet, TouchableWithoutFeedback, Text} from 'react-native'
import {Card, Container, Footer, Icon, View} from 'native-base'
import Modal from 'react-native-modal'
import {AppLoading} from 'expo'
import {inject, observer} from 'mobx-react'

import {NewPost} from '../Components/New'
import Blank from '../Components/Blank'
import CommentData from '../Components/CommentData'
import PostData from '../Components/PostData'
import OfflineNotice from '../Components/OfflineNotice'
import Loader from '../Components/Loader'
import {CONFIG} from '../config.js'

// Comments container of custom comment components
const Comments = observer(
    class Comments extends Component {

        render() {
            let comments = this.props.comments.slice(0, 3);
            return (
                <View>
                <FlatList
                    removeClippedSubviews={false}
                    data={comments}
                    keyExtractor={(item, index) => item._id}
                    renderItem={(item) => {
                        let comment = item.item

                        return (
                            <View style={{borderTopWidth: 1, borderRadius: 25, borderColor: 'lightskyblue'}}>
                                <CommentData
                                    comment={comment}
                                    post_id={this.props.post_id}
                                    showVote={false}
                                    showVoteScoreOnly={true}
                                    isMain = {true}
                                />
                            </View>
                        )
                    }}
                />
                {this.props.comments.length > 3 && 
                    <Icon
                        name = "ellipsis1"
                        type = "AntDesign"
                        fontSize = {20}
                        style={{color: 'lightskyblue', alignSelf: 'center'}}
                    />
                }    
                </View>
            )
        }
    })

/*
<Text style={{color: 'lightskyblue', fontSize : 10, fontWeight: 'bold', alignSelf:
'center'}}>view more comments</Text>
*/
// List of posts
const Posts = inject('store')(
inject('userStore')(observer(
class Posts extends Component{

    constructor(props){
        super(props)
        this.state = {
            refresh: false
        }
    }

    async componentDidMount() {
        this.props.store.fetchPosts()
    }

    postNavigate = (route, post_id) => {
        this.props.navigate(route, {id: post_id})
    }

    _onRefresh = async() => {
        this.setState((state) => ({refresh: true})) // indicate we are refreshing
        this.props.store.fetchPosts(refresh=true)
            .then((posts) => this.setState((state) => ({refresh: false}))) // refresh data
    }


    _renderItem = (item) => {
        let post = item.item
        return(
            <TouchableWithoutFeedback onPress = {()=> this.postNavigate('PostDetail', post._id)}>
                <Card>
                    <PostData
                        post = {post}
                        isMain = {true}
                    />
                    <Comments
                        comments = {post.comments}
                        post_id = {post._id}/>
                </Card>
            </TouchableWithoutFeedback>
        )
    }

    render () {
        let loaded = !this.props.store.loading
        let posts = this.props.store.posts

        if(!loaded) { // wait for posts to load
            return(
                <View>
                    <Loader loading = {!loaded}/>
                    <AppLoading/>
                </View>
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
})))

// footer with new post button and new post creation modal
const MainFooter = inject('store')(
    inject('userStore')(observer(
class MainFooter extends Component{

    constructor(props) {
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

    render() {
        let isVisible = this.state.modalVisible
        if (this.props.userStore.isConnected) {
        return(
            <View>

                {/* new post creation modal */}
                <ScrollView keyboardShouldPersistTaps={"never"}>
                    <Modal
                        isVisible={isVisible}
                        animationIn={'slideInUp'}
//                        animationOut={'zoomOut'}
//                        animationInTiming={500}
 //                       animationOutTiming={500}
                        avoidKeyboard={true}
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
                                    name='close'
                                    fontSize={30}
                                    type='MaterialCommunityIcons'
                                    style={{color: 'skyblue'}}
                                    onPress={this.hideModal}
                                />
                            </View>

                            {/* new post creation form*/}
                            <NewPost closeView={this.hideModal}/>
                        </View>
                    </Modal>
                </ScrollView>

                {/* actual footer */}
                <Footer>

                    {/* new post button */}
                    <TouchableWithoutFeedback onPress = {this.renderModal}>
                        <View style = {styles.newPostButton}>
                                <Icon
                                    isVisible = {false}
                                    name = 'plus'
                                    fontSize = {30}
                                    type = 'MaterialCommunityIcons'
                                    style = {{color: 'white'}}
                                />
                        </View>
                    </TouchableWithoutFeedback>
                </Footer>
            </View>
        );
        }
        else {
            return (
                <View>
                    <Footer>
                        <View style = {styles.newPostButton}>
                            <Icon
                                isVisible = {false}
                                name = 'alert-circle-outline'
                                fontSize = {30}
                                type = 'MaterialCommunityIcons'
                                style = {{color: 'grey'}}
                            />
                        </View>
                    </Footer>
                </View>
            );
        }
    }
})))



// main component
const MainScreen =  inject('store')(inject('userStore')(class MainScreen extends Component{
    constructor(props) {
        super(props)

        // check credentials are valid every so often
        setInterval(() => {        
            if (this.props.userStore.isConnected) {
                this.props.userStore.checkCredentials(this.props.navigation)
            }
        } , CONFIG.check_creds_secs * 1000)       

        // refresh app every X seconds
        setInterval(() => {        
            if (this.props.userStore.isConnected) {
                this.props.store.fetchPosts(refresh=true)
            }
        } , CONFIG.refresh_posts_secs * 1000)        
    }
    render () {
        return(
            <Container style = {{backgroundColor: 'lightskyblue'}}>
                <OfflineNotice/>
                <View style = {{flex: 1}}>
                    <Posts navigate = {this.props.navigation.navigate}/>
                </View>
                <MainFooter/>
            </Container>
        )
    }
}))

export default MainScreen;

const styles = StyleSheet.create({
    newPostButton: {
        flex: 1,
        backgroundColor: 'lightskyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'white'
    },
    seeBorders: {
        borderWidth: 1,
        borderColor: 'red'
    }
})