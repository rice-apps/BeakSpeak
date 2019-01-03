import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import FrontScreen from '../Screens/Front'
import AppNav from './AppNav'
import LoginScreen from '../Screens/Login'


export default AuthNav = createAppContainer(createSwitchNavigator(
    {
        Login: LoginScreen,
        Main: AppNav, 
        Front: FrontScreen
    },
    {
        initialRouteName: 'Front'
    }
))