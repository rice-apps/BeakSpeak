import React, { PureComponent, Component } from 'react';
import { View, Text, NetInfo, Dimensions, StyleSheet } from 'react-native';
import {observer, inject} from 'mobx-react'

const { width } = Dimensions.get('window');

function MiniOfflineSign() {
    return (
        <View style={styles.offlineContainer}>
            <Text style={styles.offlineText}>No Internet Connection</Text>
        </View>
    );
}

const OfflineNotice = inject('store')(
    inject('userStore')(observer(
        class OfflineNotice extends Component {
            isConnected = this.props.userStore.isConnected;

            componentDidMount() {
                NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
            }

            componentWillUnmount() {
                NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
            }

            handleConnectivityChange = isConnected => {
                this.props.userStore.setConnected(isConnected);
            };

            render() {
                if (!this.props.userStore.isConnected) {
                    return (
                        <View style = {{flex: 0.05}}>
                            <MiniOfflineSign />
                        </View>
                    );
                }
                return null;
            }
        })))

const styles = StyleSheet.create({
    offlineContainer: {
        backgroundColor: '#b52424',
        height: 25,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        width,
        position: 'absolute',
        top: 0
    },
    offlineText: { color: '#fff' }
});

export default OfflineNotice;
