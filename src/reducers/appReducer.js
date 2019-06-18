import * as types from '../actions/ActionTypes';

const initialAppState = { isLoading: false };

export default app = (state = initialAppState, action) => {
    switch (action.type) {
        case types.SHOW_LOADING:
            return { ...state, isLoading: true };
        case types.HIDE_LOADING:
            return { ...state, isLoading: false };
        default:
            return state;
    }
}