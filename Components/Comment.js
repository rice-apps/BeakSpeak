import React, {Component, PureComponent} from 'react'
import {StyleSheet, TouchableOpacity, View} from 'react-native'
import {Card, CardItem, Title, Button, Text, Icon, Footer} from 'native-base'
import Modal from 'react-native-modal'

import {NewCommentReport} from "./Report";

// body with comment content
export class CommentBody extends Component {
    render() {
        return (
            <CardItem>
                <Text>{this.props.body}</Text>
            </CardItem>
        );
    }
}

// side of comment with vote arrow
class CommentVotes extends PureComponent {
    upvoteScore = () => {
        this.props.upvoteScore();
      };
    
      downvoteScore = () => {
        this.props.downvoteScore();
      };
    
      render() {
        let vote = this.props.vote;
        let upvoteIconColor = vote === 1 ? 'orange' : 'black';
        let downvoteIconColor = vote === -1 ? 'blue' : 'black';
        return (
          <View style={{ flex: 1, flexDirection: 'column', alignItems: 'center' }}>
            {/* upvote button */}
            <TouchableOpacity 
              hitSlop={{top: 20, left: 10, bottom: 20, right: 20}}
              onPress={() => this.upvoteScore()}
            >
            <Icon
              name="ios-arrow-up"
              fontSize={30}
              type="Ionicons"
              style={{ color: upvoteIconColor }}
            />
            </TouchableOpacity>
            {/* score */}
            <Text>{this.props.score}</Text>
    
            {/* downvote button */}
            <TouchableOpacity 
              hitSlop={{top: 20, left: 10, bottom: 20, right: 20}}
              onPress={() => this.downvoteScore()}
            >
            <Icon
              name="ios-arrow-down"
              fontSize={30}
              type="Ionicons"
              style={{ color: downvoteIconColor }}
            />
            </TouchableOpacity>
          </View>
        );
    }
}

class CommentFooter extends PureComponent{

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

    render() {
        let isVisible = this.state.modalVisible
        return(
            <View>

                <View>
                    {/* new report creation modal */}
                    <Modal
                        isVisible = {isVisible}
                        animationIn = {'zoomIn'}
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

                            {/* report form */}
                            <NewCommentReport
                                closeView = {this.hideModal}
                                id = {this.props.id}
                            />
                        </View>
                    </Modal>

                    {/* actual footer */}
                    <View>
                        <Footer
                            style={{backgroundColor: 'white',
                                flexDirection: 'row',
                                alignItems: 'left',
                                justifyContent: 'flex-start',
                                height: styles.reportButton.height,
                                borderColor: 'white'
                            }}
                        >
                            {/* report button */}
                            <Icon
                                name = 'flag-variant'
                                type = 'MaterialCommunityIcons'
                                style = {{color: 'powderblue', fontSize: 23}}
                                onPress = {this.renderModal}
                                />
                        </Footer>
                    </View>
                </View>
            </View>
        )
    }
}

// main component
export default class Comment extends PureComponent{

    render () {
        // let isVisible = this.state.modalVisible
        let body = this.props.body
        return(
            <View>
                <View style={{ flex: 1, flexDirection: 'row' }}>

                    {/* report component -- show on detail screen*/}
                    {this.props.showReport &&
                    <View style = {{ flex: 0.5}}>
                        <CommentFooter
                            id={this.props.id}
                        />
                    </View>
                    }

                    <View style={[{ flex: 7, justifyContent: 'center' }]}>
                        <CommentBody body = {body}/>
                    </View>

                    {/* voting component -- show on detail screen*/}
                    {this.props.showVote &&
                    <View style = {{ flex: 1}}>
                        <CommentVotes
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
    },
    reportButton: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderWidth: 1,
        borderColor: 'white',
        paddingTop: 10,
        paddingLeft: 5,
        paddingBottom: 5
    }
})
