import {CONFIG} from "../config";
import FormData from 'FormData'

const apiUrl = CONFIG.api_url
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJubnExIiwiYXR0cmlidXRlcyI6eyJlZHVQZXJzb25QcmltYXJ5QWZmaWxpYXRpb24iOiJzdHVkZW50In19LCJ1c2VySUQiOiI1YWMwNzExZTRlODllOTI1MDg3N2UzM2IiLCJpYXQiOjE1MjMxMjg1MzZ9._WGFs5k95-Q9akQ8SfvJId63RX5TSi6CfHXtps23mgw"

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

export async function sendNewPost(newPost) {
    
    try{
        let res = await fetch(apiUrl+'/posts',{
            method: 'POST',
            headers: {
                'x-access-token': token,
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: newPost.title,
                body: newPost.body
            }, removeNull = (key, value) => {
                return (value == null) ? '' : value
            })
        })
        console.log(res)
    }catch(err){
        console.log(err)
    }
}

export default{
    getPosts,
    sendNewPost
}
