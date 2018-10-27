import {CONFIG} from "../config";
import {Permissions} from "expo";


const apiUrl = CONFIG.api_url
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJubnExIiwiYXR0cmlidXRlcyI6eyJlZHVQZXJzb25QcmltYXJ5QWZmaWxpYXRpb24iOiJzdHVkZW50In19LCJ1c2VySUQiOiI1YjVmOWE5YWRlNTdiNzQxZmZjM2U2MWUiLCJpYXQiOjE1MzI5OTIxNTR9.cr29eYKLTpaAuqcpk08XtrMt6FZj9S8Yvll3rzEMYus"
const PUSH_ENDPOINT = apiUrl + '/users/push-token';

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
    }catch(err){
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

export async function updateReact(postid, reaction) {
    try {
        let res = await fetch(apiUrl + "/posts/" + postid + "/reacts", {
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
        // console.log(res)
    } catch(err) {
        console.log(err)
    }
}

async function registerForPushNotificationsAsync(userid) {
    const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
        // Android remote notification permissions are granted during the app
        // install, so this will only ask on iOS
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
        return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();

    console.log('token', token)

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    let res = fetch(PUSH_ENDPOINT, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: {
                value: token,
            },
            user: {
                user_id : userid
            },
        }),
    });
    console.log(res)

    return res;
}

//ExponentPushToken[xxxxxx]'
export async function sendNotification(expotoken) {
    try {

        let res = await fetch('https://exp.host/--/api/v2/push/send', {
            method: 'POST',
            to: expotoken,
            headers: {
                'Accept': 'application/json',
                'Accept-Encoding': 'gzip, deflate',
                'Content-Type': 'application/json'
            },
            body: 'Testing notification'
            }

        )
        console.log('notification', res)
    } catch(err) {
        console.log(err)
    }
}

export default{
    getPosts,
    sendNewPost,
    getPost,
    updateReact,
    registerForPushNotificationsAsync,
    sendNotification
}
