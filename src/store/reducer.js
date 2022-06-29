import { 
    LOAD_ALL_TASK,
    CREATE_TASK,
    UPDATE_TYPE_TASK
 } from "./actions";

export const initialState = {
    listTask: []
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
        default:
            return state;
    }
}