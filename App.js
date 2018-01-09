import { Navigation } from 'react-native-navigation';

import LoginScreen  from './src/screens/auth/login';
import RegisterScreen from './src/screens/auth/register';
import SyllabusScreen from './src/screens/syllabus/syllabus';

// registration of screens
Navigation.registerComponent("AutismApplication.LoginScreen", () => LoginScreen);
Navigation.registerComponent("AutismApplication.RegisterScreen", () => RegisterScreen);
Navigation.registerComponent("AutismApplication.SyllabusScreen", () => SyllabusScreen);

// Start the app

Navigation.startSingleScreenApp({
    screen: {
        screen: "AutismApplication.SyllabusScreen"
    },
});