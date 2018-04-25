import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text, ScrollView } from "react-native";
import PropTypes from "prop-types";
import getSyllabusAction from "./actions/progress";

class SyllabusProgressScreen extends Component {
	static propTypes = {
		user_id: PropTypes.number.isRequired,
		getSyllabusAction: PropTypes.func.isRequired,
	}

	constructor(props) {
		super(props);
		this.state = {
			syllabusProgress: [],
		};
	}

	componentDidMount() {
		this.props.getSyllabusAction(this.props.user_id);
	}
	render() {
		return (
			<ScrollView contentContainerStyle={{ flexGrow: 1 }}>
				<View>
					<Text>
						hello
					</Text>
				</View>
			</ScrollView>
		);
	}
}

const mapStateToProps = state => ({
	user_id: state.auth.id,
});

const mapDispatchToProps = {
	getSyllabusAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(SyllabusProgressScreen);
