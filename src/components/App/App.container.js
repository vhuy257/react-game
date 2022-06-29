import { React, useEffect, useReducer } from 'react';
import { Flex } from '@chakra-ui/react';
import CreateTask from '../CreateTask/CreateTask';
import ListTask from '../ListTask/ListTask';
import Navigation from '../Navigation/Navigation';
import Info from '../Info/Info';
import { getListTask } from '../../service/TasksService';
import { loadAllTaskAction } from '../../store/actions';
import { Box } from '@chakra-ui/react';
import { AppContext } from '../../store/appContext';
import reducer, { initialState } from '../../store/reducer';

const AppContainer = () => {
    const [{listTask}, dispatch] = useReducer(reducer, initialState);  

    useEffect(() => {
        const fetchData = async() => {
            const dataList = await getListTask();
            dispatch(loadAllTaskAction(dataList));
        }
        
        fetchData();
    }, [])

    return (
        <AppContext.Provider
            value={{
                listTask,
                dispatch
            }}
        >
            <Flex gap={'20'} bg='gray.200'>
                <Box w={'20%'} bg='white'>
                    <Navigation />
                </Box>
                <Box w={'100%'} pr='10' mb='50'>
                    <Info />
                    <Box rounded={'md'} shadow="md" >
                        <CreateTask dispatch={dispatch}/>
                        <ListTask   dispatch={dispatch} listTask={listTask}/>
                    </Box>
                </Box>
            </Flex>
        </AppContext.Provider>
    )
}

export default AppContainer;