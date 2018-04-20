import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
	},
	questionContainer: {
		flexDirection: "row",
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
	imageContainer: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: "1%",
		width: "100%",
	},
});

export default styles;
