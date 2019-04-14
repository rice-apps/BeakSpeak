import React, { Component } from 'react';
import { Header, Left, Right, Body, Icon, View, Text } from 'native-base';
import { TouchableWithoutFeedback, Platform, StatusBar, Picker } from 'react-native';
import UserStore from '../Store/UserStore';
import { inject, observer } from 'mobx-react';

// header design for drawer navigators
export 
const DrawerHeader = inject('store')(
  inject('userStore')(observer(
class DrawerHeader extends Component {
  toggleMenu = () => {
    this.props.navigation.toggleDrawer();
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
          <Picker
            selectedValue = {UserStore.sortScheme}
            style = {{height: 50, width: 150}}
            onValueChange={(itemValue, itemIndex) =>
              UserStore.setSortScheme(itemValue)}
            mode = 'dropdown'
            >
            <Picker.Item label="Trending" value="hot" />
            <Picker.Item label="New" value="new" />
            <Picker.item label="Best" value="top" />
          </Picker>
          <Right />
        </Header>
      </View>
    );
  }
})))

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
