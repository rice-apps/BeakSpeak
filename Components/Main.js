import React, {Component} from 'react';
import {FlatList, StyleSheet, TouchableOpacity} from 'react-native'
import Modal from 'react-native-modal'
import {Card, Container, Content, Header, Title, Body, Footer, Button, Text, View} from 'native-base'

import Icon  from '@expo/vector-icons/Entypo'
import {AppLoading} from 'expo'

import Post from './Post.js'
import Comment from './Comment.js'
import {NewPost} from './New.js'
import DatabaseService from '../Services/DatabaseService'

// header with posts title
class MainHeader extends Component{

    render(){
        return(
            <View style={{borderBottomWidth: 2, borderColor:"white"}}>
                <Header style={{backgroundColor: "powderblue"}}>
                    <Body>
                        <Title style={{color:"white", fontSize: 25}}>
                            Posts
                        </Title>
                    </Body>
                </Header>
            </View>

        )
    }
}

// Comments container of custom comment components
class Comments extends Component{

    constructor(props){
        super(props)

        this.state ={
            comments: this.props.comments
        }
    }

    render(){
        let comments = this.state.comments

        return(
            <FlatList
             data={comments}
             renderItem={(item) => {
                let comment = item.item

                return(
                    <Comment body = {comment.body}/>
                )
                }}
            />
        )
    }
}

class Posts extends Component{

    constructor(props){
        super(props)

        this.mounted = false
        this.state={
            posts:[],
            loaded: false
        }
    }

    async componentDidMount(){
        this.mounted = true
        let posts = await DatabaseService.getPosts() // retrieve posts from database

        if (this.mounted){ // to avoid memory leak, check if component is mounted before setting state
            this.setState({
                posts: posts,
                loaded: true
            })
        }
    }

    componentWillUnmount(){
        this.mounted = false
    }

    render(){
        // wait for posts to load
        if(!this.state.loaded){
            return(
                <AppLoading/>
            )
        }

        // display posts in a list component
        else{
            let posts = this.state.posts

            if (posts.length == 0){
                return(
                    <View style={[{flex: 1, justifyContent: "center"}]}>
                        <Title style={{color:"skyblue", fontSize: 25}}>
                            Nothing here yet.
                        </Title>
                    </View>
                )
            }
            else{
                return (
                    <FlatList
                        data={posts}
                        renderItem={(item) => {
                            let post = item.item
                            return(
                                <Card>
                                    <Post 
                                        title={post.title} 
                                        body={post.body}
                                    />
                                    <Comments comments={post.comments}/>
                                </Card>
                            )
                        }}
                    />
                )
            }                
            
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

    render(){
        let isVisible = this.state.modalVisible

        return(
            <View>

                {/* new post creation modal */}
                <Modal
                    isVisible = {isVisible}
                    animationIn={'slideInUp'}
                    animationOut={'zoomOut'}
                    animationInTiming={500}
                    animationOutTiming={500}
                >
                    <View style={{borderRadius: 10, padding: 20, backgroundColor: "white"}}>
                        <View style={[{flexDirection: "row", justifyContent: "flex-end"}]}>

                            {/* cancel button */}
                            <TouchableOpacity onPress={() => {this.hideModal()}}>
                                <Icon 
                                    name="cross"
                                    color="powderblue" 
                                    size={30}
                                />
                            </TouchableOpacity>
                        </View>

                        {/* new post creation form*/}
                        <NewPost closeView = {this.hideModal}/>
                    </View>
                </Modal>

                {/* actual footer */}
                <Footer>

                        {/* new post button */}
                        <TouchableOpacity 
                            onPress={() => {this.renderModal()}} 
                            style={styles.newPostButton}>
                            <Icon 
                                name="plus"
                                color="white" 
                                size={30}
                            />
                        </TouchableOpacity>
                </Footer>
            </View>
        )
    }
}

// main component
export default class Main extends Component{
    render(){
        return(
            <Container style={{backgroundColor:'powderblue'}}>
                <MainHeader/>
                <View style={{flex: 1}}>
                    <Posts/>
                </View>
                <MainFooter/>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    newPostButton:{
        flex:1,
        backgroundColor: "powderblue",
        justifyContent:"center",
        alignItems:"center",
        borderTopWidth: 1,
        borderColor: "white"
    },
    seeBorders:{
        borderWidth:1,
        borderColor:"red"
    }
})