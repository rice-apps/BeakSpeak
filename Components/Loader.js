import React, { Component } from 'react';
import {
    StyleSheet, 
    View, 
    Modal, 
    ActivityIndicator
} from 'react-native';
import {observer} from 'mobx-react'

const Loader = observer(class Loader extends Component {
    render() {
        return (
            <Modal
                onRequestClose = {() => {this.hideModal}}
                transparent = {true}
                animationType={'none'}
                visible={this.props.loading}>
                <View style={styles.modalBackground}>
                    <View style={styles.activityIndicatorWrapper}>
                        <ActivityIndicator
                            animating={this.props.loading} />
                    </View>
                </View>
            </Modal>
        )
    }
})

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column', 
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default Loader;