
import firebase from "react-native-firebase";
import { NavigationActions } from "react-navigation";
import { RootNavigator } from "../navigations/AppNavigation";


const firstAction = RootNavigator.router.getActionForPathAndParams(
    "AuthStack"
);
const initialNavState = RootNavigator.router.getStateForAction(firstAction);

export default nav = (state = initialNavState, action) => {
    let nextState;
    switch (action.type) {
        case "Login":
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "DrawerStack",
                    action: NavigationActions.navigate({
                        routeName: 'OrdersTab',
                        action: NavigationActions.navigate({
                            routeName: "RequestStack",
                            // action: NavigationActions.navigate({ routeName: 'ProfileTab' }),
                        }),
                    }),
                    // action: NavigationActions.navigate({ routeName: 'ProfileTab' }),
                }),
                state
            );
            break;
        case "HOME":
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "DrawerStack",
                    action: NavigationActions.navigate({ routeName: 'OrdersTab' }),
                }),
                state
            );
            break;
        case "PROFILE":
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "DrawerStack",
                    action: NavigationActions.navigate({ routeName: 'ProfileTab', }),
                }),
                state
            );
            break;
        case "Logout":
            try {
                firebase.auth().signOut();
                nextState = RootNavigator.router.getStateForAction(
                    NavigationActions.navigate({
                        routeName: "AuthStack",
                        action: NavigationActions.navigate({ routeName: 'Welcome' }),
                    }),
                    state
                );
            } catch (e) {
                console.log(e);
            }
            break;
        default:
            nextState = RootNavigator.router.getStateForAction(action, state);
            break;
    }

    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
}