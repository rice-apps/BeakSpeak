import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native'
import {Button, Text} from 'native-base'
import t from 'tcomb-form-native'

import DatabaseService from '../Services/DatabaseService'

// form component
const Form = t.form.Form

// template for new post form
const PostSchema = t.struct({
    title: t.String,
    body: t.maybe(t.String)
})

// customizing new post form
const PostOptions = {
    fields:{
        body:{
            placeholder: "Your thoughts here...\n\n\n\n",
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
                        width: 250,
                    
                    }
                }
            }
        },
        title:{
            placeholder: "Your clever title here...",
        }
    }
}

// container component for new post form
export class NewPost extends Component{

    // validat submission, send submission, close parent modal
    submitPost = async() => {

        results = this.form.validate()
        errors = results.errors

        // check if submission is valid -- there must be a title!
        if(errors.length == 0){
            newPost = results.value
            DatabaseService.sendNewPost(newPost) // send post to database -- no need to await
            
            this.form.setState({value: null}) // clear form
            
            this.props.closeView() // disable parent modal by changing its state
        }

    }
    render(){
        return(
            <View style={styles.content}>

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
}
const styles = StyleSheet.create(
    {
        content:{
            alignItems: "center", 
            justifyContent: "center",
            backgroundColor: "white",
        }
    }
)