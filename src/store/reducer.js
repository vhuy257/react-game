import { 
    LOAD_ALL_TASK,
    CREATE_TASK,
    UPDATE_TYPE_TASK,
    TOGGLE_MENU_BAR
 } from "./actions";

export const initialState = {
    listTask: [],
    showMenuBar: false,
}

export default function reducer(state, action) {
    switch (action.type) {
        case LOAD_ALL_TASK: 
            return {
                ...state,
                listTask: [...action.payload]                
            };
        case CREATE_TASK:
            return { 
                ...state,
                listTask: [...state.listTask, action.payload]
            };
        case UPDATE_TYPE_TASK:
            const id = state.listTask.findIndex((item) => item.id === action.payload.id);
            state.listTask[id].type = action.payload.type
            return {
                ...state
            };
        case TOGGLE_MENU_BAR:
            return {
                ...state,
                showMenuBar: !state.showMenuBar
            };
        default:
            return state;
    }
}