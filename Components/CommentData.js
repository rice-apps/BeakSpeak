import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { observer } from 'mobx-react';
import Comment from '../Components/Comment';

let CommentData;
export default (CommentData = observer(
    class CommentData extends Component {
        // increment vote count up by 1
        upvoteScore = () => {
            let old_vote = this.props.comment.userVote;
            let score = this.props.comment.score;
            let new_vote;
            if (old_vote === 1) {
                new_vote = 0;
                score -= 1;
            }
            if (old_vote === 0) {
                new_vote = 1;
                score += 1;
            }
            if (old_vote === -1) {
                new_vote = 1;
                score += 2;
            }
            this.props.comment.updateVote(new_vote, this.props.comment._id, this.props.post_id);
            this.props.comment.score = score;
        };

        // increment vote count down by 1
        downvoteScore = () => {
            let old_vote = this.props.comment.userVote;
            let score = this.props.comment.score;
            let new_vote;
            if (old_vote === 1) {
                new_vote = -1;
                score -= 2;
            }
            if (old_vote === 0) {
                new_vote = -1;
                score -= 1;
            }
            if (old_vote === -1) {
                new_vote = 0;
                score += 1;
            }
            this.props.comment.updateVote(new_vote, this.props.comment._id, this.props.post_id);
            this.props.comment.score = score;
        };

        render () {
            let comment = this.props.comment
            return(
                <Comment
                    id = {this.props.comment._id}
                    vote = {comment.userVote}
                    score = {comment.score}
                    body = {comment.body}
                    upvoteScore = {this.upvoteScore}
                    downvoteScore = {this.downvoteScore}
                    showVote = {!this.props.isMain}
                    showReport = {!this.props.isMain}
                />
            );
        }
    }
));

const styles = StyleSheet.create({
    container: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: "powderblue",
        width: '15',
        height: 15,
        borderColor: 'powderblue',
        borderWidth: 15,
        borderRadius: 15,
    },
    card: {
        borderColor: 'powderblue',
        borderWidth: 5,
        borderRadius: 15,
    },
});
