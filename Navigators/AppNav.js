import {createStackNavigator, createDrawerNavigator} from 'react-navigation'

import Main from '../Screens/Main'
import Blank from '../Screens/Loading'

import Sidebar from '../Components/Sidebar'

export default MainNav = createDrawerNavigator(
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
