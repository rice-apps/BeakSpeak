import React, {Component} from 'react'
import {
    View,
    StyleSheet,
    Dimensions
} from 'react-native'
import {Button, Text} from 'native-base'

import t from 'tcomb-form-native'

// form component
const Form = t.form.Form

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
        username: {
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
        },
        password: {
            secureTextEntry: true,
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

submitLogin = () => {
    console.log('logged in')
}

// TODO: implement modal that takes login credentials and uses authservice
export default class Login extends Component {

    render = () => {
        return (
            <View style={styles.content}>

                {/* login form */}
                <Form
                    type={LoginSchema}
                    options={LoginOptions}
                    ref={c => this.form = c}
                />
                <View style={{alignSelf: 'center'}}>
                    <Button
                        bordered
                        info
                        rounded
                        onPress={() => this.submitLogin()}
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