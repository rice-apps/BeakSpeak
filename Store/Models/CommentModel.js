import {action, observable, transaction} from "mobx"
import DatabaseService from '../../Services/DatabaseService'

const uuidv4 = require('uuid/v4');

export default class CommentModel {
    body = "";
    _id = "";
    @observable userVote = 0;
    @observable score = 0;
    @observable comments = [];

    constructor(body) {
        this.body = body;
        this._id = uuidv4()
    }

    static make(newComment) {
        let proto_comment = new CommentModel(newComment.body);
        proto_comment._id = newComment._id;
        proto_comment.score = newComment.score;
        proto_comment.userVote = newComment.userVote;
        return proto_comment
    }

    @action
    async update() {
        let proto_comment = await DatabaseService.getPost(this._id);
        let post = CommentModel.make(proto_comment);

        transaction(() => {
            this.votes = post.votes;
            this.score = post.score;
        })
    }

}
