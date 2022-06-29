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

const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    border: isDragging ? '2px solid tomato' : 'none',
    background: isDragging ? "#f3f3f3" : "white",
    ...draggableStyle
});

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
                        style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                        )}
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

    const renderBoxDrop = (typeTask, title) => {
        return (
            <Droppable droppableId={typeTask}>   
                {(provided, snapshot) => (
                    <Box bg='gray.200' className={styles.boxWidth} borderRadius="2" p='5'>
                        <Heading size="xs" color="gray.500">{title}</Heading>
                        <List {...provided.droppableProps} ref={provided.innerRef} minHeight="100%">
                            {renderList(typeTask)}
                            <Box display="none">{provided.placeholder}</Box>
                        </List>
                    </Box>
                )}
            </Droppable>
        )
    }

    const updateTask = async(id, typeTask) => {
        try {
            await updateTypeTask(id, typeTask);
            dispatch(updateTaskTypeAction(id, typeTask));
            toast({
                title: 'Item updated.',
                position: 'bottom-right',
                status: 'success',
                duration: 3000,
                render: () => (
                    <Box color='black' rounded='md' p='5' shadow="md" borderLeftWidth='4px' borderLeftStyle="solid" borderLeftColor="green.400" bg='white'>
                      We've updated your task
                    </Box>
                ),
            });   
        } catch (error) {
            toast({
                title: 'Error!',
                position: 'bottom-right',
                status: 'error',
                duration: 2000,
                render: () => (
                    <Box color='black' rounded='md' p='5' shadow="md" borderLeftWidth='4px' borderLeftStyle="solid" borderLeftColor="red.400" bg='white'>
                      ${error}
                    </Box>
                ),
                isClosable: true,
            });   
        }
    }

    const onDragEnd = (result) => {        
        if(result.destination) {
            if(result.destination.droppableId === result.source.droppableId) {
                return false;
            }
            const id       = result.draggableId;
            const typeTask = result.destination.droppableId;
            updateTask(id, typeTask);
        }
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Box bg="white" borderTopWidth='1px' borderTopStyle='solid' borderTopColor='gray.200' p='2'>
                <Flex gap='2' className={styles.boxWrapper}>
                    {renderBoxDrop(TypeTask.TO_DO, 'To Do')}
                    {renderBoxDrop(TypeTask.ON_HOLD, 'On Hold')}
                    {renderBoxDrop(TypeTask.IN_PROGRESS, 'In Progress')}
                    {renderBoxDrop(TypeTask.DONE, 'Done')}
                </Flex>
            </Box>
        </DragDropContext>
    )
}

export default ListTask;