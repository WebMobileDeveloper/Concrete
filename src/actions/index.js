import * as types from './ActionTypes';
import firebase from "react-native-firebase";
import { sortByField } from "../utils/func";


let OrderListRef = null;
let QuoteListRef = null;
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
export const watchOrdersList = (uid) => {
    return function (dispatch) {
        if (OrderListRef) {
            OrderListRef.off('value');
            QuoteListRef.off('value');
        }
        OrderListRef = firebase.database().ref("Order").orderByChild('uid').equalTo(uid);
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
            function (error) { console.log("watchOrdersList error======", error); }
        );

        QuoteListRef = firebase.database().ref("Quote").orderByChild('uid').equalTo(uid);
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
            function (error) { console.log("watchQuotesList error======", error); }
        );
    }
};