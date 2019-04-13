import React, { Component } from 'react';
import { Alert, View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import { Icon } from 'native-base';
import { SecureStore, WebBrowser } from "expo";
import { CONFIG } from "../config";

export default class Sidebar extends Component {
  navigate = route => {
    this.props.navigation.navigate(route);
  };

  logout = () => {
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
  }
  
  render() {
    return (
      // each icon represents a page accessible from the menu
      <View style={styles.container}>
          <TouchableOpacity
            onPress={() => this.navigate('Main')}
            style={{flexDirection: 'row', alignItems: 'center'}}
          >
            <Icon
              name="note-text"
              fontSize={30}
              type="MaterialCommunityIcons"
              style={{ color: 'white' }}
            />
            <Text style={{color: "white", fontSize: 25}}> Feed </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.navigate('Info')}
            style={{flexDirection: 'row', alignItems: 'center'}}
          >
            <Icon
              name="information"
              fontSize={30}
              type="MaterialCommunityIcons"
              style={{ color: 'white' }}
            />
            <Text style={{color: "white", fontSize: 25}}> Info </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flexDirection: 'row', alignItems: 'center'}}
            onPress={this.logout}
          >
            <Icon
              name="logout"
              fontSize={30}
              type="MaterialCommunityIcons"
              style={{ color: 'white' }}
            />
            <Text style={{color: "white", fontSize: 25}}> Logout </Text>
          </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
    backgroundColor: 'powderblue',
    padding: 5
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
