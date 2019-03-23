import React, {Component, PureComponent} from 'react'
import {StyleSheet, View} from 'react-native'
import {Card, CardItem, Title, Button, Text, Icon} from 'native-base'

import DatabaseService from '../Services/DatabaseService'
import { observable } from 'mobx';

// body with comment content
export class CommentBody extends Component{
    render () {
        return(
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
        let vote = this.props.vote
        let upvoteIconColor =  vote == 1 ? "orange" : "black"
        let downvoteIconColor = vote == -1 ?  "blue" : "black"
        return(
            <View style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
                
                {/* upvote button */}
                <Icon
                    name = 'ios-arrow-up'
                    fontSize = {30}
                    type = 'Ionicons'
                    style = {{color: upvoteIconColor, paddingRight: 10, fontWeight : 'bold', fontSize: 35}}
                    onPress = {() => this.upvoteScore()}
                />

                {/* score */}                                
                <Text style = {{paddingRight: 10}}>
                    {this.props.score}
                </Text>
                
                {/* downvote button */}                
                <Icon
                    name = 'ios-arrow-down'
                    fontSize = {30}
                    type = 'Ionicons'
                    style = {{color: downvoteIconColor, paddingRight: 10, fontWeight : 'bold', fontSize: 35}}
                    onPress = {() => this.downvoteScore()}
                />
            </View>
        )
    }
}

// main component
export default class Comment extends PureComponent{
    
    render () {
        let body = this.props.body
        return(
                <View>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={[{ flex: 7, justifyContent: 'center' }]}>
                            <CommentBody body = {body}/>
                        </View>                

                        {/* voting component -- show on detail screen*/}
                        {this.props.showVote &&
                        <View style = {{ flex: 1}}>
                            <PostVotes
                                vote = {this.props.vote}
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
        borderColor:'red'
    }
})