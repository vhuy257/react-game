import {
    Box,
    Flex,
    Heading,
    List,
    ListItem,
    Text,
    useToast
} from '@chakra-ui/react';
import {
    TypeTask,
    optionsAssignee,
    optionPrioprity
} from '../../constants/config';
import { updateTypeTask } from '../../service/TasksService';
import { updateTaskTypeAction } from '../../store/actions';
import Moment from 'react-moment';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import styles from './ListTask.module.scss';
import { BsThreeDots, BsArrowUpCircle, BsClock } from 'react-icons/bs';

const ListTask = ({dispatch, listTask}) => {
    const toast = useToast();
    const renderDate = (date) => {
        return (
            <Flex alignItems={'center'} mt='5'>
                <BsClock /> 
                <Text ml='2' fontWeight={'bold'}>
                    <Moment format="DD MMM">
                        {date}
                    </Moment>
                </Text>
            </Flex>
        )
    }

    const renderColorPrioprity = (type) => {
        switch (type) {
            case 'high':
                return 'red.500'
            case 'medium':
                return 'orange.500'
            case 'low':
                return 'green.500'
            default: break;
        }
    }

    const renderPrioprity = (prioprity, date) => {
        const assignPri =  optionPrioprity.find((item) => item.value === prioprity);
        
        return (
            <Flex alignItems={'center'}>
                <Box mr='2'>{renderDate(date)}</Box>
                <Box mt="5" color={renderColorPrioprity(assignPri.value)}>
                    <BsArrowUpCircle />
                </Box>
            </Flex>
        )
    }

    const renderAssignee = (assign) => {
        const assignItem =  optionsAssignee.find((item) => item.value === assign);
        return (
            <Flex mt="5" size='md' color='white'>
                <Flex alignItems={'center'} justify={'center'}  rounded={'full'} bg='tomato' w="30px"  h="30px" textAlign="center" fontWeight={'bold'} fontSize='xs'>
                    <Text>{assignItem.label.substring(0, 2)}</Text>
                </Flex>
            </Flex>
        )
    }

    const renderList = (typeTask) => {
        return listTask.map((item, key) =>  {
            return item.type === typeTask && (
                <Draggable key={item.id} draggableId={item.id} index={key}>
                    {(provided, snapshot) => ( 
                        <ListItem 
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        bg="white" rounded={'md'} shadow='md' p="6" mt="5">
                            <Flex alignItems={'center'} justify='space-between'>
                                <Text fontWeight={'bold'} color="blackAlpha.700">{item.name}</Text> <BsThreeDots/>
                            </Flex>
                            <Flex alignItems={'center'} justify='space-between'>
                                {renderAssignee(item.assign)}
                                {renderPrioprity(item.prioprity, item.date)}
                            </Flex>
                        </ListItem>
                    )}
                </Draggable>
            )
        })
    }

    const updateTask = async(id, typeTask) => {
        try {
            await updateTypeTask(id, typeTask);
            dispatch(updateTaskTypeAction(id, typeTask));
            toast({
                title: 'Item updated.',
                position: 'bottom-right',
                description: "We've updated your task",
                status: 'success',
                duration: 3000,
            });   
        } catch (error) {
            toast({
                title: 'Error!',
                position: 'bottom-right',
                description: `${error}`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });   
        }
    }

    const onDragEnd = (result) => {
        if(result.destination) {
            const id       = result.draggableId;
            const typeTask = result.destination.droppableId;
            updateTask(id, typeTask);
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box bg="white" borderTopWidth='1px' borderTopStyle='solid' borderTopColor='gray.200' p='2'>
                <Flex gap='2'>
                    <Droppable droppableId={TypeTask.TO_DO}>   
                        {(provided, snapshot) => (
                            <Box bg='gray.200' className={styles.boxWidth} borderRadius="2" p='5'>
                                <Heading size="xs" color="gray.500">To Do</Heading>
                                <List {...provided.droppableProps} ref={provided.innerRef} minHeight="100%">
                                    {renderList(TypeTask.TO_DO)}
                                    <Box display="none">{provided.placeholder}</Box>
                                </List>
                            </Box>
                        )}
                    </Droppable>
                    <Droppable droppableId={TypeTask.ON_HOLD}>   
                        {(provided, snapshot) => (
                            <Box bg='gray.200' className={styles.boxWidth} borderRadius="2" p='5'>
                                <Heading size="xs" color="gray.500">On Hold</Heading>
                                <List {...provided.droppableProps} ref={provided.innerRef} minHeight="100%">
                                    {renderList(TypeTask.ON_HOLD)}
                                    <Box display="none">{provided.placeholder}</Box>
                                </List>
                            </Box>
                        )}
                    </Droppable>
                    <Droppable droppableId={TypeTask.IN_PROGRESS}>   
                        {(provided, snapshot) => (
                            <Box bg='gray.200' className={styles.boxWidth} borderRadius="2" p='5'>
                                <Heading size="xs" color="gray.500">In Progress</Heading>
                                <List {...provided.droppableProps} ref={provided.innerRef} minHeight="100%">
                                    {renderList(TypeTask.IN_PROGRESS)}
                                    <Box display="none">{provided.placeholder}</Box>
                                </List>
                            </Box>
                        )}
                    </Droppable>
                    <Droppable droppableId={TypeTask.DONE}>   
                        {(provided, snapshot) => (
                            <Box bg='gray.200' className={styles.boxWidth} borderRadius="2" p='5'>
                                <Heading size="xs" color="gray.500">Done</Heading>
                                <List {...provided.droppableProps} ref={provided.innerRef} minHeight="100%">
                                    {renderList(TypeTask.DONE)}
                                    <Box display="none">{provided.placeholder}</Box>
                                </List>
                            </Box>
                        )}
                    </Droppable>
                </Flex>
            </Box>
        </DragDropContext>
    )
}

export default ListTask;