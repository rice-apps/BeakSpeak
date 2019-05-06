# Deployment to Playstore (Android) and Appstore (iOS)

## Playstore
1. Create a Google Play Developer account ($25 one time fee)
    + Use Rice-Apps team gmail
2. Build an apk file of your project
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
3. On the Google Play Developer console, navigate to `All applications` and hit
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
        + Host it on a google site or rice-apps github.io
        + Add it to `Store listing`
4. Upload apk
    + Navigate to `App releases` on the sidebar
    + Choose a track and click `Manage` or `Edit release`
        + Internal testing is convenient for first-time upload
    + Recommend: it is easier to manage your app signing rather than google
    + Upload apk and edit release notes
    + Hit `Review`
    + Add testers OR configure an opt-in url   
5. Wait for review results
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
1. Create an apple developer account ($99/year)
    + Rice-Apps developer account credentials can be found in the team drive OR
      ask the president
2. Build an ipa file of your project
    + Expo + React Native
        + Run `exp build:ios` in project directory
        + Provide apple developer credentials
        + First time let expo handle the certificates stuff
        + Then fetch those certificates and store in a p12 file
            + Requires a mac
            + Read this guide: https://calvium.com/how-to-make-a-p12-file/
            + For future production builds, upload this information to expo.
              Expo will store certificate information by default on its servers
              *but just in case make sure to upload keystore information when
              asked* 
    + Vanilla React Native (PLEASE CONTRIBUTE)
3. *Requires Mac* On Xcode, upload your ipa
     + hit the `Xcode` tab => `Open Developer Tool` =>
     `Application Loader`
     + Click `Choose` and select your ipa
     + Wait while it verifies the build
4. View build on App Store Connect
    + Log onto appstoreconnect.apple.com
    + Navigate to `My Apps` and click on your app
5. Wait for app to finish processing (1-2 business days)
6. Submit app for review
    + Testflight
        + Select build under `iOS` tab
        + Fill out information in the `Test Information` tab
        + When app passes Testflight review, you can add testers
            + Create an external tester group by clicking on `Add External
              Testers`
            + Click on your group
            + Under the `Testers` tab, enable a Public Link and edit tester
              count limit to be >10,000.
            + Under the `Builds` tab, select approved build
    + AppStore
        + Fill out `App Information Section`
            + Make sure you have url of the privacy policy
        + Leave `Pricing and Availability` as is
            + unless the app is not free or access is restricted by territory
        + Fill out the section under `iOS App`
            + Required images
                + 3 screenshots from 6.5" display
                    + iPhone XS Max or iPhone XR
                    + 1242 x 2688 px
                + 3 screenshots from 5.5" OR 4.7" OR 4" display
                    + iPhone 6s Plus, iPhone 7 Plus, iPhone 8 Plus, iPhone 6,
                      iPhone SE
                    + 5.5" = 1242 x 2208 px
                    + 4.7" = 750 x 1334 px
                    + 4" = 640 x 1096 px
            + Make sure you have a public url to the FAQ's
            + Select approved build
        + Submit for review
            + Carefully fill out the last portion -- otherwise you will have to
              submit a new build!



## Updates and Maintenance
### Secrets and Salts
To ensure security, confidential information such as netids are hashed and
*salted* before they are stored in the database. Tokens that are returned by CAS
contain netids, and they are decrypted by *secrets*. Secrets and salts must
therefore be handled carefully.

+ Secrets and salts must not be committed to github
    + An easy way to prevent accidentally committing your config is to perform
      the following command before saving any changes to the config:
      ```git update-index --assume-unchanged config.js```
+ Secrets and salts should be changed on a yearly basis
    + Secrets and salts only need to be cryptographically secure random strings
    + These changes occur on the deployed backend on GCP
    + Log into a cloud shell and manually edit the production settings in the
      config

### Updating apps
+ Expo + React Native
    + If OTA updates are enabled, then solely running `expo publish` in the
      terminal will update apps on android and ios
      + Caveat: changing certain assets like splash screen and app icon require
        a new build
    + If OTA is not configured, submit a new build each time for update
+ Vanilla React Native (PLEASE CONTRIBUTE)

### Updating backend on GCP
+ Log into cloud shell
+ `cd` into appropriate repo
+ Pull changes
+ Run `gcloud app deploy`
