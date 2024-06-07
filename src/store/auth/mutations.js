import {
    SET_AUTHENTICATION,
    SET_LOADING,
    SET_USERNAME,
} from "../storeconstants";

export default {

    [SET_AUTHENTICATION](state, authenticated) {
        state.authenticated = authenticated
    },
    [SET_LOADING](state, loading) {
        state.loading = loading
    },
    [SET_USERNAME](state, username) {
        state.username = username
    },
}