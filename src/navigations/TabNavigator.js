import React from 'react';
import { createBottomTabNavigator } from "react-navigation";
import { Image, Text } from "react-native";
import FastImage from "react-native-fast-image";
import { Configuration } from "../Configuration";
import HomeStack from './HomeStack';
import { AppIcon, AppStyles } from "../AppStyles";
import homeImage from "../../assets/icons/home.png";

export default TabNavigator = createBottomTabNavigator(
    {
        Home: { screen: HomeStack }
    },
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === "Home") {
                    iconName = AppIcon.images.home;
                }
                return (
                    <Image style={{ tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey }} source={iconName} />
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