import {setTokenHeader} from '../services/api';
import { apiCall } from '../services/api';
import jwtDecode from 'jwt-decode';

import {MARKETSERVER, LOGIN, REGISTER, ACCOUNT, LOGOUT } from './utils/types';

//Actions
export const setAuthorizationToken = (token) => {
    setTokenHeader(token);
}

export const unlogin = () => {
    return dispatch => {
        localStorage.clear();
        setAuthorizationToken(false); //clears the axios default headers fot auth
        dispatch({
            type: LOGOUT,
        })
    }
}

export const register = (accountData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `${MARKETSERVER}${ACCOUNT}`, accountData)
                .then((req) => {
                    dispatch({
                        type: REGISTER,
                        payload: req,
                    })
                    resolve();
                })
                .catch(e => {reject();})
        });
    }
}

export const unregister = (accountId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('delete', `${MARKETSERVER}${ACCOUNT}/${accountId}`)
                .then(() => {
                    this.logout();
                    resolve();
                })
                .catch(e => {reject();});
        });
    }
}

export const login = (userData) => {
    return dispatch => {
        //wrap the thunk in a promise so we can wait for the API call
        return new Promise((resolve, reject) => {
            return apiCall('post', `${MARKETSERVER}/login`, userData)
                .then((req) => {
                    localStorage.setItem('jwtToken', req.token);
                    setAuthorizationToken(req.token);

                    dispatch({
                        type: LOGIN,
                        payload: userData.username
                    })
                    resolve(); //API call succeeded
                })
                .catch(e => { reject(); })
        });
    }
}

//Reducers
const DEFAULT_STATE = {
    isAuthenticated: false,
    user: "",
    userId: "",
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case LOGIN:
            return {
                isAuthenticated: !!Object.keys(action.payload).length,
                user: action.payload,
                userId: jwtDecode(localStorage.jwtToken)["userID"],
            };
        case LOGOUT:
            console.log("change default state");
            return {
                isAuthenticated: false,
                user: "",
                userId: "",
            }
        default:
            return state;
    }
}