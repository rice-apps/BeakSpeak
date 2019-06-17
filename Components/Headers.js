import React, { Component } from 'react';
import { Header, Left, Right, Body, Icon, View, Text } from 'native-base';
import { TouchableWithoutFeedback, TouchableOpacity, Platform, StatusBar, StyleSheet } from 'react-native';
import { inject, observer } from 'mobx-react';
import ModalDropdown from 'react-native-modal-dropdown';

const SortMenu = inject('store')(inject('userStore')(observer(
class SortMenu extends Component {

  constructor(props) {
    super(props)
    this.data = ["Hot", "New", "Top"]
  }

  handleSchemeChange = (idx) => {
    this.props.userStore.setSortScheme(this.data[idx])
    this.props.store.fetchPosts()
  }

  render() {
    return(
      <ModalDropdown
        options = {this.data}
        onSelect = {this.handleSchemeChange}
        defaultIndex = {0}
        defaultValue = {"Hot"}
        renderSeparator={() => <View /> }
        style = {{
          padding: 20
        }} 
        dropdownStyle = {{
          height: 35 * this.data.length
        }}
        showsVerticalScrollIndicator = {false}
      />
    )
  }
})))
// header design for drawer navigators
export const DrawerHeader = inject('store')(inject('userStore')(observer(
class DrawerHeader extends Component {
  
  toggleMenu = () => {
    this.props.navigation.toggleDrawer();
  };

  render() {
    let title = this.props.title;
    return (
      <View
        style={{
          borderColor: 'lightskyblue',
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        }}>
        <Header style={{ backgroundColor: 'lightskyblue', height: 70 }}>
          <Left>
            {/* Menu Button */}
            <TouchableOpacity 
              hitSlop={{top: 20, left: 20, bottom: 20, right: 60}}
              onPress={() => this.toggleMenu()}
            >
              <Icon
                name="menu"
                type="MaterialCommunityIcons"
                style={{ color: 'white', fontSize: 25 }}
              />
            </TouchableOpacity>
          </Left>

          {/* Title of Page */}
          <Body>
            <Text style={{ color: 'white', fontSize: 25, fontWeight: 'bold' }}>{title}</Text>
          </Body>

          <Right>
              {/* Sorting Dropdown -- only displayed on main screen*/}
              {this.props.isMain && <SortMenu/>}
          </Right>
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
          borderColor: 'lightskyblue',
          paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
        }}>
        <Header style={{ backgroundColor: 'lightskyblue' }}>
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
    backgroundColor: 'lightskyblue',
    height: 35,
    width: 70,
    borderWidth: 0.5,
    borderRadius: 15,
    justifyContent: 'center',
  },
  buttonPress: {
    backgroundColor: 'lightskyblue',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  card: {
    borderColor: 'lightskyblue',
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
