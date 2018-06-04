import React from "react";
import { Modal, View, Text, Button, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const FailureModal = props => (
	<Modal
		visible={props.modalVisible}
		animationType="slide"
		onRequestClose={props.closeModal}
	>
		<View style={failureModalStyle.container}>
			<Text style={failureModalStyle.text}>
				Wrong. That Is Not The Right Answer
			</Text>
			<Icon
				name="remove"
				size={100}
				color="#ed0202"
			/>
			<View style={failureModalStyle.buttonContainer}>
				<Button
					title="Try Again"
					onPress={props.closeModal}
				/>
			</View>
		</View>
	</Modal>
);

const failureModalStyle = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	text: {
		fontSize: 32,
		fontWeight:"bold",
	},
	buttonContainer: {
		flexDirection: "row",
		width: "80%",
		justifyContent: "space-around",
		marginTop: "2%",
	},
});

export default FailureModal;
