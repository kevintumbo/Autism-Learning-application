import { Navigation } from "react-native-navigation";
import Icon from "react-native-vector-icons/FontAwesome";

const startMainTabs = () => {
	Promise.all([
		Icon.getImageSource("book", 20),
		Icon.getImageSource("spinner", 20),
	]).then((sources) => {
		Navigation.startTabBasedApp({
			tabs: [
				{
					label: "Syllabus",
					icon: sources[0],
					screen: "AutismApplication.SyllabusScreen",
					title: "Syllabus",
				},
				{
					label: "Progress",
					icon: sources[1],
					screen: "AutismApplication.SyllabusProgressScreen",
					title: "Progress",
				},
			],
		});
	});
};

export default startMainTabs;
