import { combineReducers } from 'redux';

// reducer import
import customizationReducer from './customizationReducer';
import accountReducer from './accountReducer';
import messageReducer from "./messageReducer"
import menuReducer from './menuReducer';

//-----------------------|| COMBINE REDUCER ||-----------------------//

const reducer = combineReducers({
    customization: customizationReducer,
    account: accountReducer,
    message: messageReducer,
    menuData: menuReducer
});

export default reducer;