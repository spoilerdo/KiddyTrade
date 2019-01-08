import _ from 'lodash';
import { apiCall } from '../services/api';

import { MARKETSERVER, GET_NEW, ACCOUNT, OFFER, UPDATE_NEW } from './utils/types';

//Actions
export const getNewNotifications = (accountId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return new apiCall('get', `${MARKETSERVER}${ACCOUNT}${OFFER}/new/${accountId}`)
                .then((req) => {
                    console.log(req);

                    dispatch({
                        type: GET_NEW,
                        payload: req,
                    })

                    resolve();
                })
                .catch(e => { reject(); });
        });
    }
}

export const updateNotification = (accountId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return new apiCall('put', `${MARKETSERVER}${ACCOUNT}${OFFER}/new/${accountId}`)
                .then(() => {
                    dispatch({
                        type: UPDATE_NEW,
                    })
                    resolve();
                })
                .catch(e => { reject(); });
        })
    }
}

//Reducers
export default (state = {}, action) => {
    switch (action.type){
        case GET_NEW:
            return action.payload;
        case UPDATE_NEW:
            return {};
        default:
            return state;
    }
}