// drawer stack

import { createDrawerNavigator } from "react-navigation";
import DrawerContainer from "../components/DrawerContainer";
import TabNavigator from './mainTapNav/TabNavigator';

export default DrawerStack = createDrawerNavigator(
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