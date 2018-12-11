import _ from 'lodash';
import { apiCall } from '../services/api';

import { MARKETSERVER, GET_ALL_OFFERS, GET_OFFER, OFFER, GET_ACCOUNT_OFFERS, ACCOUNT } from './types';

//Actions
export const getOffers = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get', `${MARKETSERVER}${OFFER}/all`)
                .then((req) => {
                    dispatch({
                        type: GET_ALL_OFFERS,
                        payload: req,
                    })

                    resolve();
                })
                .catch(e => { reject(); });
        });
    }
}

export const getOffer = (offerId) => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            return apiCall('get', `${MARKETSERVER}${OFFER}/${offerId}`)
                .then((req) => {
                    dispatch({
                        type: GET_OFFER,
                        payload: req,
                    })

                    resolve();
                })
                .catch(e => { reject(); });
        });
    }
}

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

//Reducers
const DEFAULT_STATE = {
    ownedOffers: {},
    offers: {},
    items: {},
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case GET_ALL_OFFERS:
            return {
                ownedOffers: state.ownedOffers,
                offers: _.extend({}, state.offers, _.mapKeys(action.payload, "offerId")),
                items: state.items,
            };
        case GET_OFFER:
            const offer = action.payload.offer;
            const item = action.payload.item;
            return {
                ownedOffers: state.ownedOffers,
                offers: _.extend({}, state.offers, { [offer.offerId]:offer }),
                items: _.extend({}, state.items, {[offer.itemId]:item }),
            };
        case GET_ACCOUNT_OFFERS:
            const offers = action.payload;
            return {
                ownedOffers: _.extend({}, state.ownedOffers, _.mapKeys(offers, "offerId")),
                offers: state.offers,
                items: state.items,
            };
        default:
            return state;
    }
}