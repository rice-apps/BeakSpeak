import React, { Component } from 'react';
import {StyleSheet, Text, View, Linking, Dimensions} from 'react-native'

const { width } = Dimensions.get('window');

export default class TestingLink extends Component {

  constructor(props) {
      super(props)
//      Linking.openURL(url).catch((err) => console.error('An error occurred',
//      err));
    this.url = "https://bit.ly/2WBFyqM" 

  }  
  render = () => {
    return (
            <View style = {{flex: 0.05}}>
                <View style={styles.offlineContainer}>
                    <Text style={styles.offlineText}>Give feedback here: </Text>
                    <Text 
                        style={styles.offlineText}
                        onPress = {() => Linking.openURL(this.url)}    
                        > 
                        {this.url}
                    </Text>
                </View>
            </View>
        );  
    };
}

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: 'darkblue',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        alignSelf: 'stretch',
        position: 'absolute',
        top: 0
    },
    offlineText: { color: '#fff' }
});

