import React, {Component} from 'react';
import {
    View, 
    StyleSheet, 
    Dimensions
} from 'react-native'
import {Button, Text} from 'native-base'
import t from 'tcomb-form-native'
import {inject, observer} from 'mobx-react'
import PostStore from "../Store/PostStore"
import DatabaseService from '../Services/DatabaseService'

// form component
const Form = t.form.Form

// template for new post form
const ReportSchema = t.struct({
    TypeOfViolation: t.String,
    TellUsMore: t.maybe(t.String)
})

// get screen width
let {width: screenWidth} = Dimensions.get('window')

// customizing new post form
const ReportOptions = {
    fields: {
        TellUsMore: {
            placeholder: "What's wrong with this post?",
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
        TypeOfViolation:{
            placeholder: "(e.g. hate speech, verbal abuse, etc.)",
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
class NewReport extends Component{

    // validate submission, send submission, close parent modal
    submitReport = async() => {
        let results = this.form.validate()
        let id = this.props.id
        let errors = results.errors
        // check if submission is valid -- there must be a TypeOfViolation!
        if(errors.length === 0){
            let {TypeOfViolation, TellUsMore} = results.value
            received = await DatabaseService.sendReport(TypeOfViolation, TellUsMore, id) // send report to backend, wait for response
            if (received) {
                this.form.setState({value: null}) // clear form
                this.props.closeView() // disable parent modal by changing its state
            }
        }

    }
    
    render() {
        return(
            <View style = {styles.content}>
                {/* new report form */}
                <Form 
                 type = {ReportSchema}
                 options = {ReportOptions}
                 ref={c => this.form = c}
                />
                <View>
                    <Button 
                     bordered 
                     info 
                     rounded 
                     onPress = {()=> this.submitReport()}
                    >
                        <Text> 
                            Report this post! 
                        </Text>
                    </Button>
                </View>
            </View>
        )
    }
}
export {NewReport}
const styles = StyleSheet.create(
    {
        content: {
            alignItems: "center", 
            justifyContent: "center",
            backgroundColor: "white",
        }
    }
)