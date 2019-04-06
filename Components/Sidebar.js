import React, { Component } from 'react';
import { Alert, View, StyleSheet } from 'react-native';
import { Icon } from 'native-base';
import { SecureStore, WebBrowser } from "expo";
import { CONFIG } from "../config";

export default class Sidebar extends Component {
  navigate = route => {
    this.props.navigation.navigate(route);
  };

  render() {
    return (
      // each icon represents a page accessible from the menu
      <View style={styles.container}>
        <Icon
          name="note-text"
          fontSize={30}
          type="MaterialCommunityIcons"
          style={{ color: 'white' }}
          onPress={() => this.navigate('Main')}
        />
        <Icon
          name="information"
          fontSize={30}
          type="MaterialCommunityIcons"
          style={{ color: 'white' }}
          onPress={() => this.navigate('Info')}
        />
        <Icon
          name="logout"
          fontSize={30}
          type="MaterialCommunityIcons"
          style={{ color: 'white' }}
          onPress={() => {
            Alert.alert('Log Out', 'Are you sure you want to log out?', [
              {
                text: 'Yes',
                onPress: () => {
                  SecureStore.deleteItemAsync('token');
                  let returnUrl = Expo.Linking.makeUrl();
                  WebBrowser.openAuthSessionAsync
                  (CONFIG.cas_logout_url, returnUrl).then(result =>                   this.navigate('Front')
                  )
                }
              },
              {
                text: 'Cancel',
                style: 'cancel',
              },
            ]);
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'powderblue',
  },
  seeBorders: {
    borderWidth: 1,
    borderColor: 'red',
  },
});

//  not needed settings yet
/*<Icon
  name="settings"
  fontSize={30}
  type="MaterialCommunityIcons"
  style={{ color: 'white' }}
  onPress={() => this.navigate('Settings')}
/>
*/
