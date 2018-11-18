import React, {Component} from 'react';
import {
    View, 
    StyleSheet, 
    Dimensions
} from 'react-native'
import {Button, Text} from 'native-base'
import t from 'tcomb-form-native'
import {inject, observer} from 'mobx-react'

import DatabaseService from '../Services/DatabaseService'
import postStore from '../Store/PostStore';

// form component
const Form = t.form.Form

// template for new post form
const PostSchema = t.struct({
    title: t.String,
    body: t.maybe(t.String)
})

// get screen width
let {width: screenWidth} = Dimensions.get('window')

// customizing new post form
const PostOptions = {
    fields: {
        body: {
            placeholder: 'Your thoughts here...',
            multiline: true,
            numberOfLines: 5,
            blurOnSubmit: true,
            stylesheet: {
                ...Form.stylesheet,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: 150,
                        width: screenWidth * 0.8,
                        textAlignVertical: 'top'
                    }
                }
            }
        },
        title:{
            placeholder: 'Your clever title here...',
            stylesheet: {
                ...Form.stylesheet,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: null,
                        width: screenWidth * 0.8
                    }
                }
            }
        }
    }
}

// container component for new post form
export const NewPost = inject('store')(observer(class NewPost extends Component{

    // validate submission, send submission, close parent modal
    submitPost = async() => {

        let results = this.form.validate()
        let errors = results.errors

        // check if submission is valid -- there must be a title!
        if(errors.length === 0){
            let newPost = results.value
            DatabaseService.sendNewPost(newPost) // send post to database -- no need to await
            this.props.store.addPost(newPost) // store new post in state
            console.log('add new post')
            
            this.form.setState({value: null}) // clear form
            
            this.props.closeView() // disable parent modal by changing its state
        }

    }
    
    render = () => {
        return(
            <View style = {styles.content}>
                {/* new post creation form */}
                <Form 
                 type = {PostSchema}
                 options = {PostOptions}
                 ref={c => this.form = c}
                />
                <View>
                    <Button 
                     bordered 
                     info 
                     rounded 
                     onPress = {()=> this.submitPost()}
                    >
                        <Text> 
                            Create New Post! 
                        </Text>
                    </Button>
                </View>
            </View>
        )
    }
}))


const styles = StyleSheet.create(
    {
        content: {
            alignItems: "center", 
            justifyContent: "center",
            backgroundColor: "white",
        }
    }
)