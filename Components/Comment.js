import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {Card, CardItem,Text} from 'native-base'

// body with comment content
export class CommentBody extends Component{
    render(){
        return(
             <CardItem>
                 <Text>
                     {this.props.body}
                 </Text>
             </CardItem>
        )
    }
}

// main component
export default class Comment extends Component{
    
    constructor(props){
        super(props)

        this.state={
            body:this.props.body
        }
    }

    render(){
        let body = this.state.body

        return(
            <Card style={styles.card}>
                <CommentBody body={body}/>
            </Card>
        )
    }
}

const styles = StyleSheet.create({
    card:{
        borderColor: "powderblue",
        borderWidth: 5,
        borderRadius: 15
    }
})