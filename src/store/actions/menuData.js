import { MENU_DATA, SET_MESSAGE } from "store/types";
import MenuService from "services/menu.service";
  
export const load = () => (dispatch) => {
    return MenuService.load().then(
        (data) => {
            console.debug('menu data loaded')
            dispatch({
                type: MENU_DATA,
                payload: { menuData: data },
            });
    
            return Promise.resolve();
        },
        (error) => {
            console.debug('menu data load error')
            const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
    
            dispatch({
                type: SET_MESSAGE,
                payload: message,
            });
  
            return Promise.reject();
        }
    );
};