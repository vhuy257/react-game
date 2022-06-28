import { React, useReducer } from 'react';
import CreateTask from '../CreateTask/CreateTask';
import { AppContext } from '../../store/appContext';
import reducer, { initialState } from '../../store/reducer';

const AppContainer = () => {
    const [{listTask}, dispatch] = useReducer(reducer, initialState);  

    return (
        <AppContext.Provider
            value={{
                listTask,
                dispatch
            }}
        >
           <CreateTask dispatch={dispatch}/>
        </AppContext.Provider>
    )
}

export default AppContainer;