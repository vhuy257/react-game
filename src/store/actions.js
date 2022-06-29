export const LOAD_ALL_TASK = 'LOAD_ALL_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const UPDATE_TYPE_TASK = 'UPDATE_TYPE_TASK';

export const loadAllTaskAction = (payload) => {
    return {
        type: LOAD_ALL_TASK,
        payload
    }
}

export const createTaskAction = (payload) => {
    return {
        type: CREATE_TASK,
        payload
    }
}

export const updateTaskTypeAction = (id, type) => {
    return {
        type: UPDATE_TYPE_TASK,
        payload: {
            id, 
            type
        }
    }
}