import React, {Component} from 'react';
import {
    View, 
    Header,
    Title,
    Body
} from 'native-base'

import Blank from '../Components/Blank'

export default class PostDetailScreen extends Component{
    // hide from menu!
    static navigationOptions = {
        drawerLabel: () => null
      };

      render = () => {
          return(
              <Blank/>
          )
      }
}