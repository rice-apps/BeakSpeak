import React, {Component, PureComponent} from 'react';
import Modal from 'react-native-modal';
import {CardItem, Button, Text, Icon, Footer} from 'native-base';
import {StyleSheet, TouchableWithoutFeedback, View, TouchableOpacity} from 'react-native';
import {NewReport} from '../Components/Report';
import DatabaseService from '../Services/DatabaseService';
import {inject, observer} from 'mobx-react'


// body with post content and potentially votes
class PostBody extends PureComponent {
    render() {
        return (
            <CardItem>
                <Text>{this.props.body}</Text>
            </CardItem>
        );
    }
}

class PostVotes extends PureComponent {
    upvoteScore = () => {
        this.props.upvoteScore();
    };

    downvoteScore = () => {
        this.props.downvoteScore();
    };

    resentPost = async () => {
        // let resentPost = await DatabaseService.sendNewPost(this.props.title, this.props.body, this.props.id);
        // this.props.store.fetchPost(this.props.id);
        // await DatabaseService.sendNewPost(this.props.title, this.props.body, this.props.id);
        // if (resentPost != undefined) {
        this.props.updateSent();
    }

    render() {
        let vote = this.props.vote;
        let upvoteIconColor = vote === 1 ? 'orange' : 'black';
        let downvoteIconColor = vote === -1 ? 'blue' : 'black';
        if (this.props.sent) {
            return (
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                    {/* upvote button */}
                    <TouchableOpacity
                        hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
                        onPress={() => this.upvoteScore()}
                    >
                        <Icon
                            name="ios-arrow-up"
                            fontSize={30}
                            type="Ionicons"
                            style={{color: upvoteIconColor}}
                        />

                    </TouchableOpacity>
                    {/* score */}
                    <Text>{this.props.score}</Text>

                    {/* downvote button */}
                    <TouchableOpacity
                        hitSlop={{top: 20, left: 20, bottom: 20, right: 20}}
                        onPress={() => this.downvoteScore()}
                    >
                        <Icon
                            name="ios-arrow-down"
                            fontSize={30}
                            type="Ionicons"
                            style={{color: downvoteIconColor}}
                        />
                    </TouchableOpacity>
                </View>
            );
        }
        else {
            return (
                <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                    <Icon
                        isVisible={false}
                        name='alert-circle-outline'
                        fontSize={30}
                        type='MaterialCommunityIcons'
                        style={{borderTopWidth: 20, color: 'grey'}}
                        onPress={() => this.resentPost()}
                    />
                </View>
            );
        }
    }
}

// header with title and potentially avatar and time info
class PostHeader extends PureComponent {
    render() {
        return (
            <CardItem>
                <Text style={styles.titlefont}>{this.props.title}</Text>
            </CardItem>
        );
    }
}

class PostFooter extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            modalVisible: false,
        };
    }

    renderModal = () => {
        this.setState({modalVisible: true});
    };

    hideModal = () => {
        this.setState({modalVisible: false});
    };

    pressReact = react => {
        this.props.updateReact(react);
    };

    render() {
        let userReact = this.props.userReact;
        let reactCounts = this.props.reactCounts;
        let isVisible = this.state.modalVisible;
        return (
            <View>
                <View style={styles.container}>
                    <Button
                        onPress={() => this.pressReact('angry')}
                        style={userReact === 'angry' ? styles.buttonPress : {}}
                        transparent
                        rounded>
                        <Text adjustsFontSizeToFit style={{color: userReact === 'angry' ? 'white' : 'black'}}>
                            😡{reactCounts['angry'].toString()}
                        </Text>
                    </Button>
                    <Button
                        onPress={() => this.pressReact('funny')}
                        style={userReact === 'funny' ? styles.buttonPress : {}}
                        transparent
                        rounded>
                        <Text adjustsFontSizeToFit style={{color: userReact === 'funny' ? 'white' : 'black'}}>
                            😂{reactCounts['funny'].toString()}
                        </Text>
                    </Button>
                    <Button
                        onPress={() => this.pressReact('love')}
                        style={userReact === 'love' ? styles.buttonPress : {}}
                        transparent
                        rounded>
                        <Text adjustsFontSizeToFit style={{color: userReact === 'love' ? 'white' : 'black'}}>
                            😍{reactCounts['love'].toString()}
                        </Text>
                    </Button>
                    <Button
                        onPress={() => this.pressReact('sad')}
                        style={userReact === 'sad' ? styles.buttonPress : {}}
                        transparent
                        rounded>
                        <Text adjustsFontSizeToFit style={{color: userReact === 'sad' ? 'white' : 'black'}}>
                            😭{reactCounts['sad'].toString()}
                        </Text>
                    </Button>
                    <Button
                        onPress={() => this.pressReact('wow')}
                        style={userReact === 'wow' ? styles.buttonPress : {}}
                        transparent
                        rounded>
                        <Text adjustsFontSizeToFit style={{color: userReact === 'wow' ? 'white' : 'black'}}>
                            😮{reactCounts['wow'].toString()}
                        </Text>
                    </Button>
                </View>

                <View>
                    {/* new post creation modal */}
                    <Modal
                        isVisible={isVisible}
                        animationIn={'zoomIn'}
                        animationOut={'zoomOut'}
                        animationInTiming={500}
                        animationOutTiming={500}>
                        <View
                            style={{
                                borderRadius: 10,
                                padding: 10,
                                backgroundColor: 'white',
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}>
                                {/* cancel button */}
                                <Icon
                                    name="close"
                                    fontSize={30}
                                    type="MaterialCommunityIcons"
                                    style={{color: 'skyblue'}}
                                    onPress={this.hideModal}
                                />
                            </View>
                            {/* report form*/}
                            <NewReport closeView={this.hideModal} id={this.props.id}/>
                        </View>
                    </Modal>

                    {/* actual footer */}
                    <View>
                        <Footer
                            style={{
                                backgroundColor: 'white',
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'flex-end',
                                borderColor: 'white',
                            }}>
                            {/* report button */}
                            <TouchableWithoutFeedback onPress={this.renderModal}>
                                <View style={[styles.reportButton]}>
                                    <Icon
                                        name="flag"
                                        type="MaterialCommunityIcons"
                                        style={{color: 'powderblue', fontSize: 25}}
                                    />
                                </View>
                            </TouchableWithoutFeedback>
                        </Footer>
                    </View>
                </View>
            </View>
        );
    }
}

// main component -- pure component for rendering optimization (view only)
export default class Post extends Component {
    render() {

        return (
            <View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    {/* post component decomposed into children components */}
                    <View style={[{flex: 7, justifyContent: 'center'}]}>
                        <PostHeader title={this.props.title}/>
                    </View>

                    {/* voting component */}
                    <View style={{flex: 1}}>
                        <PostVotes
                            vote={this.props.vote}
                            score={this.props.score}
                            upvoteScore={this.props.upvoteScore}
                            downvoteScore={this.props.downvoteScore}
                            updateSent={this.props.updateSent}
                            sent={this.props.sent}
                            title={this.props.title}
                            body={this.props.body}
                            id={this.props.id}
                        />
                    </View>
                </View>

                {/* body of post */}
                <PostBody body={this.props.body}/>
                <PostFooter
                    id={this.props.id}
                    userReact={this.props.userReact}
                    reactCounts={this.props.reactCounts}
                    updateReact={this.props.updateReact}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    reportButton: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-start',
        borderTopWidth: 1,
        borderColor: 'white',
        margin: 15,
    },
    button: {
        backgroundColor: 'powderblue',
        height: 35,
        width: 70,
        borderWidth: 0.5,
        borderRadius: 15,
        justifyContent: 'center',
    },
    buttonPress: {
        backgroundColor: 'powderblue',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    card: {
        borderColor: 'powderblue',
        borderWidth: 5,
        borderRadius: 15,
    },
    titlefont: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    seeBorders: {
        borderWidth: 1,
        borderColor: 'red',
    },
});
