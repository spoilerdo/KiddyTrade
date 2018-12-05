import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import authReducer from './auth';
import offerReducer from './offer';

const rootReducer = combineReducers({
    auth: authReducer,
    offersItems: offerReducer,
});

const store = createStore(
    rootReducer,
    compose(
        applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;