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

export async function getNPosts(numPosts) {
    try{
        let res = await fetch(apiUrl+'/posts/' + numPosts,{
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        })
        let posts = await res.json()
        return posts
    }catch(err){
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

export async function postComment(id, text) {
    try{
        let res = await fetch(apiUrl+'/posts/'+id+'/comments', {
            method: 'POST',
            headers: {
                'x-access-token': UserStore.getToken(),
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: text
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

export default{
    getPosts,
    sendNewPost,
    updateReact,
    updateVotes,
    postComment,
    getPost,
    getNPosts
}
