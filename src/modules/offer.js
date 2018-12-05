import _ from 'lodash';

import { apiCall } from '../services/api';
import {MARKETSERVER, GET_ALL_OFFERS, GET_OFFER, OFFER} from './types';

//Actions
export const getOffers = () => {
    return dispatch => {
            return apiCall('get', `${MARKETSERVER}${OFFER}/all`)
                .then((req) => {
                    dispatch({
                        type: GET_ALL_OFFERS,
                        payload: req,
                    })
                })
                .catch(e => {console.log(e);});
    }
}

export const getOffer = (offerId) => {
    return dispatch => {
        return apiCall('get', `${MARKETSERVER}${OFFER}/${offerId}`)
            .then((req) => {
                dispatch({
                    type: GET_OFFER,
                    payload: req,
                })
            })
            .catch(e => {console.log(e);});
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
                offers: _.extend({}, state.offers, _.mapKeys(action.payload, "offerId")),
                items: state.items,
            };
        case GET_OFFER:
            const offer = action.payload.offer;
            const item = action.payload.item;
            console.log(state.items);
            console.log(item);
            return {
                offers: _.extend({}, state.offers, { [offer.offerId]:offer }),
                items: _.extend({}, state.items, {[offer.itemId]:item }),
            };
        default:
            return state;
    }
}