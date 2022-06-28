export const LOAD_ALL_TASK = 'LOAD_ALL_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const LOAD_CURRENT_JACKPOT = 'LOAD_CURRENT_JACKPOT';

export const LoadAllTaskAction = (payload) => {
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
