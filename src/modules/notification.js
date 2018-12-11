import _ from 'lodash';
import { apiCall } from '../services/api';

import { MARKETSERVER, GET_NEW, ACCOUNT } from './types';

//Actions
export const getNewNotifications = (accountId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return new apiCall('get', `${MARKETSERVER}${ACCOUNT}/offers/new/${accountId}`)
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

//Reducers
export default (state = {}, action) => {
    switch (action.type){
        case GET_NEW:
            return action.payload;
        default:
            return state;
    }
}