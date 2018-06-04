import { StyleSheet } from "react-native";

const syllabusStyles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		backgroundColor: "#00ecff",
		paddingBottom: "5%",
	},
	syllabusList: {
		flexDirection: "column",
		height: "80%",
		width: "70%",
		backgroundColor: "#fff",
		marginTop: "2%",
		marginBottom: "5%",

	},
	syllabusListHeader: {
		alignItems: "center",
		paddingTop: "3%",
		paddingBottom: "3%",
	},
	syllabusListOption: {
		alignItems: "stretch",
	},
});

export default syllabusStyles;
