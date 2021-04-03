import * as actionTypes from './actionTypes';
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}


export const authSucess = (data) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        data: { token: data.idToken, userId: data.localId }
    }
}


export const authFailed = (error) => {
    return {
        type: actionTypes.AUTH_FAILED,
        error: error
    }
}

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout())
        }, expirationTime * 1000)
    }
}

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('userId');
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const auth = (email, password, isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        let url = isSignup ? 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBPf9py63pXR7xcKMNyJsXk2TLWScqjqiI'
            : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBPf9py63pXR7xcKMNyJsXk2TLWScqjqiI';
        axios.post(url, authData)
            .then(response => {
                const expirationDate = new Date(new Date().getTime() + response.data.expiresIn * 1000);
                localStorage.setItem('token', response.data.idToken);
                localStorage.setItem('expirationTime', expirationDate);
                localStorage.setItem('userId', response.data.localId);
                dispatch(authSucess(response.data))
                dispatch(checkAuthTimeout(response.data.expiresIn))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.error.message))
            });
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path,
    }
}


export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        const expirationTime = new Date(localStorage.getItem('expirationTime'));

        if (!token) {
            dispatch(logout());
        } else {
            if (expirationTime <= new Date()) {
                dispatch(logout())
            } else {
                const userId = localStorage.getItem('userId');
                dispatch(authSucess({ idToken: token, userId: userId }));
                dispatch(checkAuthTimeout((expirationTime.getTime() - new Date().getTime()) / 1000));
            }
        }
    };
}