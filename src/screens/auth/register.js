import React, { Component } from 'react';
import { Button, StyleSheet ,Text, TextInput, View } from 'react-native';
import SQLite from 'react-native-sqlite-storage';
import validator from '../../utility/validation';

import Icon from 'react-native-vector-icons/FontAwesome';


export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            name: {
                value: "",
                valid: false,
                validationRules: {
                    isName: true
                }
            },
            email: {
                value: "",
                valid: false,
                validationRules: {
                    isEmail: true
                }
            },
            password: {
                value: "",
                valid: false,
                validationRules: {
                    minLength: 6
                }
            }
        }
    }

    Login = () => {
        this.props.navigator.resetTo({
            screen: 'AutismApplication.LoginScreen',
            title: 'Log In',
        })
    };

    updateInputState = (key, value) => {
        this.setState (prevState => {
            return {
                ...prevState,
                [key]: {
                    ...prevState[key],
                    value: value,
                    valid: validator(value, prevState[key].validationRules)
                }
            }
        });
    };

    SignUp = () => {
        let db = SQLite.openDatabase({name: 'app.db', createFromLocation: "~app.db"},
            this.openCB, this.successCB, this.errorCB);
        db.transaction((tx) => {
            tx.executeSql("SELECT * FROM users WHERE name='"+ this.state.name.value + "' AND password="+ this.state.password.value, [], (tx, results) => {
                // Get rows with Web SQL Database spec compliance.

                const len = results.rows.length;
                if (len > 0) {
                    console.log("A user with this name already exist");
                    alert('A user with this name already exist')
                } else {
                    tx.executeSql(" INSERT INTO users(name, password) VALUES ('"+ this.state.name.value + "','"+ this.state.password.value +"')", [], () => {
                        alert('Congratulations. You can Now login');
                        this.Login();
                    });
                }
            });
        });
    };

    errorCB(err) {
        console.log("SQL Error: " + err);
    }

    successCB() {
        console.log("SQL executed fine");
    }

    openCB() {
        console.log("Database OPENED");
    }

    render() {
        return(
            <View style={styles.container}>
                <Text
                    style={styles.heading}
                >
                    Autism Learning Application
                </Text>
                <View style={styles.inputView}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="John Smith"
                        value={this.state.name.value}
                        onChangeText={(val) => this.updateInputState('name', val)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="johnsmith@gmail.com"
                        value={this.state.email.value}
                        onChangeText={(val) => this.updateInputState('email', val)}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Password"
                        value={this.state.password.value}
                        onChangeText={(val) => this.updateInputState('password', val)}
                    />
                    <Button
                        onPress={this.SignUp}
                        style={styles.button}
                        title="Create An Account"
                    />
                </View>

                <View style={styles.loginView}>
                    <Text>
                        Already have an Account? Log In.
                    </Text>
                    <Button
                        onPress={ this.Login}
                        style={styles.button}
                        title="Log in"
                    />
                </View>
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
    inputView: {
        width: "80%"
    },

    textInput: {
        width: "100%",
        marginBottom: "5%",
        padding: "2%",
        color: "#fff"
    },
    loginView: {
        width: "80%"
    },
    button: {
        width: "100%",
        color: "#DA4255"
    }
});
