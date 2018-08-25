import {Dimensions} from 'react-native'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation'

import MainScreen, {MainHeader} from '../Screens/Main'
import PostDetailScreen from '../Screens/PostDetail'

import Blank from '../Components/Blank'
import Sidebar from '../Components/Sidebar'

var {width: screenWidth} = Dimensions.get('window')
export default AppNav = createDrawerNavigator(
    {
        Main: MainScreen,
        SettingsScreen: Blank,
        InfoScreen: Blank,
    },
    {
        initialRouteName: 'Main',
        contentComponent: Sidebar,
        drawerWidth: screenWidth * 0.2
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