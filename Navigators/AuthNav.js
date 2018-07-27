import {createSwitchNavigator} from 'react-navigation';

import Front from '../Screens/Front'
import MainNav from './AppNav'
import Blank from '../Screens/Loading'

export default AuthNav = createSwitchNavigator(
    {
        LoginScreen: Blank,
        MainScreen: MainNav, 
        FrontScreen: Front
    },
    {
        initialRouteName: 'FrontScreen'
    }
)