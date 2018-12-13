import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './auth';
import offerReducer from './offer';
import inventoryReducer from './inventory';
import notificationReducer from './notification';

const rootReducer = combineReducers({
    auth: authReducer,
    offers: offerReducer,
    inventory: inventoryReducer,
    notifications: notificationReducer,
});

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;