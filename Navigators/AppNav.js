import {Dimensions} from 'react-native'
import {createStackNavigator, createDrawerNavigator} from 'react-navigation'

import Main, {MainHeader} from '../Screens/Main'
import PostDetail from '../Screens/PostDetail'

import Blank from '../Components/Blank'
import Sidebar from '../Components/Sidebar'

var {width: screenWidth} = Dimensions.get('window')
export default AppNav = createDrawerNavigator(
    {
        MainScreen: Main,
        SettingsScreen: Blank,
        InfoScreen: Blank,
        PostDetailScreen: PostDetail
    },
    {
        initialRouteName: 'MainScreen',
        contentComponent: Sidebar,
        drawerWidth: screenWidth * 0.2
    }
)
