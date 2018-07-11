# BeakSpeak Mobile App
WIP - The product of RiceApps's endeavors to recreate the magic of YikYak without all the bad stuff. 

## Dependencies
+ [NodeJS](https://nodejs.org/)
+ [ReactNative](https://facebook.github.io/react-native/)
+ [Expo](https://expo.io)

## Running
1. Download the Expo App 
2. Change to BeakSpeak's project directory 
3. Open up a terminal and install dependencies with:
```
npm install
```

4. Then, run in terminal:
```
npm run
```
5. You will be given a QR Code to scan and preview the app on your phone via the Expo client, or enter s and your phone number to get a link to the app preview

## Connecting to Backend
1. Clone the [backend repo](https://github.com/rice-apps/riceyak-expressjs) and follow its instruction set
2. Determine which network you're on and edit `config.js`:
    - if you are on the Rice network, change the value for `ip` to `rice_ip`
    - If you are on a different network, change the value for `curr_ip` to your IP address and change the value for `ip` to `curr_ip`

## Gallery
![login](/Gallery/login.PNG?raw=true "Login Page") ![empty](/Gallery/posts1.PNG?raw=true "Main Page - Empty") ![posts](/Gallery/posts2.PNG?raw=true "Main Page - Posts") ![new](/Gallery/newpost.PNG?raw=true "Create New Post")