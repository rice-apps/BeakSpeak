import {CONFIG} from "../config";

const apiUrl = CONFIG.api_url;
import UserStore from '../Store/UserStore'

export async function getPosts() {
    try{
        let res = await fetch(apiUrl+'/posts',{
            method: 'GET',
            headers: {
                'x-access-token': UserStore.getToken()
            }
        });
        return await res.json()
    }catch(err){
        console.log(err)
    }
}

export async function sendNewPost(title, body, id) {
    try{
        let res = await fetch(apiUrl+'/posts',{
            method: 'POST',
            headers: {
                'x-access-token': UserStore.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
                body: body,
                id: id
            }, removeNull = (key, value) => {
                return (value == null) ? '' : value
            })
        });
        return await res.json()
    }catch(err){
        console.log(err)
    }
}


export async function sendReport(type, reason, id) {
    try{
        let res = await fetch(apiUrl+'/reports',{
            method: 'POST',
            headers: {
                'x-access-token': UserStore.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: type,
                reason: reason,
                id: id
            }, removeNull = (key, value) => {
                return (value == null) ? '' : value
            })
        })
        if (res.status == 200) {
            return true
        } 
        return false
    } catch(err){
        console.log(err)
    }
}


export async function postComment(postid, comment) {
    try{
        let res = await fetch(apiUrl+'/posts/'+postid+'/comments', {
            method: 'POST',
            headers: {
                'x-access-token': UserStore.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: comment.body,
                comment_id: comment._id
            })
        });
        return await res.json();
    }catch(err) {
        console.log(err)
    }
}

export async function getPost(id) {
    try{
        let res = await fetch(apiUrl+'/posts/'+id,{
            method: 'GET',
            headers: {
                'x-access-token': UserStore.getToken()
            }
        });
        return await res.json()
    }catch(err) {
        console.log(err)
    }
}

// change the react count of a post and the reactions of the user
export async function updateReact(postid, reaction) {
    try {
        let res = await fetch(apiUrl+"/posts/"+postid+"/reacts", {
            method: 'PUT',
            headers: {
                'x-access-token': UserStore.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                react: reaction
            })

        })

    } catch(err) {
        console.log(err)
    }
}

export async function updateVotes(id, vote) {
    try {
        let res = await fetch(apiUrl + '/posts/' + id + '/vote', {
            method: 'PUT',
            headers: {
                'x-access-token': UserStore.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({vote: vote}, 
                removeNull = (key, value) => {
                return (value == null) ? '' : value
            })
        });
        return await res.json()
    } catch (err) {
        console.log(err)
    }
}

export async function updateVotesOnComment(commentid, postid, vote) {
    try {
        let res = await fetch(apiUrl + '/posts/' + postid + '/voteComment', {
            method: 'PUT',
            headers: {
                'x-access-token': UserStore.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                vote: vote,
                comment_id: commentid 
            }, 
                removeNull = (key, value) => {
                return (value == null) ? '' : value
            })
        });
        console.log("in votes on comments")
        return await res.json()
    } catch (err) {
        console.log(err)
    }
}
export default{
    getPosts,
    sendNewPost,
    sendReport,
    updateReact,
    updateVotes,
    updateVotesOnComment,
    postComment,
    getPost
}
