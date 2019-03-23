import { observable, action, transaction, decorate} from "mobx"
const uuidv4 = require('uuid/v4')

import DatabaseService from '../../Services/DatabaseService'

export default class CommentModel {
    body = ""
    _id = ""
    userVote = 0
    score = 0
    constructor(body) {
        this.body = body
        this._id = uuidv4()
    }

    static make(newComment) {
        let proto_com = new CommentModel(newComment.body)
        proto_com._id = newComment._id
        proto_com.score = newComment.score
        proto_com.userVote = newComment.userVote

        return proto_com
    }

    updateVote(new_vote, commentid, postid) {
        this.userVote = new_vote
        DatabaseService.updateVotesOnComment(commentid, postid, new_vote)
    }

}

decorate(CommentModel, {
    userVote: observable,
    score: observable,
    updateVote: action
})
