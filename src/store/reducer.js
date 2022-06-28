import { 
    LOAD_ALL_TASK,
    CREATE_TASK
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
        default:
            return state;
    }
}