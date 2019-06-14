
import { Animated, Easing } from "react-native";
import { connect } from "react-redux";
import { createDrawerNavigator } from "react-navigation";
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from "react-navigation-redux-helpers";

import DrawerContainer from "../components/DrawerContainer";
import MainTabNavigator from './mainTapNav/_MainTabNavigator';
import AuthStack from './AuthStack';

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

const middleware = createReactNavigationReduxMiddleware(
  // "root",
  state => state.nav
);



// Manifest of possible screens
const RootNavigator = createDrawerNavigator(
  {
    AuthStack: { screen: AuthStack },
    MainTap: { screen: MainTabNavigator },
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "MainTap",
    // initialRouteName: "AuthStack",
    drawerPosition: "left",
    drawerWidth: 200,
    contentComponent: DrawerContainer,
    transitionConfig: noTransitionConfig,
  }
);

const AppWithNavigationState = createReduxContainer(RootNavigator, "root");

const mapStateToProps = state => ({
  state: state.nav
});
const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

export { RootNavigator, AppNavigator, middleware };
