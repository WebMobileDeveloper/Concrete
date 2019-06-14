import React from 'react';
import { createBottomTabNavigator } from "react-navigation";
import { Image, Text } from "react-native";
import { Configuration } from "../../Configuration";
import HomeStack from './HomeStack';
import OrderStack from './OrderStack';
import { AppIcon, AppStyles } from "../../AppStyles";

export default MainTabNavigator = createBottomTabNavigator(
    {
        Home: { screen: HomeStack, },
        Order: { screen: OrderStack },
    },
    {
        initialRouteName: "Order",
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor } ) => {
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
                return (
                    <Image style={{ tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey, width: 20, height: 20, resizeMode: "contain" }} source={iconName} />
                );
            },
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
        },

    }
);