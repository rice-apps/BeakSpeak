import React, {Component} from 'react'
import {
    Header,
    Left,
    Title,
    Right,
    Body,
    Icon,
    View,
    Text
} from 'native-base'
import {
    TouchableWithoutFeedback,
    Platform,
    StatusBar
} from 'react-native'

// header design for drawer navigators
export class DrawerHeader extends Component{

    toggleMenu = () => {
        this.props.navigation.toggleDrawer()
    }

    render () {
        let title = this.props.title

        return(
            <View style = {{borderBottomWidth: 2, borderColor: 'powderblue', paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
                <Header style = {{backgroundColor: 'powderblue'}}>
                    <Left>

                        {/* Menu Button */}
                        <TouchableWithoutFeedback onPress = {() => this.toggleMenu()}>
                            <Icon 
                            name = 'menu'
                            type = 'MaterialCommunityIcons'
                            style = {{color: 'white', fontSize: 25}}
                            />
                        </TouchableWithoutFeedback>
                    </Left>

                    {/* Title of Page */}
                    <Body>
                        <Text style = {{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
                            {title}
                        </Text>
                    </Body>
                    <Right/>
                </Header>
            </View>
        )
    }
}

// header design for stack navigators
export class StackHeader extends Component{

    back = () => {
        this.props.navigation.goBack()
    }

    render () {
        let title =  this.props.title

        return(
            <View style = {{borderBottomWidth: 2, borderColor: 'powderblue', paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight}}>
                <Header style = {{backgroundColor: 'powderblue' }}>
                    <Left>

                        {/* Back Button */}
                        <TouchableWithoutFeedback onPress = {() => this.back()}>
                            <Icon 
                            name = 'chevron-left'
                            type = 'MaterialCommunityIcons'
                            style = {{color: 'white', fontSize: 40}}
                            />
                        </TouchableWithoutFeedback>
                    </Left>
                    
                    {/* Title of Page */}
                    <Body>
                        <Text style = {{color: 'white', fontSize: 25, fontWeight: 'bold'}}>
                            {title}
                        </Text>
                    </Body>
                    <Right/>
                </Header>
            </View>
        )
    }
}