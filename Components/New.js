

/**
 * File for all things that involve handling new things (content, users)
 */
import React, {Component} from 'react';
import {Dimensions, StyleSheet, View, ScrollView, AsyncStorage} from 'react-native'
import Modal from 'react-native-modal'
import {Button, Text} from 'native-base'
import t from 'tcomb-form-native'
import {inject} from 'mobx-react'
import {SecureStore} from 'expo'
import UserPolicy from '../Components/UserPolicy'

// form component
const Form = t.form.Form

const Title = t.refinement(t.String, s => s.length < 150)
Title.getValidationErrorMessage = (value, path, context) => {
    return "must be less than 150 characters and not empty"
}

const Body = t.refinement(t.String, s => s.length < 1000)
Body.getValidationErrorMessage = (value, path, context) => {
    return "must be less than 1000 characters"
}
// template for new post form
const PostSchema = t.struct({
    title: Title,
    body: t.maybe(Body)
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
            // blurOnSubmit: true,
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
        title: {
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
export const NewPost = inject('store')(
    class NewPost extends Component {

        // validate submission, send submission, close parent modal
        submitPost = async () => {

            let results = this.form.validate()
            let errors = results.errors

            // check if submission is valid -- there must be a title!
            if (errors.length === 0) {
                let {title, body} = results.value
                this.props.store.addPost(title, body) // store new post in state

                this.form.setState({value: null}) // clear form

                this.props.closeView() // disable parent modal by changing its state
            }

        }

        render() {
            return (
                <View style={styles.content}>
                    {/* new post creation form */}
                    <Form
                        type={PostSchema}
                        options={PostOptions}
                        ref={c => this.form = c}
                    />
                    <View>
                        <Button
                            bordered
                            info
                            rounded
                            onPress={() => this.submitPost()}
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
)

export const NewUserModal = inject('userStore')(class NewUserModal extends Component {
    
    handleAccept = () => {
        let token = this.props.token
        SecureStore.setItemAsync('token', token);
        AsyncStorage.setItem("acceptedTerms", "true")
        this.props.userStore.setToken(token);    
        this.props.navigation.navigate("Main")
    }
    render() {
        return (
            <Modal
                isVisible={this.props.isVisible}
                animationIn={'slideInUp'}
    //                        animationOut={'zoomOut'}
    //                        animationInTiming={500}
    //                       animationOutTiming={500}
                avoidKeyboard={true}
                >

                    {/* new user agreement form*/}
                    <View style={styles.content}>
                        <ScrollView>
                            <UserPolicy/>
                        </ScrollView>
                        <View>
                            <Button
                                bordered
                                info
                                rounded
                                onPress={this.handleAccept}
                            >
                                <Text>
                                    I agree!
                                </Text>
                            </Button>
                        </View>
                    </View>
                    </Modal>
        )
    }
})


const styles = StyleSheet.create(
    {
        content: {
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "white",
        }
    }
)