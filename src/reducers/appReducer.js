import * as types from '../actions/ActionTypes';

const initialAppState = {
    isLoading: false,
    list: {
        Order: {},
        Quote: {}
    },
    ids: {
        Order: null,
        Quote: null
    }
};

export default app = (state = initialAppState, action) => {
    switch (action.type) {
        case types.SHOW_LOADING:
            return { ...state, isLoading: true };
        case types.HIDE_LOADING:
            return { ...state, isLoading: false };
        case types.SET_ORDERS_LIST:
            return {
                ...state,
                list: {
                    ...state.list,
                    Order: action.value
                }
            };
        case types.SET_QUOTES_LIST:
            return {
                ...state,
                list: {
                    ...state.list,
                    Quote: action.value
                }
            };
        case types.SET_DETAIL_ID:
            const { order_type, id } = action.value;
            const newIds = { ...state.ids };
            newIds[order_type] = id;
            return {
                ...state,
                ids: newIds,
            };
        default:
            return state;
    }
}