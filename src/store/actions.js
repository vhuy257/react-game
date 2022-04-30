export const LOAD_ALL_GAME = 'LOAD_ALL_GAME';
export const ACTIVE_MENU_ITEM = 'ACTIVE_MENU_ITEM';
export const LOAD_CURRENT_JACKPOT = 'LOAD_CURRENT_JACKPOT';

export const LoadAllGameAction = (data) => {
    return {
        type: LOAD_ALL_GAME,
        payload: data
    }
}

export const ActiveMenuItemAction = (data) => {
    return {
        type: ACTIVE_MENU_ITEM,
        payload: data
    }
}

export const LoadCurrentJackpots = (data) => {
    return {
        type: LOAD_CURRENT_JACKPOT,
        payload: data,
    }
}