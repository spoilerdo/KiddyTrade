import {combineReducers} from 'redux';
import ItemsReducer from './items';
import ActiveItem from './active_item';

const rootReducer = combineReducers({
    items: ItemsReducer,
    activeItem: ActiveItem
});

export default rootReducer;