import _ from 'lodash';
import { apiCall } from '../services/api';

import { MARKETSERVER, OFFER, ACCOUNT, ACCEPT_OFFER, GET_BUY_TOKENS } from './utils/types';

//Actions
export const buyOffer = (buyData) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('post', `${MARKETSERVER}${OFFER}/accept`, buyData)
                .then(() => {                    
                    dispatch({
                        type: ACCEPT_OFFER,
                    })
    
                    resolve();
                })
                .catch(e => { reject(); });
        });
    }
}

export const getBuyTokens = (accountId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get', `${MARKETSERVER}${ACCOUNT}/tokens/${accountId}`)
                .then((req) => {
                    console.log(req);

                    dispatch({
                        type: GET_BUY_TOKENS,
                        payload: req,
                    })

                    resolve();
                })
                .catch(e => { reject(); });
        });
    }
}

//Reducers
export default (state = 0, action) => {
    switch(action.type){
        case GET_BUY_TOKENS:
            return action.payload;
        case ACCEPT_OFFER:
            return state - 1;
        default:
            return state;

    }
}