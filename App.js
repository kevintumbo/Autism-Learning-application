import { Navigation } from "react-native-navigation";
import { Provider } from "react-redux";

import LoginScreen from "./src/screens/auth/login";
import RegisterScreen from "./src/screens/auth/register";
import SyllabusScreen from "./src/screens/learning/syllabus";
import UnitScreen from "./src/screens/learning/unit";
import QuestionScreen from "./src/screens/learning/question";
import SyllabusProgressScreen from "./src/screens/progress/syllabusProgress";
import UnitProgressScreen from "./src/screens/progress/unitProgress";

import configureStore from "./src/store/configureStore";


const store = configureStore();

// registration of screens
Navigation.registerComponent("AutismApplication.LoginScreen", () => LoginScreen, store, Provider);
Navigation.registerComponent("AutismApplication.RegisterScreen", () => RegisterScreen, store, Provider);
Navigation.registerComponent("AutismApplication.SyllabusScreen", () => SyllabusScreen, store, Provider);
Navigation.registerComponent("AutismApplication.UnitScreen", () => UnitScreen, store, Provider);
Navigation.registerComponent("AutismApplication.QuestionScreen", () => QuestionScreen, store, Provider);
Navigation.registerComponent("AutismApplication.SyllabusProgressScreen", () => SyllabusProgressScreen, store, Provider);
Navigation.registerComponent("AutismApplication.UnitProgressScreen", () => UnitProgressScreen, store, Provider);

// Start the app

Navigation.startSingleScreenApp({
	screen: {
		screen: "AutismApplication.LoginScreen",
		title: "Log In",
	},
});
