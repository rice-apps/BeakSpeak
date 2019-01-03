import {CONFIG} from "../config";
const uuidv4 = require('uuid/v4')

const apiUrl = CONFIG.api_url
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJubnExIiwiYXR0cmlidXRlcyI6eyJlZHVQZXJzb25QcmltYXJ5QWZmaWxpYXRpb24iOiJzdHVkZW50In19LCJ1c2VySUQiOiI1YjVmOWE5YWRlNTdiNzQxZmZjM2U2MWUiLCJpYXQiOjE1MzI5OTIxNTR9.cr29eYKLTpaAuqcpk08XtrMt6FZj9S8Yvll3rzEMYus"

export async function getPosts() {
    try{
        let res = await fetch(apiUrl+'/posts',{
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
                'x-access-token': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({vote: vote}, 
                removeNull = (key, value) => {
                return (value == null) ? '' : value
            })
        })
        let posts = await res.json()
        return posts
    } catch (err) {
        console.log(err)
    }
}


export async function sendNewPost(title, body, id) {
    try{
        let res = await fetch(apiUrl+'/posts',{
            method: 'POST',
            headers: {
                'x-access-token': token,
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
        })
        let post = await res.json()
        console.log(post)
        return post
    }catch(err){
        console.log(err)
    }
}

export async function postComment(id, text) {
    try{
        let res = await fetch(apiUrl+'/posts/'+id+'/comments', {
            method: 'POST',
            headers: {
                'x-access-token': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                comment: text
            })
        });
        let post = await res.json();
        return post
    }catch(err) {
        console.log(err)
    }
}

export async function getPost(id) {
    try{
        let res = await fetch(apiUrl+'/posts/'+id,{
            method: 'GET',
            headers: {
                'x-access-token': token
            }
        })
        let posts = await res.json()
        return posts
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
                'x-access-token': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                react: reaction
            })

        })
        console.log(res)
        let print = await res.json()
        console.log(print)

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
    getPost
}
