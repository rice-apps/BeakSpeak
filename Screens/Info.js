import React, {Component} from 'react'
import {StyleSheet, ScrollView, Image, Animated} from 'react-native'
import {
    Card,
    Container,
    Icon,
    View,
    Text
} from 'native-base'
// import styles, { IMAGE_HEIGHT, IMAGE_HEIGHT_SMALL} from 'styles';

const logo = require('../Assets/Images/logo.png')


// main component
export default class Info extends Component{

    render = () => {
        return(
            <Container style = {{backgroundColor: 'powderblue'}}>
                {/*<Animated.View style={[{ alignItems: 'center', paddingBottom: ScrollView.height() }]}>*/}
                {/*<Animated.Image source={logo} style={[styles.logo, { height: this.imageHeight }]} />*/}
                <View style={{flex: 0.25, alignItems: 'center'}}>
                        {/* our logo */}
                        <Image
                            source = {logo}
                            style = {styles.image}
                        />
                </View>
                {/*</Animated.View>*/}

                <ScrollView>

                    {/*<View style={{flex:1}}/>*/}

                {/*<View style = {{flex: 1}}>*/}
                    <Text style = {styles.titleFont}>User Policy</Text>
                    <View
                      style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 0.5, margin: 10
                      }}
                    />

                        <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = { styles.textColor }>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                                Racism, sexism, homophobia, transphobia, ableism, or any other -ism is strictly
                                not allowed. No exceptions.
                            </Text>
                            </View>

                        </View>

                    <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = { styles.textColor }>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                                Do NOT use names in any sort of negative light. You can't use our service to bully others.
                            </Text>
                            </View>
                    </View>

                    <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = { styles.textColor }>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                               Names used positively are entirely allowed. Shout-outs, compliments, etc.
                            </Text>
                            </View>
                    </View>

                    <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = { styles. textColor }>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                               You're welcome to complain about people on here, but keep their identity entirely private.
                            </Text>
                            </View>
                    </View>

                    <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = { styles.textColor }>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                               You're welcome to complain about people on here, but keep their identity entirely private.
                            </Text>
                            <Text style = { styles.boldText }>
                                     If it's obvious to ANYONE who you're talking about, your post will be removed.
                            </Text>
                            </View>
                    </View>

                    <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = { styles.textColor }>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                               Respect other users in all interactions.
                            </Text>
                            </View>
                    </View>

                    <View style = {{height: 20}}/>

                    <View>
                        <Text style = { styles.boldText }>
                           ** Failure to follow the above will result in a ban. **
                        </Text>
                        <Text style = { styles.boldText} >
                           We reserve the right to remove any post at any time.
                        </Text>
                    </View>

                    <View style = {{height: 20}}/>

                {/*<View style = {{flex: 1}}>*/}
                    <Text style = {styles.titleFont}>Acknowledgements</Text>
                    <View
                      style={{
                        borderBottomColor: 'white',
                        borderBottomWidth: 0.5, margin: 10
                      }}
                    />
                    {/*<Text style = {{color: 'white'}}>Credit to the devs</Text>*/}
                    <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = { styles.textColor }>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>Credit to devs</Text>
                            </View>
                    </View>
                {/*</View>*/}
                <View style = {{height: 30}}/>
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: 600,
        width: 600,
        resizeMode: 'contain'
    },
    titleFont: {
        //fontFamily: 'caviar-dreams',
        fontSize: 25,
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        padding: 10
    },
    textColor: {
        color: 'white'
    },
    boldText: {
        color: 'white',
        fontWeight : 'bold',
        textAlign: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1,
        //padding: 5,
        margin: 10
    },
    bullet: {
        width: 10
    },
    bulletText: {
        flex: 1,
    }
})