import { React, useEffect, useReducer } from 'react';
import { 
    Flex,
    useDisclosure, 
} from '@chakra-ui/react';
import CreateTask from '../CreateTask/CreateTask';
import CreateTaskModal from '../CreateTaskModal/CreateTaskModal';
import ListTask from '../ListTask/ListTask';
import Navigation from '../Navigation/Navigation';
import Info from '../Info/Info';
import { getListTask } from '../../service/TasksService';
import { loadAllTaskAction } from '../../store/actions';
import { Box } from '@chakra-ui/react';
import { AppContext } from '../../store/appContext';
import reducer, { initialState } from '../../store/reducer';
import styles from './App.module.scss';

const AppContainer = () => {
    const [{listTask, showMenuBar}, dispatch] = useReducer(reducer, initialState);  
    const {isOpen, onOpen, onClose} = useDisclosure();

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
            <Flex bg='gray.200' className={styles.appContainer}>
                <Box w={'20%'} bg='white'>
                    <Navigation dispatch={dispatch} showMenuBar={showMenuBar}/>
                </Box>
                <Box className={styles.boxRight}>
                    <Info dispatch={dispatch} showMenuBar={showMenuBar}/>
                    <Box rounded={'md'} shadow="md" >
                        <CreateTask onOpen={onOpen}/>
                        <ListTask   onOpen={onOpen} dispatch={dispatch} listTask={listTask}/>
                    </Box>
                </Box>
            <CreateTaskModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} dispatch={dispatch}/>
            </Flex>
        </AppContext.Provider>
    )
}

export default AppContainer;