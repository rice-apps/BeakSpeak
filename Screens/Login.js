import React, {Component} from 'react'
import {
    View,
    ActivityIndicator,
    StatusBar, 
    StyleSheet
} from 'react-native'
import Modal from 'react-native-modal'

import t from 'tcomb-form-native'

// form component
const Form = t.form.Form

// template for new post form
const LoginSchema = t.struct({
    username: t.String,
    password: t.maybe(t.String)
})

// TODO: implement modal that takes login credentials and uses authservice
export default class Login extends Component{

    render = () => {
        return(
            <View style={styles.container}>
                <Modal
                    isVisible = {isVisible}
                    animationIn={'slideInUp'}
                    animationOut={'zoomOut'}
                    animationInTiming={500}
                    animationOutTiming={500}
                >

                </Modal>
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