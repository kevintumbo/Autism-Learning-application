import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const CompletionModal = props => (
	<Modal
		visible={props.modalVisible}
		animationType="slide"
		onRequestClose={() => props.closeModal}
	>
		<View style={completionModalStyle.container}>
			<Text style={completionModalStyle.text}>
				Congratulations. You Have Finished The Unit.
			</Text>
			<View style={completionModalStyle.iconContainer}>
				<Icon
					name="star" size={100} color="#FFD700"
				/>
				<Icon
					name="star" size={100} color="#FFD700"
				/>
				<Icon
					name="star" size={100} color="#FFD700"
				/>
			</View>
			<View style={completionModalStyle.buttonContainer}>
				<Button
					style={completionModalStyle.button}
					title="Repeat Unit"
					onPress={props.repeatUnit}
				/>

				<Button
					title="Choose Another Unit"
					onPress={props.chooseAnotherUnit}
				/>
			</View>
		</View>
	</Modal>
);

const completionModalStyle = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 32,
		fontWeight: "bold",
	},
	iconContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "80%",
		justifyContent: "space-around",
		marginTop: "2%",
	},
});

export default CompletionModal;
