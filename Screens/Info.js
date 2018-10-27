import React, {Component} from 'react'
import {StyleSheet, ScrollView, Image} from 'react-native'
import {
    Card,
    Container,
    Icon,
    View,
    Text
} from 'native-base'

const logo = require('../Assets/Images/logo.png')

// main component
export default class Info extends Component{

    render = () => {
        return(
            <Container style = {{backgroundColor: 'powderblue'}}>
                <ScrollView>
                    {/*<View style={{flex: 3}}>*/}
                        {/*/!* our logo *!/*/}
                        {/*<Image*/}
                            {/*source = {logo}*/}
                            {/*style = {styles.image}*/}
                        {/*/>*/}
                    {/*</View>*/}

                    <View style={{flex:1}}/>

                {/*<View style = {{flex: 1}}>*/}
                    <Text style = {styles.titleFont}>User Policy</Text>

                        <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = {{color: 'white'}}>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = {{color: 'white'}}>
                                Racism, sexism, homophobia, transphobia, ableism, or any other -ism is strictly
                                not allowed. No exceptions.
                            </Text>
                            </View>

                        </View>

                    <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = {{color: 'white'}}>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = {{color: 'white'}}>
                                Do NOT use names in any sort of negative light. You can't use our service to bully others.
                            </Text>
                            </View>
                    </View>

                    <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = {{color: 'white'}}>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = {{color: 'white'}}>
                               Names used positively are entirely allowed. Shout-outs, compliments, etc.
                            </Text>
                            </View>
                    </View>

                    <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = {{color: 'white'}}>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = {{color: 'white'}}>
                               You're welcome to complain about people on here, but keep their identity entirely private.
                            </Text>
                            </View>
                    </View>

                    <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = {{color: 'white'}}>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = {{color: 'white', padding: 3}}>
                               You're welcome to complain about people on here, but keep their identity entirely private.
                            </Text>
                            <Text style = {{color: 'white', fontWeight: 'bold', textAlign: 'center'}}>
                                     If it's obvious to ANYONE who you're talking about, your post will be removed.
                            </Text>
                            </View>
                    </View>

                    <View style={ styles.row }>
                            <View style={ styles.bullet }>
                                <Text style = {{color: 'white'}}>{'\u2022' + " "}</Text>
                            </View>

                            <View style={ styles.bulletText }>
                            <Text style = {{color: 'white'}}>
                               Respect other users in all interactions.
                            </Text>
                            </View>
                    </View>

                    <View style = {{height: 20}}/>

                    <View>
                        <Text style = {{color: 'white', fontWeight : 'bold', textAlign: 'center'}}>
                           ** Failure to follow the above will result in a ban. **
                        </Text>
                        <Text style = {{color: 'white', fontWeight : 'bold', textAlign: 'center'}}>
                           We reserve the right to remove any post at any time.
                        </Text>
                    </View>

                    <View style = {{height: 20}}/>

                    {/*<Text style = {{color: 'white'}}>*/}
                        {/*Racism, sexism, homophobia, transphobia, ableism, or any other -ism is strictly not allowed. No exceptions.*/}
                        {/*Do NOT use names in any sort of negative light. You can't use our service to bully others.*/}
                        {/*Names used positively are entirely allowed. Shout-outs, compliments, etc.*/}
                        {/*You're welcome to complain about people on here, but keep their identity entirely private.*/}
                        {/*** If it's obvious to ANYONE who you're talking about, your post will be removed. ***/}
                        {/*Respect other users in all interactions.*/}

                        {/*** Failure to follow the above will result in a ban.*/}
                        {/*We reserve the right to remove any post at any time.*/}
                    {/*</Text>*/}

                {/*</View>*/}
                {/*<View style = {{flex: 1}}>*/}
                    <Text style = {styles.titleFont}>Acknowledgements</Text>
                    <Text style = {{color: 'white'}}>Credit to the devs</Text>
                {/*</View>*/}
                </ScrollView>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        height: undefined,
        width: undefined,
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
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        flex: 1,
        padding: 5
    },
    bullet: {
        width: 10
    },
    bulletText: {
        flex: 1,
    }
})