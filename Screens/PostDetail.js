import React, {Component} from 'react'
import {Card, Container} from 'native-base'
import {FlatList, RefreshControl, StyleSheet, ScrollView} from 'react-native'
import Post from '../Components/Post'

import DatabaseService from '../Services/DatabaseService'
import Blank from '../Components/Blank'
import Comment from "../Components/Comment";

//TODO: implement this class
export default class PostDetailScreen extends Component {

    // initialize with default values -- DO NOT fetch data here
    constructor(props) {
        super(props)

        // default state -- we have no post and nothing is loaded
        this.state = {
            post: null,
            loaded: false
        }
    }

    // TODO: fetch data from database
    componentDidMount = async () => {
        this.mounted = true

        post_id = this.props.navigation.getParam('id') // use this post id to query the individual post from the backend
        let post = await DatabaseService.getPost(post_id) // put database logic here -- look in Services/DatabaseService for the appropriate method
        // console.log(post)
        if (this.mounted) { // set state here to avoid memory leak
            this.setState({
                post: post,
                loaded: true,
                refresh: false
            })
            console.log('make sure to set refresh to false and load to true -- like in Main screen!')
        }
    }

    // nothing to code here, a security measure to prevent memory leak -- look up react component lifecycle
    componentWillUnmount = () => {
        this.mounted = false
    }

    _renderItem = (item) => {
        let comm = item.item

        return (
            <Card>
                <Comment
                    body={comm.body}
                />
            </Card>
        )
    }

    // render a post with comments -- use posts component from main as an example for structure
    render = () => {

        let loaded = this.state.loaded

        if (!loaded) {
            return ("refresh!")
        }

        else {
            let post = this.state.post

            return (<Container style = {{backgroundColor: 'powderblue'}}>
                <Card>
                <Post
                    title={post.title}
                    body={post.body}
                />
                </Card>
                <FlatList
                    data={post["comments"]}
                    renderItem={(item) => {
                        return this._renderItem(item)
                    }}
                    keyExtractor={(item, index) => item._id}
                    ListEmptyComponent={<Blank/>}
                />

            </Container>)
        }

        // return(
        //     <Blank/> //placeholder, delete with actual code
        //     /*Use Post from Components folder*/
        //     /*Use Comment from Componenst folder and construct comments*/
        //     /*BONUS: create an input field for new comments*/
        // )
    }


}

const styles = StyleSheet.create(
    {
        titlefont: {
            fontWeight: 'bold',
        },
        card: {
            borderColor: 'powderblue',
            borderWidth: 5,
            borderRadius: 15
        },
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
    }
)