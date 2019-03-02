import React, {Component, PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import {CardItem, Icon, Text} from 'native-base'

// body with comment content
export class CommentBody extends Component {
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

// side of comment with vote arrow
class PostVotes extends PureComponent {
    upvoteScore = () => {
        this.props.upvoteScore()
    }

    downvoteScore = () => {
        this.props.downvoteScore()
    }

    render() {
        let vote = this.props.comment.userVote === undefined ? 0 : this.props.comment.userVote
        let upvoteIconColor = vote === 1 ? "orange" : "black"
        let downvoteIconColor = vote === -1 ? "blue" : "black"
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

// main component
export default class Comment extends PureComponent {

    render() {
        let body = this.props.body
        return (
            <View>
                <View style={{flex: 1, flexDirection: 'row'}}>
                    <View style={[{flex: 7, justifyContent: 'center'}]}>
                        <CommentBody body={body}/>
                    </View>

                    {/* voting component -- show on detail screen*/}
                    {this.props.showVote &&
                    <View style={{flex: 1}}>
                        <PostVotes
                            comment={this.props.comment}
                            score={this.props.score}
                            upvoteScore={this.props.upvoteScore}
                            downvoteScore={this.props.downvoteScore}
                        />
                    </View>
                    }
                </View>
            </View>

        )
    }
}

const styles = StyleSheet.create({
    card: {
        borderColor: "powderblue",
        borderWidth: 5,
        borderRadius: 15
    },
    seeBorders: {
        borderWidth: 1,
        borderColor: 'red'
    }
})