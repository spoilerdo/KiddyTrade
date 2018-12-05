import {setTokenHeader} from '../services/api';
import { apiCall } from '../services/api';
import jwt_decode from 'jwt-decode';

import {BANKSERVER, LOGIN, ADMIN} from './types';

//Actions
export const setAuthorizationToken = (token) => {
    setTokenHeader(token);
}

export const logout = () => {
    console.log("LOGOUT");
    localStorage.clear();
    setAuthorizationToken(false); //clears the axios default headers fot auth
}

export const login = (userData) => {
    return dispatch => {
        //wrap the thunk in a promise so we can wait for the API call
        return new Promise((resolve, reject) => {
            return apiCall('post', `${BANKSERVER}/login`, userData)
                .then((req) => {
                    var decoded = jwt_decode(req.token);
                    decoded.scopes.forEach(scope => {
                        if(scope == ADMIN){
                            localStorage.setItem('jwtToken', req.token);
                            setAuthorizationToken(req.token);
                            dispatch({
                                type: LOGIN,
                                payload: userData.username
                            })
                            resolve(); //API call succeeded
                        }
                    });
                })
                .catch(e => {
                    reject(); //fail!
                })
        });
    }
}

//Reducers
const DEFAULT_STATE = {
    isAuthenticated: false,
    user: "",
};

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case LOGIN:
            return {
                isAuthenticated: !!Object.keys(action.payload).length,
                user: action.payload,
            };
        default:
            return state;
    }
}