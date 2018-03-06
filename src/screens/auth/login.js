import React, { Component } from "react";
import SQLite from "react-native-sqlite-storage";
import PropTypes from "prop-types";
import { Button, View, Text, TextInput } from "react-native";
import validator from "../../utility/validation";
import logStyles from "./styles/login.styles";

export default class LoginScreen extends Component {
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
			password: {
				value: "",
				valid: false,
				validationRules: {
					minLength: 6,
				},
			},
		};
	}

	updateInputState = (key, value) => {
		this.setState(prevState => ({
			...prevState,
			[key]: {
				...prevState[key],
				value,
				valid: validator(value, prevState[key].validationRules),
			},
		}
		));
	};

	SignUp = () => {
		this.props.navigator.resetTo({
			screen: "AutismApplication.RegisterScreen",
			title: "Registration Screen",
		});
	};

	login = () => {
		const db = SQLite.openDatabase(
			{ name: "app.db", createFromLocation: "~app.db" },
			this.openCB, this.successCB, this.errorCB,
		);
		db.transaction((tx) => {
			tx.executeSql("SELECT * FROM users WHERE name='" + this.state.name.value + "' AND password=" + this.state.password.value, [], (tx, results) => {
				// Get rows with Web SQL Database spec compliance.
				const len = results.rows.length;
				if (len > 0) {
					this.props.navigator.resetTo({
						screen: "AutismApplication.SyllabusScreen",
						title: "Syllabus",
					});
				} else {
					console.log("Name or password is wrong. Try Again.");
					alert("Name or password is wrong. Try Again.")
				}
			});
		});
	};

	render() {
		return (
			<View style={logStyles.container}>
				<Text style={logStyles.heading}>
					Autism Learning App
				</Text>
				<View style={logStyles.inputView}>
					<TextInput
						style={logStyles.textInput}
						placeholder="John Smith"
						value={this.state.name.value}
						onChangeText={val => this.updateInputState("name", val)}
					/>
					<TextInput
						style={logStyles.textInput}
						placeholder="Password"
						value={this.state.password.value}
						onChangeText={val => this.updateInputState("password", val)}
					/>
					<Button
						onPress={this.login}
						style={logStyles.button}
						title="Log In"
					/>
				</View>
				<View style={logStyles.createAccount}>
					<Text style={logStyles.text}>
						Don't have an account?
					</Text>
					<Text style={logStyles.text}>
						Click Below to create an account.
					</Text>
					<Button
						onPress={this.SignUp}
						style={logStyles.button}
						title="Create An Account"
					/>
				</View>
			</View>
		);
	}
}
