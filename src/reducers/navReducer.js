
import firebase from "react-native-firebase";
import { NavigationActions } from "react-navigation";
import { RootNavigator } from "../navigations/AppNavigation";
import * as types from "../actions/ActionTypes";

const firstAction = RootNavigator.router.getActionForPathAndParams(
    "AuthStack"
);
const initialNavState = RootNavigator.router.getStateForAction(firstAction);

export default nav = (state = initialNavState, action) => {
    let nextState;
    switch (action.type) {
        case types.LOGEDIN:
            const { user } = action;
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "DrawerStack",
                    action: NavigationActions.navigate({
                        routeName: user.user_type == 'Client' ? 'AdminTab' : 'CustomerTab',
                        // action: NavigationActions.navigate({
                        //     routeName: "RequestStack",
                        //     // action: NavigationActions.navigate({ routeName: 'ProfileTab' }),
                        // }),
                    }),
                }),
                state
            );
            break;
        case types.HOME:
            const { user_type } = action;
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "DrawerStack",
                    action: NavigationActions.navigate({ routeName: user_type == 'Client' ? 'AdminTab' : 'CustomerTab' }),
                }),
                state
            );
            break;
        case types.PROFILE:
            nextState = RootNavigator.router.getStateForAction(
                NavigationActions.navigate({
                    routeName: "DrawerStack",
                    action: NavigationActions.navigate({ routeName: 'ProfileTab', }),
                }),
                state
            );
            break;
        case types.LOGOUT:
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