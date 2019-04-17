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
                <View style = {{height: 25}}></View>
                <ScrollView>
                    <Text style = {styles.titleFont}>User Policy</Text>
                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 0.5, margin: 10
                        }}
                    />
                    <Text style = { {color: 'white', margin: 10} }>
                        Users of BeakSpeak must not exhibit any of these unacceptable behaviors.
                    </Text>
                    <View style={ styles.row }>
                        <View style={ styles.bullet }>
                            <Text style = { styles.textColor }>{'\u2022' + " "}</Text>
                        </View>

                        <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                                Threatening - BeakSpeak has a zero tolerance policy for threatening other users. You may not use BeakSpeak to transmit or communicate any materials of a threatening or harmful nature, including threats of death or physical harm, or materials that are harassing, libelous, defamatory, or which facilitate extortion.
                            </Text>
                        </View>
                    </View>

                    <View style={ styles.row }>
                        <View style={ styles.bullet }>
                            <Text style = { styles.textColor }>{'\u2022' + " "}</Text>
                        </View>

                        <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                                Offensive Language -  Posting offensive text or pictures is not allowed. You are not to post anything deemed illegal or contains illegal content or information. You agree to be solely responsible for knowing what is legal and as it pertains to Rice’s policies. It is illegal to access, distribute or facilitate the distribution of obscene, pornographic indecent, hateful or otherwise offensive materials.
                            </Text>
                        </View>
                    </View>

                    <View style={ styles.row }>
                        <View style={ styles.bullet }>
                            <Text style = { styles.textColor }>{'\u2022' + " "}</Text>
                        </View>

                        <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                                Personally identifiable information - creators of posts are not to share others’ personally identifiable information in their post WITHOUT CONSENT. This includes names, phone numbers, etc. You are free to expose your identity on the platform, and you do so at your own risk. This is done to prevent abuse on the platform.
                            </Text>
                        </View>
                    </View>

                    <View style={ styles.row }>
                        <View style={ styles.bullet }>
                            <Text style = { styles. textColor }>{'\u2022' + " "}</Text>
                        </View>

                        <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                                Sexual Language/Pictures  - Using sexual language or sexual pictures is not tolerated.
                            </Text>
                        </View>
                    </View>

                    <View style={ styles.row }>
                        <View style={ styles.bullet }>
                            <Text style = { styles. textColor }>{'\u2022' + " "}</Text>
                        </View>

                        <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                                Illegal Activities - You may not conduct or promote illegal activities.
                            </Text>
                        </View>
                    </View>

                    <View style={ styles.row }>
                        <View style={ styles.bullet }>
                            <Text style = { styles. textColor }>{'\u2022' + " "}</Text>
                        </View>

                        <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                                Slurs and Epithets - Racial, religious and/or ethnic slurs/epithets are not allowed.
                            </Text>
                        </View>
                    </View>
                    <View style={ styles.row }>
                        <View style={ styles.bullet }>
                            <Text style = { styles. textColor }>{'\u2022' + " "}</Text>
                        </View>

                        <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                                SPAM - Do not spam the main screen. BeakSpeak in its current form allows a user only a maximum of 10 posts per 30 minute window.
                            </Text>
                        </View>
                    </View>

                    <View style = {{height: 20}}/>
                    <View>
                        <Text style = { styles.boldText }>
                            **In addition to all policies mentioned above, Rice University policies are applicable. To review Rice cyber policies, please refer to https://oit.rice.edu/ **
                        </Text>
                        <Text/>
                        <Text style = { styles.boldText} >
                            We reserve the right to remove any post at any time.
                        </Text>
                    </View>

                    <View style = {{height: 20}}/>

                    <Text style = {styles.titleFont}>Acknowledgements</Text>
                    <View
                        style={{
                            borderBottomColor: 'white',
                            borderBottomWidth: 0.5, margin: 10
                        }}
                    />
                    <View style={ styles.row }>
                        <View style={ styles.bulletText }>
                            <Text style = { styles.textColor }>
                                Team Lead - Noushin Quazi
                            </Text>
                            <Text></Text>
                            <Text style = { styles.textColor }>
                                Developer - Alice Wong
                            </Text>
                            <Text style = { styles.textColor }>
                                Developer - Franklin Zhang
                            </Text>
                            <Text style = { styles.textColor }>
                                Developer - Gai Sawant
                            </Text>
                            <Text style = { styles.textColor }>
                                Developer - Parker Graham
                            </Text>
                            <Text style = { styles.textColor }>
                                Developer - Thera Fu
                            </Text>
                            <Text style = { styles.textColor }>
                                Developer - Yifan Yang
                            </Text>
                        </View>
                    </View>

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
        // fontFamily: 'caviar-dreams',
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
        // padding: 5,
        margin: 10
    },
    bullet: {
        width: 10
    },
    bulletText: {
        flex: 1,
    }
})