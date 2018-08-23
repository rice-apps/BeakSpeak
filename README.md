# BeakSpeak Mobile App
WIP - The product of RiceApps's endeavors to recreate the magic of YikYak without all the bad stuff. 

## Dependencies
+ [NodeJS](https://nodejs.org/)
+ [ReactNative](https://facebook.github.io/react-native/)
+ [Expo](https://expo.io)
+ [react-native-cli](https://www.npmjs.com/package/react-native-cli)
+ [Watchman](https://facebook.github.io/watchman/docs/install.html)

## Running
1. Download the Expo App on your phone
2. Change to BeakSpeak's project directory 
3. Open up a terminal and install dependencies with:
```
npm install
```

4. Then, run in terminal:
```
npm start
```

5. Next, globally install `react-native-cli`:
```
npm install -g react-native-cli
```

6. Link assets:
```
react-native link
```

7. You will be given a QR Code to scan and preview the app on your phone via the Expo client (Android), or enter s and your phone number to get a link to the app preview (iOS)


## Connecting to Backend
1. Clone the [backend repo](https://github.com/rice-apps/riceyak-expressjs) and follow its instruction set
2. Determine which network you're on and edit `config.js`:
    - Set the value of `ip` to your network's IP address

## Gallery
### Splash Screen
![splashscreen](/Gallery/splash_screen.png?raw=true)
### iOS App
![ios gif](/Gallery/ios.gif)
### Android App
![android gif](/Gallery/android.gif)