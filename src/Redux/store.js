import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import commodityReducer from './reducer';
const rootReducer = combineReducers({
  commodityReducer,
});
export const store = createStore(rootReducer, applyMiddleware(thunk));