// project imports
import config from '../config';

// action - state management
import * as actionTypes from './types';

export const initialState = {
    isOpen: [],
    locale: config.i18n
};

//-----------------------|| CUSTOMIZATION REDUCER ||-----------------------//

const customizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.MENU_OPEN:
            const id = action.id;
            return {
                ...state,
                isOpen: [id]
            };

        case actionTypes.THEME_LOCALE:
            return {
                ...state,
                locale: action.locale
            };
        
        default:
            return state;
    }
};

export default customizationReducer;
