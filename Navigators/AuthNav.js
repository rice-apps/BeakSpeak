import {createSwitchNavigator} from 'react-navigation';

import FrontScreen from '../Screens/Front'
import AppNav from './AppNav'
import LoginScreen from '../Screens/Login'

export default AuthNav = createSwitchNavigator(
    {
        Login: LoginScreen,
        Main: AppNav, 
        Front: FrontScreen
    },
    {
        initialRouteName: 'Front'
    }
)