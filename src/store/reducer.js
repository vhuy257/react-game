import { Menu } from "../constants/config";
import { 
    LOAD_ALL_GAME,
    ACTIVE_MENU_ITEM,
    LOAD_CURRENT_JACKPOT
 } from "./actions";

export const initialState = {
    ListMenu: Menu,
    searchKeyword: 'new',
    dataGames: [],
}

export default function reducer(state, action) {
    switch (action.type) {
        case LOAD_ALL_GAME: 
            return {
                ...state,
                dataGames: [...action.payload],
                temptDataGames: [...action.payload]
            }
        case ACTIVE_MENU_ITEM:
            const index = state.ListMenu.findIndex(item => item === action.payload);
            state.ListMenu.map(item => item.active = false);
            state.ListMenu[index].active = true;
            return { 
                ...state,
                searchKeyword: action.payload.id
            }
        case LOAD_CURRENT_JACKPOT:
            state.dataGames.map((item) => {
                action.payload.map((item2) => {
                    if(item2.game === item.id) {
                        item.amount = item2.amount;
                    }
                })
            });
            return {
                ...state
            }
        default:
            return state;
    }
}