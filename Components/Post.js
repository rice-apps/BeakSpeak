import React, {Component, PureComponent} from 'react'
import {View, Text} from 'react-native';
import {Card, CardItem, Icon} from 'native-base'
import {StyleSheet} from 'react-native'


// body with post content and potentially votes
class PostBody extends Component{

    render = () => {
        return(
            <CardItem>
                    <Text>
                        {this.props.body}
                    </Text>
            </CardItem>
        )
    }
}

class PostVotes extends Component {
    upvoteScore = () => {
        this.props.upvoteScore() 
    }

    downvoteScore = () => {
        this.props.downvoteScore() 
    }

    render = () => {
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
                    style = {{color: upvoteIconColor}}
                    onPress = {() => this.upvoteScore()}
                />

                {/* score */}                                
                <Text>
                    {this.props.score}
                </Text>
                
                {/* downvote button */}                
                <Icon
                    name = 'ios-arrow-down'
                    fontSize = {30}
                    type = 'Ionicons'
                    style = {{color: downvoteIconColor}}
                    onPress = {() => this.downvoteScore()}
                />
            </View>
        )
    }
}

// header with title and potentially avatar and time info
class PostHeader extends Component{

    render = () => {
        return(
            <CardItem>
                <Text style ={styles.titlefont}>
                    {this.props.title}
                </Text>
            </CardItem>                
        )
    }
}

// main component -- pure component for rendering optimization (view only)
export default class Post extends PureComponent{

    render = () => {
        let title = this.props.title
        let body = this.props.body
        let score = this.props.score
        let upvoteScore = this.props.upvoteScore
        let downvoteScore = this.props.downvoteScore
        let vote = this.props.vote

        return(
            <View>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    {/* post component decomposed into children components */}
                    <View style={[{ flex: 7, justifyContent: 'center' }]}>
                        <PostHeader title={title} />
                    </View>

                    {/* voting component */}
                    <View style = {{ flex: 1}}>
                        <PostVotes
                            vote = {vote}
                            score={score}
                            upvoteScore={upvoteScore}
                            downvoteScore={downvoteScore}
                        />
                    </View>
                </View>

                {/* body of post */}
                <PostBody body={body} />
            </View>
        )
    }
}

const styles = StyleSheet.create(
    {
        titlefont:{
            fontWeight: 'bold',
            fontSize: 20
        },
        seeBorders: {
            borderWidth: 5,
            borderColor:'red'
        }
    }
)