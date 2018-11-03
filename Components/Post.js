import React, {Component, PureComponent} from 'react'
import {Card, CardItem, View, Title, Button, Text} from 'native-base'
import {StyleSheet} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';

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

class PostFooter extends Component{

    pressReact = (react) => {
        this.props.updateReact(react)
    }

    render = () => {
        let userReact = this.props.userReact
        let reactCounts = this.props.reactCounts

        return(
            <View style={styles.container}>
                <Button onPress={() => this.pressReact("angry")} style={userReact == "angry" ? styles.buttonPress : {}} transparent rounded>
                    <Text adjustsFontSizeToFit={true} style = {{color:(userReact == "angry") ? "white" : "black"}}>
                        😡{reactCounts["angry"].toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("funny")} style={userReact == "funny" ? styles.buttonPress : {}} transparent rounded>
                    <Text adjustsFontSizeToFit={true} style = {{color:(userReact == "funny") ? "white" : "black"}}>
                        😂{reactCounts["funny"].toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("love")} style={userReact == "love" ? styles.buttonPress : {}} transparent rounded>
                    <Text adjustsFontSizeToFit={true} style = {{color:(userReact == "love") ? "white" : "black"}}>
                        😍{reactCounts["love"].toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("sad")} style={userReact == "sad" ? styles.buttonPress : {}} transparent rounded>
                    <Text adjustsFontSizeToFit={true} style = {{color:(userReact == "sad") ? "white" : "black"}}>
                        😭{reactCounts["sad"].toString()}</Text>
                </Button>
                <Button onPress={() => this.pressReact("wow")} style={userReact == "wow" ? styles.buttonPress : {}} transparent rounded>
                    <Text adjustsFontSizeToFit={true} style = {{color:(userReact == "wow") ? "white" : "black"}}>
                        😮{reactCounts["wow"].toString()}</Text>
                </Button>
            </View>
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
        let userReact = this.props.userReact
        let reactCounts = this.props.reactCounts
        let updateReact = this.props.updateReact
    
        return(
            <Card style={styles.card}>
            
                {/* post component decomposed into children components*/}
                <PostHeader title = {title}/>
                <PostBody body = {body}/>
                <PostFooter
                    userReact = {userReact}
                    reactCounts = {reactCounts}
                    updateReact = {updateReact}
                />
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        backgroundColor: "powderblue",
        height: 35,
        width: 70,
        borderWidth: 0.5,
        borderRadius: 15,
        justifyContent: 'center'
    },

    buttonPress: {
        backgroundColor: "powderblue",
        justifyContent: 'center',
        flexWrap: 'wrap'
    },
    card: {
        borderColor: "powderblue",
        borderWidth: 5,
        borderRadius: 15
    },
    titlefont:{
        fontWeight: 'bold',
    }
})