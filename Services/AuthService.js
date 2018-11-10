import {CONFIG} from "../config";
const apiUrl = CONFIG.api_url;
import React, { Component } from 'react';
import {AsyncStorage } from 'react-native';


let data = {
    'j_username': 'nnq1',
    'j_password': 'Prettyflower1!',
    '_eventId_proceed': ''
};


let login = async() => {
    console.log(lala);

    try{
        fetch('https://idp.rice.edu/idp/profile/cas/login?service=https://speak.riceapps.org/auth', {
            method: 'GET',
            credentials: 'smae-origin',
            headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
            }
        }).then(fetch(a.url, {
            method: 'POST',
            credentials: 'smae-origin',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer' : a.Referer
            },
            body: JSON.stringify(data)
        }));
    }catch(err){
        console.log(err)
    }
};


export async function authenticate(ticket) {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJubnExIiwiYXR0cmlidXRlcyI6eyJlZHVQZXJzb25QcmltYXJ5QWZmaWxpYXRpb24iOiJzdHVkZW50In19LCJ1c2VySUQiOiI1YjVmOWE5YWRlNTdiNzQxZmZjM2U2MWUiLCJpYXQiOjE1MzI5OTIxNTR9.cr29eYKLTpaAuqcpk08XtrMt6FZj9S8Yvll3rzEMYus"
    AsyncStorage.setItem('userToken', token);
    return true;
    // Backend auth doesn't work rn
    try {
        let res = await fetch(apiUrl+'/auth'+ticket,{
            method: 'GET',
        });
        let token = await res.json();
        if (token && token.success){
            AsyncStorage.setItem('userToken', token);
            return true
        }}
        catch (err) {
            console.log(err)
        }
}

export default{
    login,
    authenticate
}
