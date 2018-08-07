import React, {Component, PureComponent} from 'react'
import {Card, CardItem, Text, Title} from 'native-base'
import {StyleSheet} from 'react-native'

// body with post content and potentially votes
class PostBody extends Component{

    // instance of lifting up state -- incoming changes are handled at the ancestral state
    onBodyChange = (newBody) =>{
        this.props.onChange(newBody)
    }

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

    // instance of lifting up state -- incoming changes are handled at the ancestral state
    onTitleChange = (newTitle) =>{
        this.props.onChange(newTitle)
    }

    render = () => {
        return(
            <CardItem>
                    <Title style={{color:"black"}}>
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

        this.state = {
            title: this.props.title,
            body: this.props.body,
            avatarUrl: "",
         }
    }

    onBodyChange = (newBody) => {
        this.setState({body: newBody})
    }

    onTitleChange = (newTitle) => {
        this.setState({title: newTitle})
    }

    render = () => {

        let title = this.state.title
        let body = this.state.body
    
        return(
            <Card style={styles.card}>
            
                {/* post component decomposed into children components*/}
                <PostHeader 
                 title = {title} 
                 onChange = {this.onTitleChange}
                />
                <PostBody 
                 body = {body} 
                 onChange = {this.onBodyChange}
                />
            </Card>
        )
    }
}

const styles = StyleSheet.create(
    {
        titlefont:{
            fontWeight:"bold",
        },
        card:{
            borderColor: "powderblue",
            borderWidth: 5,
            borderRadius: 15
        }
    }
)