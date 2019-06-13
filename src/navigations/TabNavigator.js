import { createBottomTabNavigator } from "react-navigation";
import { Image } from "react-native";

import { Configuration } from "../Configuration";
import HomeStack from './HomeStack';
import { AppIcon, AppStyles } from "../AppStyles";


export default TabNavigator = createBottomTabNavigator(
    {
        Home: { screen: HomeStack }
    },
    {
        navigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName;
                if (routeName === "Home") {
                    iconName = AppIcon.images.home;
                }
                console.log("iconName",iconName)
                // You can return any component that you like here! We usually use an
                // icon component from react-native-vector-icons
                return (
                    <Image
                        style={{
                            tintColor: focused ? AppStyles.color.tint : AppStyles.color.grey
                        }}
                        source={iconName}
                    />
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