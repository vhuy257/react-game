import React, { useRef, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Box,
    useToast,     
    FormControl,
    Stack,
    Select,
    FormLabel,
    Input,
    Heading,    
    Flex,  
} from '@chakra-ui/react';

import { createTask } from '../../service/TasksService';
import { createTaskAction } from '../../store/actions';
import DateTimePicker from 'react-datetime-picker';
import { FaRegCalendarAlt } from 'react-icons/fa';
import './react-datetime-picker.css';
import shortid from 'shortid';
import {
    TypeTask,
    optionsAssignee,
    optionPrioprity
} from '../../constants/config';

const CreateTask = ({dispatch}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [taskDate, onChange] = useState(new Date());
    const [assign, setAssign] = useState('2');
    const [prioprity, setPrioprity] = useState('high');
    const titleRef = useRef(null);    
    const [isInvalid, setIsInvalid] = useState(false);
    const toast = useToast();

    const addTask = async () => {
        try {            
            const task = {
                id: shortid(),
                name: titleRef.current.value,
                date: taskDate.toISOString(),
                assign: assign,
                prioprity: prioprity,
                type: TypeTask.TO_DO
            };
            
            if(titleRef.current.value === '') {
                setIsInvalid(true);
                return null;
            } 
    
            const resultTask = await createTask(task);
            dispatch(createTaskAction(resultTask));
    
            if(resultTask) {
                titleRef.current.value = '';
                setAssign('2');
                setIsInvalid(false);
                toast({
                    title: 'Item created.',
                    position: 'bottom-right',
                    status: 'success',
                    duration: 3000,
                    render: () => (
                        <Box color='black' rounded='md' p='5' shadow="md" borderLeftWidth='4px' borderLeftStyle="solid" borderLeftColor="green.400" bg='green.200'>
                          We've created your task
                        </Box>
                    ),
                });                
                onClose();
            }
        } catch (error) {
            toast({
                title: 'Error!',
                position: 'bottom-right',
                description: `${error} . Please create again!!`,
                status: 'error',
                duration: 2000,
                isClosable: true,
                render: () => (
                    <Box color='black' rounded='md' p='5' shadow="md" borderLeftWidth='4px' borderLeftStyle="solid" borderLeftColor="red.400" bg='white'>
                      ${error}
                    </Box>
                ),
            });
        }
    }

    const renderTaskForm = () => {        
        return (
            <Box bg='white'>
                    <Box bg='white'>
                        <FormControl isInvalid={isInvalid}>
                            <FormLabel htmlFor='task-title'>Title</FormLabel>
                            <Input ref={titleRef} id='task-title' className='task-title'/>                       
                        </FormControl>
                    </Box>
                    <Box mt='4'>
                        <FormLabel htmlFor='task-assignee'>Assignee</FormLabel>
                        <Select size='md' value={assign} onChange={(e) => {setAssign(e.target.value)}}>
                            {optionsAssignee.map((option, key) => (
                                <option value={option.value} key={key}>{option.label}</option>
                            ))}
                        </Select>
                    </Box>
                    <Box mt='4' mb='4'>
                        <FormLabel htmlFor='album-date'>Time</FormLabel>
                        <DateTimePicker 
                            disableClock={true} 
                            clearIcon={null} 
                            onChange={onChange} 
                            value={taskDate} 
                            calendarIcon={<FaRegCalendarAlt/>} 
                            format='dd/MM/y'
                        />
                    </Box>
                    <Box mt='4'>
                        <FormLabel htmlFor='task-priority'>Priority</FormLabel>
                        <Stack spacing={3}>
                            <Select size='md' value={prioprity} onChange={(e) => {setPrioprity(e.target.value)}}>
                                {optionPrioprity.map((option, key) => (
                                    <option value={option.value} key={key}>{option.label}</option>
                                ))}
                            </Select>
                        </Stack>
                    </Box>
            </Box>
        );
    }

    return (
        <>
            <Flex alignItems='center' p='5' borderBottom borderColor='gray.200' bg='white'>
                <Heading size={'md'} color="gray.500">Tasks</Heading>
                <Button onClick={onOpen} size='sm' color='purple.500' rounded={'md'} variant='outline' borderColor={'purple.500'} ml='5'>Add New Task</Button>
            </Flex>   
            <Modal isCentered motionPreset='slideInBottom' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Create new task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                        {renderTaskForm()}
                </ModalBody>
                <ModalFooter>
                    <Button rounded={'md'} size='sm' variant='filled' borderColor={'purple.500'} color='purple.500' mr={3} onClick={(e) => {addTask()}}>Add new task</Button>
                    <Button variant='ghost' onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreateTask;