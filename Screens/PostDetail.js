import React, {Component} from 'react'
import {Header} from 'react-navigation'
import {
  FlatList, 
  Keyboard, 
  KeyboardAvoidingView, 
  RefreshControl, 
  StyleSheet, 
  Platform, 
  StatusBar, 
  Text
} from 'react-native'
import {Button, Card, Icon, Input, View} from 'native-base'
import {inject, observer} from 'mobx-react';
import * as Mobx from "mobx";

import Blank from '../Components/Blank'
import PostData from '../Components/PostData'
import CommentData from '../Components/CommentData';
import CommentModel from '../Store/Models/CommentModel'

const platformDiff = (Platform.OS === 'ios') ? StatusBar.currentHeight : StatusBar.currentHeight

// Footer component for writing and submitting comments.
const PostDetailFooter = observer(
    class PostDetailFooter extends Component {

        constructor(props) {
            super(props);
            this.maxLen = 200
            this.state = {
                input: ''
            };
        }

        onSubmit() {
            if (this.state.input) {
                this.props.post.addComment(this.state.input);
                this.setState({input: ''})
            }
        }

        getColor = () => {
            if (this.state.input.length >= this.maxLen) {
                return 'red'
            }
            return 'gray'
        }

        render() {
            return (
                <KeyboardAvoidingView
                    keyboardVerticalOffset={Platform.select({ios: Header.HEIGHT, android: Header.HEIGHT + StatusBar.currentHeight})}
                    behavior= {(Platform.OS === 'ios')? "padding" : "position"}
                    keyboardShouldPersistTaps={false}>

                    <View style={styles.commentInputContainer}>

                        {/* takes user comment input */}
                        <Input
                            placeholder='Your comment here...'
                            onChangeText={(text) => {
                                this.setState({input: text})
                            }}
                            multiline={true}
                            maxLength = {this.maxLen}
                            value={this.state.input}
                        />
                        <Text
                            style = {{color: this.getColor()}}
                        >
                            {this.maxLen - this.state.input.length}
                        </Text>    
                        {/* submits comment*/}
                        <Button
                            transparent
                            onPress={() => {
                                this.onSubmit()
                            }}>
                                <Icon name='telegram'
                                  type='MaterialCommunityIcons'
                                  style={{color: 'lightskyblue'}}
                                  
                            />
                        </Button>
                    </View>
                </KeyboardAvoidingView>
            )
        }
    });

// Comments container of custom comment components.
const Comments = observer(
    class Comments extends Component {
        render() {
            let comments = this.props.comments;

            return (
                <FlatList
                    data={comments.slice()}
                    keyExtractor={(item, index) => item._id}
                    renderItem={(item) => {
                        let comment = item.item;
                        return (
                            <Card>
                                <CommentData
                                    comment={comment}
                                    post_id={this.props.post_id}
                                    showVote={true}
                                    showVoteScoreOnly={false}
                                />
                            </Card>
                        )
                    }}
                />
            )
        }
    });

// Post detail page component.
export default PostDetail = inject('store')(
    observer(
        class PostDetailScreen extends Component {

            // initialize with default values -- DO NOT fetch data here
            constructor(props) {
                super(props);
                this.offset = 0;

                this.state = {
                    refresh: false
                }
            }

            // Handle refresh, update posts.
            _onRefresh = async () => {
                this.setState((state) => ({refresh: true})); // indicate we are refreshing
                let id = this.props.navigation.getParam('id');
                let post = this.props.store.getPost(id);

                post.update()
                    .then(() => this.setState((state) => ({refresh: false}))) // refresh data
            };

            // Render post item.
            _renderItem = (item) => {
                let post = item.item;

                return (
                    <View style={{flex: 1}}>
                        <Card>
                            <PostData
                                post={post}
                            />
                        </Card>
                        <Comments
                            comments={post.comments}
                            post_id={post._id}
                        />
                    </View>
                )
            };

            _handleScroll = newY => {
              return newY - this.offset <= 0
            };

            // render a post with comments -- use posts component from main as an example for structure
            render() {
                let id = this.props.navigation.getParam('id');
                let post = this.props.store.getPost(id);

                // display posts in a list component
                let refresh = this.state.refresh;

                return (
                    <View style={{flex: 1, backgroundColor: 'lightskyblue'}}>
                        <View style={{flex: 1}}>

                            {/*Scrolling list of comments + post*/}
                            <FlatList
                                data={[post]}
                                renderItem={(item) => {
                                    return this._renderItem(item)
                                }}
                                keyExtractor={(item, index) => item._id}
                                onScrollBeginDrag={(e) => this.offset = e.nativeEvent.contentOffset.y}
                                onScrollEndDrag={(e) => this._handleScroll(e.nativeEvent.contentOffset.y) ? Keyboard.dismiss() : {}}
                                refreshControl={ // controls refreshing
                                    <RefreshControl
                                        refreshing={refresh}
                                        onRefresh={this._onRefresh}
                                        tintColor='skyblue'
                                    />
                                }
                                ListEmptyComponent={<Blank/>}
                                contentContainerStyle={(post === undefined) ? {
                                    flex: 1,
                                    alignItems: 'center',
                                    flexWrap: 'wrap'
                                } : {}}
                            />
                        </View>

                        {/* comments field */}
                        <PostDetailFooter post={post}/>
                    </View>
                )
            }
        }))


const styles = StyleSheet.create({
    newPostButton: {
        flex: 1,
        backgroundColor: 'lightskyblue',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopWidth: 1,
        borderColor: 'white'
    },
    commentInputContainer: {
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: '#EEE',
        flexDirection: 'row',
        alignItems: 'center'
    },
    seeBorders: {
        borderWidth: 5,
        borderColor: 'red'
    }
});