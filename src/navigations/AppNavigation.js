import React from "react";
import { Animated, Easing, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { createReactNavigationReduxMiddleware, createReduxContainer } from "react-navigation-redux-helpers";


import LoginScreen from "../screens/LoginScreen";
import SignupScreen from "../screens/SignupScreen";
import WelcomeScreen from "../screens/WelcomeScreen";
import TermsAndConditions from "../screens/TermsAndConditions";

import OrderScreen from "../screens/OrderScreen";
import HomeScreen from "../screens/HomeScreen";

import { AppIcon, AppStyles } from "../AppStyles";
import { Configuration } from "../Configuration";
import DrawerContainer from "../components/DrawerContainer";

const noTransitionConfig = () => ({
  transitionSpec: {
    duration: 0,
    timing: Animated.timing,
    easing: Easing.step0
  }
});

const middleware = createReactNavigationReduxMiddleware(state => state.nav);

const AuthStack = createStackNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Login: { screen: LoginScreen },
    Signup: { screen: SignupScreen },
    Terms: { screen: TermsAndConditions }
  },
  {
    initialRouteName: "Welcome",
    headerMode: "float",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const HomeStack = createStackNavigator(
  {
    Home: { screen: HomeScreen }
  },
  {
    initialRouteName: "Home",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const OrderStack = createStackNavigator(
  {
    Order: { screen: OrderScreen }
  },
  {
    initialRouteName: "Order",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: "red",
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    Home: { screen: HomeStack },
    Order: { screen: OrderStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = AppIcon.images.home;
            break;
          case 'Order':
            iconName = AppIcon.images.order;
            break;
        }

        // You can return any component that you like here! We usually use an
        // icon component from react-native-vector-icons
        return (
          <Image
            style={{
              tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey, width: 20, height: 20, resizeMode: "contain"
            }}
            source={iconName} />
        );
      }
    }),
    initialLayout: {
      height: 300
    },
    tabBarOptions: {
      activeTintColor: AppStyles.color.tint,
      inactiveTintColor: "gray",
      style: {
        height: Configuration.home.tab_bar_height
      }
    }
  }
);

// drawer stack
const DrawerStack = createDrawerNavigator(
  {
    Tab: TabNavigator
  },
  {
    drawerPosition: "left",
    initialRouteName: "Tab",
    drawerWidth: 200,
    contentComponent: DrawerContainer
  }
);

// Manifest of possible screens
const RootNavigator = createStackNavigator(
  {
    AuthStack: { screen: AuthStack },
    DrawerStack: { screen: DrawerStack }
  },
  {
    // Default config for all screens
    headerMode: "none",
    initialRouteName: "DrawerStack",
    transitionConfig: noTransitionConfig,
    navigationOptions: ({ navigation }) => ({
      color: "black"
    })
  }
);

const AppWithNavigationState = createReduxContainer(RootNavigator, "root");

const mapStateToProps = state => ({
  state: state.nav
});

const AppNavigator = connect(mapStateToProps)(AppWithNavigationState);

const styles = StyleSheet.create({
  headerTitleStyle: {
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    color: "black",
    flex: 1,
    fontFamily: AppStyles.fontName.main
  }
});

export { RootNavigator, AppNavigator, middleware };
