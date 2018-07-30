import {createSwitchNavigator} from 'react-navigation';

import Front from '../Screens/Front'
import AppNav from './AppNav'
import Blank from '../Screens/Loading'

export default AuthNav = createSwitchNavigator(
    {
        LoginScreen: Blank,
        MainScreen: AppNav, 
        FrontScreen: Front
    },
    {
        initialRouteName: 'FrontScreen'
    }
)