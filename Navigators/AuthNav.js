import {createSwitchNavigator, createAppContainer} from 'react-navigation';

import FrontScreen from '../Screens/Front'
import AppNav from './AppNav'


export default AuthNav = createAppContainer(createSwitchNavigator(
    {
        Main: AppNav,
        Front: FrontScreen
    },
    {
        initialRouteName: 'Front'
    }
))