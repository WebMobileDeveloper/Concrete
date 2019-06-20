import * as types from './ActionTypes';
import firebase from "react-native-firebase";
import { sortByField } from "../utils/func";


let OrderListRef = null;
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
export const watchOrdersList = (uid) => {
    return function (dispatch) {
        if (OrderListRef) OrderListRef.off('value');
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
    }
};