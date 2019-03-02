import React, {Component, PureComponent} from 'react'
import {Card, CardItem, Title, Button, Text, Icon} from 'native-base'
import {StyleSheet, View} from 'react-native'

// body with post content and potentially votes
class PostBody extends PureComponent {

    render() {
        return (
            <CardItem>
                <Text>
                    {this.props.body}
                </Text>
            </CardItem>
        )
    }
}

class PostVotes extends PureComponent {



    upvoteScore = () => {
        this.props.upvoteScore()
    }

    downvoteScore = () => {
        this.props.downvoteScore()
    }

    render() {
        let vote = this.props.vote
        let upvoteIconColor =  vote == 1 ? "orange" : "black"
        let downvoteIconColor = vote == -1 ?  "blue" : "black"
        return (
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>

                {/* upvote button */}
                <Icon
                    name='ios-arrow-up'
                    fontSize={30}
                    type='Ionicons'
                    style={{color: upvoteIconColor}}
                    onPress={() => this.upvoteScore()}
                />

                {/* score */}
                <Text>
                    {this.props.score}
                </Text>

                {/* downvote button */}
                <Icon
                    name='ios-arrow-down'
                    fontSize={30}
                    type='Ionicons'
                    style={{color: downvoteIconColor}}
                    onPress={() => this.downvoteScore()}
                />
            </View>
        )
    }
}

// header with title and potentially avatar and time info
class PostHeader extends PureComponent {

    render() {
        return (
            <CardItem>
                <Text style={styles.titlefont}>
                    {this.props.title}
                </Text>
            </CardItem>
        )
    }
}

class PostFooter extends PureComponent {

    pressReact = (react) => {
        this.props.updateReact(react)
    }

    render() {
        let userReact = this.props.userReact
        let reactCounts = this.props.reactCounts

        return (
            <View style={styles.container}>
                <Button onPress={() => this.pressReact("angry")} style={userReact == "angry" ? styles.buttonPress : {}} transparent rounded>
                    <Text adjustsFontSizeToFit={true} style = {{color:(userReact == "angry") ? "white" : "black"}}>
                        😡{reactCounts["angry"].toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("funny")} style={userReact == "funny" ? styles.buttonPress : {}} transparent rounded>
                    <Text adjustsFontSizeToFit={true} style = {{color:(userReact == "funny") ? "white" : "black"}}>
                        😂{reactCounts["funny"].toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("love")} style={userReact == "love" ? styles.buttonPress : {}} transparent rounded>
                    <Text adjustsFontSizeToFit={true} style = {{color:(userReact == "love") ? "white" : "black"}}>
                        😍{reactCounts["love"].toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("sad")} style={userReact == "sad" ? styles.buttonPress : {}} transparent rounded>
                    <Text adjustsFontSizeToFit={true} style = {{color:(userReact == "sad") ? "white" : "black"}}>
                        😭{reactCounts["sad"].toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("wow")} style={userReact == "wow" ? styles.buttonPress : {}} transparent rounded>
                    <Text adjustsFontSizeToFit={true} style = {{color:(userReact == "wow") ? "white" : "black"}}>
                        😮{reactCounts["wow"].toString()}</Text>
                </Button>
            </View>
        )
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
                        />
                    </View>
                </View>

                {/* body of post */}
                <PostBody body={this.props.body}/>
                <PostFooter
                    userReact={this.props.userReact}
                    reactCounts={this.props.reactCounts}
                    updateReact={this.props.updateReact}
                />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        paddingBottom: 5
    },
    button: {
        backgroundColor: "powderblue",
        height: 35,
        width: 70,
        borderWidth: 0.5,
        borderRadius: 15,
        justifyContent: 'center'
    },

    buttonPress: {
        backgroundColor: "powderblue",
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    card: {
        borderColor: "powderblue",
        borderWidth: 5,
        borderRadius: 15
    },
    titlefont: {
        fontWeight: 'bold',
        fontSize: 20
    }
})