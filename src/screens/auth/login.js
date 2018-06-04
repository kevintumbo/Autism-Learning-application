import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, View, Text, TextInput } from "react-native";
import { connect } from "react-redux";
import validator from "../../utility/validation";
import logStyles from "./styles/login.styles";
import loginUser from "./actions/authenticate";

class LoginScreen extends Component {
	static propTypes = {
		navigator: PropTypes.object.isRequired,
		loginUser: PropTypes.func.isRequired,
	}
	constructor(props) {
		super(props);
		this.state = {
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
		const nameToCheck = this.state.name.value;
		const passwordToCheck = this.state.password.value;
		this.props.loginUser(nameToCheck, passwordToCheck);
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

const mapDispatchToProps = {
	loginUser,
};

export default connect(null, mapDispatchToProps)(LoginScreen);
