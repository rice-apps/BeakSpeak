import React from 'react';

import { Dimensions } from 'react-native';
import { createStackNavigator, createDrawerNavigator } from 'react-navigation';

import MainScreen from '../Screens/Main';
import PostDetailScreen from '../Screens/PostDetail';

import Blank from '../Components/Blank';
import Sidebar from '../Components/Sidebar';
import InfoScreen from '../Screens/Info.js';
import { DrawerHeader, StackHeader } from '../Components/Headers';

let { width: screenWidth } = Dimensions.get('window');

const MainNav = createStackNavigator(
  {
    Posts: {
      screen: MainScreen,
      navigationOptions: ({ navigation }) => ({
        header: <DrawerHeader isMain={true} navigation={navigation} title="Posts" />,
      }),
    },
  },
  {
    initialRouteName: 'Posts',
  }
);

const InfoNav = createStackNavigator(
    {
        Info: {
            screen: InfoScreen,
            navigationOptions: ({ navigation }) => ({
                header: <DrawerHeader isMain={false} navigation={navigation} title="Info" />,
            }),
        },
    },
    {
        initialRouteName: 'Info',
    }
);

const HomeNav = createDrawerNavigator(
  {
    Main: {
      screen: MainNav,
    },
    Settings: {
      screen: Blank,
    },
    Info: {
      screen: InfoNav,
    },
  },
  {
    initialRouteName: 'Main',
    contentComponent: Sidebar,
    drawerWidth: screenWidth * 0.4,
  }
);

let AppNav;
export default (AppNav = createStackNavigator(
  {
    PostDetail: {
      screen: PostDetailScreen,
      navigationOptions: ({ navigation }) => ({
        header: <StackHeader navigation={navigation} title="" />,
      }),
    },
    Home: {
      screen: HomeNav,
      navigationOptions: () => ({
        header: null,
      }),
    },
  },
  {
    initialRouteName: 'Home',
  }
));
