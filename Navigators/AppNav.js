import React from 'react'

import {Dimensions, Text} from 'react-native'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation'

import MainScreen from '../Screens/Main'
import PostDetailScreen from '../Screens/PostDetail'

import Blank from '../Components/Blank'
import Sidebar from '../Components/Sidebar'
import InfoScreen from '../Screens/Info.js'
import {DrawerHeader, StackHeader} from '../Components/Headers'

var {width: screenWidth} = Dimensions.get('window')

const MainNav = createStackNavigator(
    {
        Posts: {
            screen: MainScreen,
            navigationOptions: ({navigation}) => (
                {
                    header: <DrawerHeader navigation={navigation} title='Posts'/>
                }
            )
        }
    },
    {
        initialRouteName: 'Posts',
    }
)

const HomeNav = createDrawerNavigator(
    {
        Main: {
            screen: MainNav
        },
        Settings: {
            screen: Blank
        },
        Info: {
            screen: InfoScreen,
        }
    },
    {
        initialRouteName: 'Main',
        contentComponent: Sidebar,
        drawerWidth: screenWidth * 0.2
    }
)

export default AppNav = createStackNavigator(
    {
        PostDetail: {
            screen: PostDetailScreen,
            navigationOptions: ({navigation}) => (
                {
                    header: <StackHeader navigation={navigation} title=''/>,
                }
            )
        },
        Home: {
            screen: HomeNav,
            navigationOptions: ({navigation}) => (
                {
                    header: null
                }
            )
        }
    },
    {
        initialRouteName: 'Home',
    }
)