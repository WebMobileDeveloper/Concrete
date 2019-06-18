
import { createDrawerNavigator } from "react-navigation";

import DrawerContainer from "../components/DrawerContainer";
import MainTabNavigator from './mainTapNav/_MainTabNavigator';
import AuthStack from './AuthStack';
import { noTransitionConfig } from '../Configuration';

// Manifest of possible screens
export default RootNavigator = createDrawerNavigator(
  {
    AuthStack: { screen: AuthStack },
    MainTap: { screen: MainTabNavigator },
  },
  {
    // Default config for all screens
    headerMode: "none",
    // initialRouteName: "MainTap",
    initialRouteName: "AuthStack",
    drawerPosition: "left",
    drawerWidth: 200,
    contentComponent: DrawerContainer,
    // transitionConfig: noTransitionConfig,
  }
);

