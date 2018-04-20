import React, { Component } from "react";
import { View, Text, ScrollView } from "react-native";


class ProgressScreen extends Component {
	state = {}
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

export default ProgressScreen;
