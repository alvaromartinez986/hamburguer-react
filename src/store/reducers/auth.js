import * as actionTypes from '../actions/actionTypes';

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: false,
    authRedirectPath: '/'
}

const authStart = (state) => {
    return {
        ...state,
        error: null,
        loading: true,
    }
}


const authSuccess = (state, payload) => {
    return {
        ...state,
        token: payload.token,
        userId: payload.userId,
        error: null,
        loading: false
    }
}

const authFailed = (state, payload) => {
    console.log(payload);

    return {
        ...state,
        error: payload,
        loading: false
    }
}

const authLogout = (state, action) => {
    return {
        ...state,
        token: null,
        userId: null
    }
}

const setAuthRedirectPath = (state, path) => {
    return {
        ...state,
        authRedirectPath: path
    }
}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return authStart(state);
        case actionTypes.AUTH_SUCCESS:
            return authSuccess(state, action.data);
        case actionTypes.AUTH_FAILED:
            return authFailed(state, action.error);
        case actionTypes.AUTH_LOGOUT:
            return authLogout(state, action);
        case actionTypes.SET_AUTH_REDIRECT_PATH:
            return setAuthRedirectPath(state, action.path);
        default:
            return state
    }
}

export default reducer;
