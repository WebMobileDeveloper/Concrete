// login stack
import { createStackNavigator, } from "react-navigation";

import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import TermsAndConditions from "../screens/TermsAndConditions";

export default AuthStack = createStackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Terms: { screen: TermsAndConditions }
  },
  {
    initialRouteName: "Welcome",
  }
);
