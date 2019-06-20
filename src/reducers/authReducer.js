import AsyncStorage from "@react-native-community/async-storage";
import * as types from "../actions/ActionTypes";

const initialAuthState = { isLoggedIn: false };

export default auth = (state = initialAuthState, action) => {
    switch (action.type) {
        case types.LOGEDIN:
            const { user } = action;
            AsyncStorage.setItem("@loggedInUser:uid", user.uid);
            AsyncStorage.setItem("@loggedInUser:email", user.email);
            AsyncStorage.setItem("@loggedInUser:password", user.password);
            AsyncStorage.setItem("@loggedInUser:type", user.user_type);
            return { ...state, isLoggedIn: true, user: action.user };
        case types.LOGOUT:
            AsyncStorage.removeItem("@loggedInUser:uid");
            AsyncStorage.removeItem("@loggedInUser:email");
            AsyncStorage.removeItem("@loggedInUser:password");
            AsyncStorage.removeItem("@loggedInUser:type");
            return { ...state, isLoggedIn: false, user: {} };
        case "PROFILE_UPDATED":
            let newState = { ...state, user: action.user };
            return newState;
        default:
            return state;
    }
}