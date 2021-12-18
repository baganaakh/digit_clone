// action - state management
import { MENU_DATA } from './types';

const menuData = JSON.parse(localStorage.getItem("menuData"));

const initialState = { menuData };

const menuReducer = (state = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case MENU_DATA:
            const { menuData } = payload
            return menuData ? 
            {
                ...state,
                menuData
            }
                : 
            { ...state }
        default: {
            return { ...state };
        }
    }
};

export default menuReducer;
