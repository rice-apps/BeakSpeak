import React from 'react'

import {Dimensions, Text} from 'react-native'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation'

import MainScreen from '../Screens/Main'
import PostDetailScreen from '../Screens/PostDetail'
import InfoScreen from '../Screens/Info'

import Blank from '../Components/Blank'
import Sidebar from '../Components/Sidebar'
import {DrawerHeader, StackHeader} from '../Components/Headers'
import { Drawer } from 'native-base';

var {width: screenWidth} = Dimensions.get('window')


MainNav = createStackNavigator(
    {
        Posts: {
            screen: MainScreen,
            navigationOptions: ({ navigation }) => (
                {
                    header: <DrawerHeader navigation = {navigation} title = 'Posts'/>
                }
            )
        }
    },
    {
        initialRouteName: 'Posts',
    }
)

InfoNav = createStackNavigator(
    {
        Posts: {
            screen: InfoScreen,
            navigationOptions: ({ navigation }) => (
                {
                    header: <DrawerHeader navigation = {navigation} title = 'Information'/>
                }
            )
        }
    },
    {
        initialRouteName: 'Posts',
    }
)

HomeNav = createDrawerNavigator(
    {
        Main: {
            screen: MainNav
        },    
        Settings: {
            screen: Blank
        },    
        Info: {
            screen: InfoNav,
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
            navigationOptions: ({ navigation }) => (
                {
                    header: <StackHeader navigation = {navigation} title = ''/>,
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