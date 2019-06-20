import * as types from '../actions/ActionTypes';

const initialAppState = { isLoading: false, ordersList: [] };

export default app = (state = initialAppState, action) => {
    switch (action.type) {
        case types.SHOW_LOADING:
            return { ...state, isLoading: true };
        case types.HIDE_LOADING:
            return { ...state, isLoading: false };     
        case types.SET_ORDERS_LIST:
            return { ...state, ordersList: action.value };
        default:
            return state;
    }
}