import React, { Component } from "react";
import { Button, Text, TextInput, View } from "react-native";
import PropTypes from "prop-types";
import SQLite from "react-native-sqlite-storage";
import validator from "../../utility/validation";
import styles from "./styles/register.styles";

export default class RegisterScreen extends Component {
	static propTypes = {
		navigator: PropTypes.object.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
			isLoggedIn: false,
			name: {
				value: "",
				valid: false,
				validationRules: {
					isName: true,
				},
			},
			email: {
				value: "",
				valid: false,
				validationRules: {
					isEmail: true,
				},
			},
			password: {
				value: "",
				valid: false,
				validationRules: {
					minLength: 6,
				},
			},
		};
	}

	Login = () => {
		this.props.navigator.resetTo({
			screen: "AutismApplication.LoginScreen",
			title: "Log In",
		});
	};

	updateInputState = (key, value) => {
		this.setState(prevState => ({
			...prevState,
			[key]: {
				...prevState[key],
				value,
				valid: validator(value, prevState[key].validationRules),
			},
		}));
	};

	SignUp = () => {
		const db = SQLite.openDatabase(
			{ name: "app.db", createFromLocation: "~app.db" },
			this.openCB, this.successCB, this.errorCB,
		);
		db.transaction((tx) => {
			tx.executeSql("SELECT * FROM users WHERE name='" + this.state.name.value + "' AND password=" + this.state.password.value, [], (tx, results) => {
				// Get rows with Web SQL Database spec compliance.

				const len = results.rows.length;
				if (len > 0) {
					console.log("A user with this name already exist");
					alert("A user with this name already exist");
				} else {
					tx.executeSql("INSERT INTO users(name, password) VALUES ('" + this.state.name.value + "','" + this.state.password.value + "')", [], () => {
						alert("Congratulations. You can Now login");
						this.Login();
					});
				}
			});
		});
	};

	errorCB = (err) => {
		console.log(`SQL Error: ${err}`);
	}

	successCB = () => {
		console.log("SQL executed fine");
	}

	openCB = () => {
		console.log("Database OPENED");
	}

	render() {
		return (
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
						onChangeText={val => this.updateInputState("name", val)}
					/>
					<TextInput
						style={styles.textInput}
						placeholder="johnsmith@gmail.com"
						value={this.state.email.value}
						onChangeText={val => this.updateInputState("email", val)}
					/>
					<TextInput
						style={styles.textInput}
						placeholder="Password"
						value={this.state.password.value}
						onChangeText={val => this.updateInputState("password", val)}
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
						onPress={this.Login}
						style={styles.button}
						title="Log in"
					/>
				</View>
			</View>
		);
	}
}
