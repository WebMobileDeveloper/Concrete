import * as types from './ActionTypes';

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