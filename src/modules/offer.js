import _ from 'lodash';
import { apiCall } from '../services/api';

import { MARKETSERVER, GET_ALL_OFFERS, GET_OFFER, OFFER, ACCEPT_OFFER } from './utils/types';

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

//Reducers
const DEFAULT_STATE = {
    offers: {},
    items: {},
}

export default (state = DEFAULT_STATE, action) => {
    switch (action.type){
        case GET_ALL_OFFERS:
            return {
                offers: _.extend({}, state.offers, action.payload),
                items: state.items,
            };
        case GET_OFFER:
            const offer = action.payload.offer;
            const item = action.payload.item;
            return {
                offers: _.extend({}, state.offers, { [offer.offerId]:offer }),
                items: _.extend({}, state.items, {[offer.itemId]:item }),
            };      
        case ACCEPT_OFFER:
            const soldOffer = action.payload.offer;
            return {
                offers: _.filter(state, offer => offer.offerId !== soldOffer.offerId),
                items: state.items,
            };
        default:
            return state;
    }
}