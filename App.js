import { Navigation } from 'react-native-navigation';

import LoginScreen  from './src/screens/auth/login'
import RegisterScreen from './src/screens/auth/register'

// registration of screens
Navigation.registerComponent("AutismApplication.LoginScreen", () => LoginScreen)
Navigation.registerComponent("AutismApplication.RegisterScreen", () => RegisterScreen)

// Start the app

Navigation.startSingleScreenApp({
    screen: {
        screen: "AutismApplication.RegisterScreen"
    },
});