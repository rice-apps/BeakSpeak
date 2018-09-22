import React, {Component, PureComponent} from 'react'
import {View} from 'react-native';
import {Card, CardItem, Text, Title, Icon} from 'native-base'
import {StyleSheet} from 'react-native'


// body with post content and potentially votes
class PostBody extends Component{

    render = () => {
        return(
            <CardItem>
                    <Text>
                        {this.props.body}
                    </Text>
            </CardItem>
        )
    }
}

class PostVotes extends Component {
    render = () => {
        return(
            <View style={styles.container}>
                    <View style={{flex: 1, flexDirection: 'column'}}>
                        <Icon
                            name = 'ios-arrow-up'
                            fontSize = {30}
                            type = 'Ionicons'
                            style = {{color: 'black'}}
                            onPress = {() => this.navigate('Main')}
                        />
                        <Text>
                            {"1"}
                        </Text>
                        <Icon
                            name = 'ios-arrow-down'
                            fontSize = {30}
                            type = 'Ionicons'
                            style = {{color: 'black'}}
                            onPress = {() => this.navigate('Main')}
                        />
                    </View>
            </View>

        )
    }
}
// header with title and potentially avatar and time info
class PostHeader extends Component{

    render = () => {
        return(
            <CardItem>
                    <Title style ={{color: 'black'}}>
                        {this.props.title}
                    </Title>
            </CardItem>
        )
    }
}

// main component -- pure component for rendering optimization (view only)
export default class Post extends PureComponent{

    constructor(props){
        super(props)
    }

    render = () => {
        let title = this.props.title
        let body = this.props.body
    
        return(

                <Card style={styles.card}>
                    <View style={{flex: 1, flexDirection: 'row'}}>

                        {/* post component decomposed into children components*/}
                        <View style={{flex: 1, flexDirection: 'column'}}>
                            <PostHeader title = {title}/>
                            <PostBody body = {body}/>
                        </View>
                        <PostVotes votes = {1}/>
                    </View>
                </Card>

        )
    }
}

const styles = StyleSheet.create(
    {
        titlefont:{
            fontWeight: 'bold',
        },
        card:{
            borderColor: 'powderblue',
            borderWidth: 5,
            borderRadius: 15
        }
    }
)