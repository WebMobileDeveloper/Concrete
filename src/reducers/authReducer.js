import AsyncStorage from "@react-native-community/async-storage";


const initialAuthState = { isLoggedIn: false };

export default auth = (state = initialAuthState, action) => {
    switch (action.type) {
        case "Login":
            return { ...state, isLoggedIn: true, user: action.user };
        case "Logout":
            AsyncStorage.removeItem("@loggedInUser:uid");
            AsyncStorage.removeItem("@loggedInUser:email");
            AsyncStorage.removeItem("@loggedInUser:password");
            return { ...state, isLoggedIn: false, user: {} };
        default:
            return state;
    }
}