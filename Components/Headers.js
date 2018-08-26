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
    TouchableWithoutFeedback
} from 'react-native'

export class DrawerHeader extends Component{

    toggleMenu = () => {
        this.props.navigation.toggleDrawer()
        console.log('why does this work')
    }

    render = () => {
        let title = this.props.title

        return(
            <View style={{borderBottomWidth: 2, borderColor:"white"}}>
                <Header style={{backgroundColor: "powderblue"}}>
                    <Left>
                        <TouchableWithoutFeedback onPress = {() => this.toggleMenu()}>
                            <Icon 
                            name="menu"
                            type="MaterialCommunityIcons"
                            style = {{color: "white", fontSize: 25}}
                            />
                        </TouchableWithoutFeedback>
                    </Left>
                    <Body>
                        <Text style={{color:"white", fontSize: 25, fontWeight: "bold"}}>
                            {title}
                        </Text>
                    </Body>
                    <Right/>
                </Header>
            </View>

        )
    }
}

export class StackHeader extends Component{

    back = () => {
        this.props.navigation.goBack()
        console.log("going back")
    }

    render = () => {
        let title =  this.props.title

        return(
            <View style={{borderBottomWidth: 2, borderColor:"white"}}>
                <Header style={{backgroundColor: "powderblue"}}>
                    <Left>
                        <TouchableWithoutFeedback onPress = {() => this.back()}>
                            <Icon 
                            name="chevron-left"
                            type="MaterialCommunityIcons"
                            style = {{color: "white", fontSize: 40}}
                            />
                        </TouchableWithoutFeedback>
                    </Left>
                    <Body>
                        <Text style={{color:"white", fontSize: 25, fontWeight: "bold"}}>
                            {title}
                        </Text>
                    </Body>
                    <Right/>
                </Header>
            </View>

        )
    }
}