import * as types from './ActionTypes';
import firebase from "react-native-firebase";
import { sortByField } from "../utils/func";


let OrderListRef = null;
let QuoteListRef = null;

export function loged_in(user) {
    return {
        type: types.LOGEDIN,
        user: user
    }
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
        dispatch(setOrdersList([]));
        dispatch(setQuotesList([]));
    }
}
export const watchFirebase = (uid, user_type) => {
    return function (dispatch) {
        stopWatch();
        if (user_type == 'Client') {  // admin watch
            OrderListRef = firebase.database().ref("Order");
            QuoteListRef = firebase.database().ref("Quote");
        } else {                     // customer watch
            OrderListRef = firebase.database().ref("Order").orderByChild('uid').equalTo(uid);
            QuoteListRef = firebase.database().ref("Quote").orderByChild('uid').equalTo(uid);
        }

        OrderListRef.on("value",
            function ({ _value }) {
                let orders = _value || {}
                let ordersList = [];
                for (key in orders) {
                    item = orders[key];
                    item.key = key;
                    ordersList.push(item);
                }
                ordersList = sortByField(ordersList, "requestTime");
                var actionSetOrdersList = setOrdersList(ordersList);
                dispatch(actionSetOrdersList);
            },
            function (error) { alert(error); }
        );
        QuoteListRef.on("value",
            function ({ _value }) {
                let quotes = _value || {}
                let quotesList = [];
                for (key in quotes) {
                    item = quotes[key];
                    item.key = key;
                    quotesList.push(item);
                }
                quotesList = sortByField(quotesList, "requestTime");
                var actionSetQuotesList = setQuotesList(quotesList);
                dispatch(actionSetQuotesList);
            },
            function (error) { alert(error); }
        );
    }
};