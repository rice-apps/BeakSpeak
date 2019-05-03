import React, { Component } from 'react';
import { Header, Left, Right, Body, Icon, View, Text } from 'native-base';
import { TouchableWithoutFeedback, Platform, StatusBar, Picke0r, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import DropdownMenu from 'react-native-dropdown-menu';

import Loader from '../Components/Loader.js'
import userStore from '../Store/UserStore.js'

// header design for drawer navigators
export const DrawerHeader = inject('store')(inject('userStore')(observer(
class DrawerHeader extends Component {

  constructor(props) {
    super(props)
    this.data = [["Hot", "New", "Top"]]

  }
  toggleMenu = () => {
    this.props.navigation.toggleDrawer();
  };

  handleSchemeChange = (scheme) => {
    this.props.userStore.setSortScheme(scheme)
    this.props.store.fetchPosts()
  }
  render() {
    let title = this.props.title;
    return (
      <View
        style={{
          borderColor: 'powderblue',
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        }}>
        <Loader
          loading = {userStore.isLoading} />
        <Header style={{ backgroundColor: 'powderblue', height: 70 }}>
          <Left>
            {/* Menu Button */}
            <TouchableWithoutFeedback onPress={() => this.toggleMenu()}>
              <Icon
                name="menu"
                type="MaterialCommunityIcons"
                style={{ color: 'white', fontSize: 25 }}
              />
            </TouchableWithoutFeedback>
          </Left>

          {/* Title of Page */}
          <Body>
            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{title}</Text>
          </Body>

          {/* Sorting Dropdown*/}
          <DropdownMenu
            bgColor={'powderblue'}
            activityTintColor={'green'}
            tintColor={'darkblue'}
            handler={(selection, row) => this.handleSchemeChange(this.data[selection][row])}
            data={this.data}
          />
          
        </Header>
      </View>
    );
  }
})))


/*
              <View>
                  <Text></Text>
                  <Picker
                    selectedValue = {this.props.userStore.sortScheme}
                    onValueChange={(itemValue, itemIndex) =>
                      {
                        this.props.userStore.setSortScheme(itemValue);
                        this.props.userStore.set
                        this.props.store.fetchPosts();

                      }}
                    mode = 'dropdown'
                    >
                      <Picker.Item label="Trending" value="hot" />
                      <Picker.Item label="New" value="new" />
                      <Picker.Item label="Best" value="top" />
                  </Picker>

              </View>

*/
// header design for stack navigators
export class StackHeader extends Component {
  back = () => {
    this.props.navigation.goBack();
  };

  render() {
    let title = this.props.title;

    return (
      <View
        style={{
          borderBottomWidth: 2,
          borderColor: 'powderblue',
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        }}>
        <Header style={{ backgroundColor: 'powderblue' }}>
          <Left>
            {/* Back Button */}
            <TouchableWithoutFeedback onPress={() => this.back()}>
              <Icon
                name="chevron-left"
                type="MaterialCommunityIcons"
                style={{ color: 'white', fontSize: 40 }}
              />
            </TouchableWithoutFeedback>
          </Left>

          {/* Title of Page */}
          <Body>
            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{title}</Text>
          </Body>
          <Right />
        </Header>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  reportButton: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'flex-start',
    borderTopWidth: 1,
    borderColor: 'white',
    margin: 15,
  },
  button: {
    backgroundColor: 'powderblue',
    height: 35,
    width: 70,
    borderWidth: 0.5,
    borderRadius: 15,
    justifyContent: 'center',
  },
  buttonPress: {
    backgroundColor: 'powderblue',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    borderColor: 'powderblue',
    borderWidth: 5,
    borderRadius: 15,
  },
  titlefont: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  seeBorders: {
    borderWidth: 1,
    borderColor: 'red',
  },
});
