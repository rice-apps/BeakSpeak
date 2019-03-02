import React, {Component} from 'react'
import {Button, FlatList, StyleSheet} from "react-native"
import {Card} from 'native-base'
import Comment from '../Components/Comment'
import { observer } from 'mobx-react';


export default CommentData = observer(
class CommentData extends Component {

    // increment vote count up by 1
upvoteScore = () => { 
    old_vote = this.props.comment.userVote
    score = this.props.comment.score
    if (old_vote == 1) {
        new_vote = 0
        score -= 1
    }
    if (old_vote == 0) {
        new_vote = 1
        score += 1
    }
    if (old_vote == -1) {
        new_vote = 1
        score += 2
    }
    this.props.comment.updateVote(new_vote, this.props.comment._id, this.props.post_id)
    this.props.comment.score = score

}

// increment vote count down by 1
downvoteScore = async() => {
    old_vote = this.props.comment.userVote
    score = this.props.comment.score

    if (old_vote == 1) {
        new_vote = -1
        score -= 2
    }
    if (old_vote == 0) {
        new_vote = -1
        score -= 1
    }
    if (old_vote == -1) {
        new_vote = 0
        score += 1
    }
    this.props.comment.updateVote(new_vote, this.props.comment._id, this.props.post_id)
    this.props.comment.score = score
}


    render () {
        let comment = this.props.comment
        return(
            <Comment
                vote = {comment.vote}
                score = {comment.score}
                body = {comment.body}
                upvoteScore = {this.upvoteScore}
                downvoteScore = {this.downvoteScore}
                showVote = {this.props.showVote}
            />
        )
    }
})

const styles = StyleSheet.create({
    container: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
    button: {
    backgroundColor: "powderblue",
    width: '15%',
    height: 15,
    borderColor: "powderblue",
    borderWidth: 15,
    borderRadius: 15
  },
    card: {
        borderColor: "powderblue",
        borderWidth: 5,
        borderRadius: 15
    }
})