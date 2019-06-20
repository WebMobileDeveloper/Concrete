import React from "react";
import { Animated, Easing, Image, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { createDrawerNavigator, createStackNavigator, createBottomTabNavigator } from "react-navigation";
import { createReactNavigationReduxMiddleware, createReduxContainer } from "react-navigation-redux-helpers";


import LoginScreen from "../screens/AuthStack/LoginScreen";
import SignupScreen from "../screens/AuthStack/SignupScreen";
import WelcomeScreen from "../screens/AuthStack/WelcomeScreen";
import TermsAndConditions from "../screens/AuthStack/TermsAndConditions";

import RequestScreen from "../screens/OrderStack/RequestScreen";
import OrdersScreen from "../screens/OrderStack/OrdersScreen";
import QuotesScreen from "../screens/OrderStack/QuotesScreen";

import ProfileScreen from "../screens/ProfileStack/ProfileScreen";
import EditProfileScreen from "../screens/ProfileStack/EditProfileScreen";
import CardScreen from "../screens/ProfileStack/CardScreen";

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
//                    OrdersTabNavigator
// ===========================================================================

const OrdersStack = createStackNavigator(
  {
    OrdersScreen: { screen: OrdersScreen }
  },
  {
    initialRouteName: "OrdersScreen",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: AppStyles.color.blue,
      headerTitleStyle: styles.headerTitleStyle,
      tabBarLabel: 'Orders',
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);
const QuotesStack = createStackNavigator(
  {
    QuotesScreen: { screen: QuotesScreen }
  },
  {
    initialRouteName: "QuotesScreen",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: AppStyles.color.blue,
      headerTitleStyle: styles.headerTitleStyle,
      tabBarLabel: 'Quotes',
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const RequestStack = createStackNavigator(
  {
    RequestScreen: { screen: RequestScreen }
  },
  {
    initialRouteName: "RequestScreen",
    headerMode: "float",

    headerLayoutPreset: "center",
    navigationOptions: ({ navigation }) => ({
      headerTintColor: AppStyles.color.blue,
      headerTitleStyle: styles.headerTitleStyle,
      tabBarLabel: 'Request',
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);

const OrdersTabNavigator = createBottomTabNavigator(
  {
    OrdersStack: { screen: OrdersStack },
    QuotesStack: { screen: QuotesStack },
    RequestStack: { screen: RequestStack }
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'OrdersStack':
            iconName = AppIcon.images.order;
            break;
          case 'QuotesStack':
            iconName = AppIcon.images.quote;
            break;
          case 'RequestStack':
            iconName = AppIcon.images.request;
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
      headerTitleStyle: styles.headerTitleStyle,
      tabBarLabel: 'Profile',
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
      headerTitleStyle: styles.headerTitleStyle,
      tabBarLabel: 'Edit Profile',
    }),
    cardStyle: { backgroundColor: "#FFFFFF" }
  }
);
const CardStack = createStackNavigator(
  {
    CardScreen: { screen: CardScreen }
  },
  {
    initialRouteName: "CardScreen",
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
    EditProfileStack: { screen: EditProfileStack },
    // CardStack: { screen: CardStack},
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
          case 'CardStack':
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
    OrdersTab: OrdersTabNavigator,
    ProfileTab: ProfileTabNavigator
  },
  {
    drawerPosition: "left",
    initialRouteName: "OrdersTab",
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
