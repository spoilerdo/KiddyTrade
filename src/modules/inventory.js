import _ from 'lodash';
import { apiCall } from '../services/api';

import { MARKETSERVER, INVENTORYSERVER, OFFER, GET_ACCOUNT_OFFERS, ACCOUNT, CREATE_OFFER, INVENTORY, GET_ACCOUNT_ITEMS } from './utils/types';

//Actions
export const getOffersFromAccount = (accountId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get', `${MARKETSERVER}${ACCOUNT}/offers/${accountId}`)
                .then((req) => {
                    console.log(req);

                    dispatch({
                        type: GET_ACCOUNT_OFFERS,
                        payload: req,
                    })

                    resolve();
                })
                .catch(e => { reject(); });
        });
    }
}

export const createOffer = (offer) => {
    console.log(offer);
    return dispatch => {
        return new Promise((resolve, reject) =>{
            return apiCall('post', `${MARKETSERVER}${OFFER}`, offer)
                .then((req) => {
                    dispatch({
                        type: CREATE_OFFER,
                        payload: req,
                    })
                    resolve();
                })
                .catch(e => { reject(); });
        });
    }
}

export const getItemsFromAccount = (accountId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get', `${INVENTORYSERVER}${INVENTORY}/${accountId}`)
                .then((req) => {
                    dispatch({
                        type: GET_ACCOUNT_ITEMS,
                        payload: req,
                    });
                    resolve();
                })
                .catch(e => { reject(); });
        });
    }
}

//Reducers
const DEFAULT_STATE = {
    ownedOffers: {},
    ownedItems: [],
}

export default (state = DEFAULT_STATE, action) => {
    switch(action.type){
        case GET_ACCOUNT_OFFERS:
            const offers = action.payload;
            return {
                ownedOffers: _.extend({}, state.ownedOffers, offers),
                ownedItems: state.ownedItems,
            };
        case CREATE_OFFER:
            const offer = action.payload;
            return {
                ownedOffers: _.extend({}, state.ownedOffers, offer),
                ownedItems: state.ownedItems,
            };
        case GET_ACCOUNT_ITEMS:
            console.log(action.payload);
            return {
                ownedOffers: state.ownedOffers,
                ownedItems: action.payload,
            };
        default:
            return state;
    }
}