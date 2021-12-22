import {combineReducers} from 'redux';

import blockchainReducer from './blockchainReducer';
import modalReducer from './modalReducer';

const rootReducer = combineReducers({
    blockchain: blockchainReducer, 
    modal: modalReducer,
}); 

export default rootReducer;
