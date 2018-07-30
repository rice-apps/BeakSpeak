import {createStackNavigator, createDrawerNavigator} from 'react-navigation'

import Main from '../Screens/Main'

import Blank from '../Components/Blank'
import Sidebar from '../Components/Sidebar'

export default AppNav = createDrawerNavigator(
    {
        MainScreen: Main,
        SettingsScreen: Blank,
        InfoScreen: Blank,
    },
    {
        initialRouteName: 'MainScreen',
        contentComponent: Sidebar,
        drawerWidth: 50
    }
)
