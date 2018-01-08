import React, { Component } from 'react';
import { Button, StyleSheet ,Text, TextInput, View } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';


export default class RegisterScreen extends Component {
    render() {
        return(
            <View
                style={styles.container}
            >
                <Text
                    style={styles.heading}
                >
                    Autism Learning Application
                </Text>
                <TextInput
                    style={styles.textInput}
                    placeholder="John Smith"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="johnsmith@gmail.com"
                />
                <TextInput
                    style={styles.textInput}
                    placeholder="*******"
                />
                <Icon 
                    name="rocket" size={30} color="#900"
                />
                <Button
                    style={styles.button}
                    title="Create An Account"
                />

            </View>
        );
    }
}

const styles = StyleSheet.create({
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
        width: "70%",
        margin: "2%",
        padding: "2%",
        color: "#fff",
        backgroundColor: "#2f394A"
    },
    button: {
        color: "#DA4255"
    },
});