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

import ProfileScreen from "../screens/ProfileScreen";
import EditProfileScreen from "../screens/EditProfileScreen";

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
// ===========================================================================
//                    AuthStack
// ===========================================================================

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
      headerTintColor: AppStyles.color.blue,
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);


// ===========================================================================
//                    HomeTabNavigator
// ===========================================================================

const HomeStack = createStackNavigator(
  {
    HomeScreen: { screen: HomeScreen }
  },
  {
    initialRouteName: "HomeScreen",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: AppStyles.color.blue,
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const OrderStack = createStackNavigator(
  {
    OrderScreen: { screen: OrderScreen }
  },
  {
    initialRouteName: "OrderScreen",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: AppStyles.color.blue,
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const HomeTabNavigator = createBottomTabNavigator(
  {
    HomeStack: { screen: HomeStack },
    OrderStack: { screen: OrderStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'HomeStack':
            iconName = AppIcon.images.home;
            break;
          case 'OrderStack':
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



// ===========================================================================
//                    ProfileTabNavigator
// ===========================================================================
const ProfileStack = createStackNavigator(
  {
    ProfileScreen: { screen: ProfileScreen }
  },
  {
    initialRouteName: "ProfileScreen",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: AppStyles.color.blue,
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);
const EditProfileStack = createStackNavigator(
  {
    EditProfileScreen: { screen: EditProfileScreen }
  },
  {
    initialRouteName: "EditProfileScreen",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: AppStyles.color.blue,
      headerTitleStyle: styles.headerTitleStyle
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const ProfileTabNavigator = createBottomTabNavigator(
  {
    ProfileStack: { screen: ProfileStack },
    EditProfileStack: { screen: EditProfileStack},
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'ProfileStack':
            iconName = AppIcon.images.home;
            break;
          case 'EditProfileStack':
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


// ===========================================================================
//                    DrawerStack
// ===========================================================================
// drawer stack
const DrawerStack = createDrawerNavigator(
  {
    HomeTab: HomeTabNavigator,
    ProfileTab: ProfileTabNavigator
  },
  {
    drawerPosition: "left",
    initialRouteName: "HomeTab",
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
