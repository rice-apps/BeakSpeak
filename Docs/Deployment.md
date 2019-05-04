# Deployment to Playstore (Android) and Appstore (iOS)

## Playstore
+ 1. Create a Google Play Developer account ($25 one time fee)
    + Use Rice-Apps team gmail
+ 2. Build an apk file of your project
    + Vanilla React Native
        + Use `keytool` and configure gradle
        + https://facebook.github.io/react-native/docs/signed-apk-android
    + Expo + React Native
        + Run `exp build:android` in project directory
        + First time let expo handle keystore stuff
        + Then fetch all keystore information and preserve it
            + Run `exp fetch:android:keystore`
            + For future production builds, upload this information to expo.
              Expo will store keystore information by default on its servers
              *but just in case make sure to upload keystore information when asked* 
+ 3. On the Google Play Developer console, navigate to `All applications` and hit
     `Create new application`
    + Required Screenshots
        + You will need a high-res square png of the app icon. Check out size
          limits
        + You will need a horizontal feature graphic with no transparency
            + a feature graphic is a well-designed promotional pic of the app
    + Privacy Policy
        + Adding a privacy policy improves your chances of approval
        + Check out this convenient api to generate one:
          https://app-privacy-policy-generator.firebaseapp.com/
        + Host it on a google site
        + Add it to `Store listing`
+ 4. Upload apk
    + Navigate to `App releases` on the sidebar
    + Choose a track and click `Manage` or `Edit release`
        + Internal testing is convenient for first-time upload
    + Recommend: it is easier to manage your app signing rather than google
    + Upload apk and edit release notes
    + Hit `Review`
    + Add testers OR configure an opt-in url   
+ 5. Wait for review results
    + Takes 2 business days.

### Caveats

+ Updating apk on Playstore
    + Vanilla React Native
        + Every new apk must increment `versionCode` and `versionName` in `android/app/build.gradle` 
    + Expo + React Native
        + Every new apk must increment `versionCode` in `app.json` under the `android` field
        + Automatic Updates
            + Add the following field: `"updates":{"enabled": true}` to `app.json` to configure OTA updates
            + Every time you run `exp publish` standalone apps that have been deployed will download the build hosted by expo
            + Avoid uploading a new apk each update

## Appstore
+ Create an apple developer account ($99/year)
    + Rice-Apps developer account credentials can be found in the team drive OR
      ask the president
