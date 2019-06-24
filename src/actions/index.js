import * as types from './ActionTypes';
import firebase from "react-native-firebase";
import { sortByField } from "../utils/func";


let OrderListRef = null;
let QuoteListRef = null;

export function loged_in(user) {
    return function (dispatch) {
        dispatch(watchFirebase(user));
    }
    // watchFirebase(user);
    // return {
    //     type: types.LOGEDIN,
    //     user: user
    // }
}

export function goto_home(user_type) {
    return {
        type: types.HOME,
        user_type: user_type,
    }
}
export function goto_profile() {
    return {
        type: types.PROFILE,
    }
}

export function logout() {
    stopWatch();
    return {
        type: types.LOGOUT,
    }
}

export function show_loading() {
    return {
        type: types.SHOW_LOADING,
    }
}
export function hide_loading() {
    return {
        type: types.HIDE_LOADING,
    }
}
export const setDetailId = (order_type, id) => {
    return {
        type: types.SET_DETAIL_ID,
        value: { order_type, id },
    };
};

export const setOrdersList = (ordersList) => {
    return {
        type: types.SET_ORDERS_LIST,
        value: ordersList
    };
};
export const setQuotesList = (quotesList) => {
    return {
        type: types.SET_QUOTES_LIST,
        value: quotesList
    };
};
export const stopWatch = () => {
    return function (dispatch) {
        if (OrderListRef) OrderListRef.off('value');
        if (QuoteListRef) QuoteListRef.off('value');
        dispatch(setOrdersList({}));
        dispatch(setQuotesList({}));
    }
}
export const watchFirebase = (user) => {

    const { uid, user_type } = user;

    return function (dispatch) {
        stopWatch();
        dispatch({
            type: types.LOGEDIN,
            user: user
        })
        if (user_type == 'Client') {  // admin watch
            OrderListRef = firebase.database().ref("Order");
            QuoteListRef = firebase.database().ref("Quote");
        } else {                     // customer watch
            OrderListRef = firebase.database().ref("Order").orderByChild('uid').equalTo(uid);
            QuoteListRef = firebase.database().ref("Quote").orderByChild('uid').equalTo(uid);
        }
        OrderListRef.on("value",
            function ({ _value }) {
                let ordersList = _value || {}
                dispatch(setOrdersList(ordersList));
            },
            function (error) { alert(error); }
        );
        QuoteListRef.on("value",
            function ({ _value }) {
                let quotesList = _value || {}
                dispatch(setQuotesList(quotesList));
            },
            function (error) { alert(error); }
        );
    }
};