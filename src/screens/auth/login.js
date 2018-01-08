import React, { Component } from 'react';
import {Button, View, Text, TextInput, StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

export default class LoginScreen extends Component {
    render() {
        return (
            <View style={logStyles.container}>
                <Text style={styles.heading}>
                    Autism Learning App
                </Text>
                <TextInput
                    style={logStyles.textInput}
                    placeholder="John Smith"
                />
                <TextInput
                    style={logStyles.textInput}
                    placeholder="*********"
                />
                <Button
                    style={logStyles.button}
                    title="Log In"
                />
                <Text
                    style={logStyles.forgetPassword}
                >
                    Forgot your password?
                </Text>
                <Text
                    style={logStyles.dash}
                >
                    ------------------------------
                </Text>

                <Icon 
                    name="rocket" size={30} color="#900"
                />

                <Button
                    
                    style={logStyles.button}
                    title="Create An Account"
                />
            </View>
        );
    }
}

const logStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#00ecff",
        alignItems: "center",
        justifyContent: "center"
    },
    heading: {
        color: "#000",
        fontSize: 19,
        fontWeight: 'bold'
    },
    textInput: {

    },
    forgetPassword: {

    },
    dash: {

    },
    button: {

    }
});