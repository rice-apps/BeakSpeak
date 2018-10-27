import {CONFIG} from "../config";
const apiUrl = CONFIG.api_url
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InVzZXIiOiJubnExIiwiYXR0cmlidXRlcyI6eyJlZHVQZXJzb25QcmltYXJ5QWZmaWxpYXRpb24iOiJzdHVkZW50In19LCJ1c2VySUQiOiI1YjVmOWE5YWRlNTdiNzQxZmZjM2U2MWUiLCJpYXQiOjE1MzI5OTIxNTR9.cr29eYKLTpaAuqcpk08XtrMt6FZj9S8Yvll3rzEMYus"

login = async() => {
  
    try{
        let a = await fetch('https://idp.rice.edu/idp/profile/cas/login?service=http://localhost:4200/auth', {
        method: 'GET',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
            }
        });

        let data = {
            'j_username': 'nnq1',
            'j_password': 'Prettyflower1!',
            '_eventId_proceed': ''
        };
    
        let b = await fetch(a.url, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36',
                'Content-Type': 'application/x-www-form-urlencoded',
                'Referer' : a.Referer
            },
            body: JSON.stringify(data)
        });
        console.log(b)

    }catch(err){
        console.log(err)
    }
}

export default{
    login
}
