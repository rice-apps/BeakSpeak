import React, {Component, PureComponent} from 'react'
import {Card, CardItem, Text, Title} from 'native-base'
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

    upvoteScore = () => {
        this.props.upvoteScore()
    }

    downvoteScore = () => {
        this.props.downvoteScore()
    }

    render = () => {
        let title = this.props.title
        let body = this.props.body
        this.upvoteScore()
        return(
            <Card style={styles.card}>
                {/* post component decomposed into children components*/}
                <PostHeader title = {title}/>
                <PostBody body = {body}/>
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