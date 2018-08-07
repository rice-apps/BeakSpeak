import {createSwitchNavigator} from 'react-navigation';

import Front from '../Screens/Front'
import AppNav from './AppNav'
import Login from '../Screens/Login'

export default AuthNav = createSwitchNavigator(
    {
        LoginScreen: Login,
        MainScreen: AppNav, 
        FrontScreen: Front
    },
    {
        initialRouteName: 'FrontScreen'
    }
)