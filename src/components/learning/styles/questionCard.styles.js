import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	question: {
		fontSize: 22,
		fontWeight: "bold",
	},
	buttonContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: "2%",
	},
	button: {
		width: "40%",
	},
});

export default styles;
