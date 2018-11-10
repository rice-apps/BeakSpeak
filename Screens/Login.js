import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions,
} from 'react-native'
import {Button, Text} from 'native-base'

import t from 'tcomb-form-native'
import AuthService from '../Services/AuthService';

// form component
const Form = t.form.Form;

// template for new post form
const LoginSchema = t.struct({
    username: t.String,
    password: t.String
})

// get screen width
let {width: screenWidth} = Dimensions.get('window')

// customizing login form
const LoginOptions = {
    fields: {
        password: {
            secureTextEntry: true,
            placeholder: 'Your netid password',
            blurOnSubmit: true,
            stylesheet: {
                ...Form.stylesheet,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: null,
                        width: screenWidth * 0.8,
                        textAlignVertical: 'top',
                    },
                    error: {
                        ...Form.stylesheet.textbox.error,
                        height: null,
                        width: screenWidth * 0.8,
                        textAlignVertical: 'top',
                    }
                }
            }
        },
        username:{
            placeholder: 'Your netid',
            stylesheet: {
                ...Form.stylesheet,
                textbox: {
                    ...Form.stylesheet.textbox,
                    normal: {
                        ...Form.stylesheet.textbox.normal,
                        height: null,
                        width: screenWidth * 0.8,
                    }
                }
            }
        }
    }
}

// TODO: implement modal that takes login credentials and uses authservice
export default class Login extends Component{
    // submitLogin = () => {
    //     results = this.form.validate()
    //     errors = results.errors
    //
    //     // check if login is valid -- there must be a title!
    //     if(errors.length === 0) {
    //         creds = results.value
    //         console.log(creds)
    //         AuthService.login()
    //         this.form.setState({value: null}) // clear form
    //
    //         //this.props.closeView() // disable parent modal by changing its state
    //     }
    // }




    render = () => {
        return(
            <View style = {styles.content}>

                {/* login form */}
                <Form 
                type = {LoginSchema}
                options = {LoginOptions}
                ref={c => this.form = c}
                />
                <View style={{alignSelf: 'center'}}>
                    <Button 
                    bordered 
                    info 
                    rounded 
                    onPress = {()=> this.submitLogin()}
                    >
                        <Text> 
                            Login! 
                        </Text>
                    </Button>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'powderblue'
    }
})