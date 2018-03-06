import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const AppTabs = () => (
	<View style={syllabusStyles.tabs}>
		<View style={syllabusStyles.tab}>
			<Icon
				name="book"
				size={20}
				color="#000"
			/>
			<Text>
				Learning
			</Text>
		</View>
		<View style={syllabusStyles.tab}>
			<Icon
				name="user"
				size={20}
				color="#000"
			/>
			<Text>
				Profile
			</Text>
		</View>
		<View style={syllabusStyles.tab}>
			<Icon
				name="spinner"
				size={20}
				color="#000"
			/>
			<Text>
				Progress
			</Text>
		</View>
		<View style={syllabusStyles.tab}>
			<Icon
				name="gear"
				size={20}
				color="#000"
			/>
			<Text>
				Settings
			</Text>
		</View>
	</View>
);

const syllabusStyles = StyleSheet.create({
	tabs: {
		flexDirection: "row",
		justifyContent: "space-around",
		backgroundColor: "#fff",
		height: "15%",
		width: "70%",
		borderRadius: 10,
		marginTop: "2%",
	},
	tab: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});

export default AppTabs;
