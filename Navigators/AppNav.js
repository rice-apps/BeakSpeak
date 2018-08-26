import {Dimensions} from 'react-native'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation'

import MainScreen from '../Screens/Main'
import PostDetailScreen from '../Screens/PostDetail'

import Blank from '../Components/Blank'
import Sidebar from '../Components/Sidebar'

var {width: screenWidth} = Dimensions.get('window')
export default AppNav = createDrawerNavigator(
    {
        Main: MainNav,
        SettingsScreen: Blank,
        InfoScreen: Blank,
    },
    {
        initialRouteName: 'Main',
        contentComponent: Sidebar,
        drawerWidth: screenWidth * 0.2,
        header: 
    }
)

MainNav = createStackNavigator(
    {
        Posts: MainScreen,
        PostDetail: PostDetailScreen
    },
    {
        initialRouteName: 'Posts'
    }
)
