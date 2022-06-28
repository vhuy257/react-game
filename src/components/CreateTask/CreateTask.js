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
  } from '@chakra-ui/react';

import { createTask } from '../../service/TasksService';
import { createTaskAction } from '../../store/actions';
import DateTimePicker from 'react-datetime-picker';
import { FaRegCalendarAlt } from 'react-icons/fa';
import './react-datetime-picker.css';
import shortid from 'shortid';

const CreateTask = ({dispatch}) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [taskDate, onChange] = useState(new Date());
    const [assign, setAssign] = useState('2');
    const titleRef = useRef(null);    
    const optionsAssignee = [
        {value: '1', label: 'Jack'},
        {value: '2', label: 'Chee'},
        {value: '3', label: 'Linda'},
    ]
    const prioprityRef = useRef(null);
    const [isInvalid, setIsInvalid]      = useState(false);
    const toast = useToast();

    const addAlbum = async () => {
        try {            
            const task = {
                id: shortid(),
                name: titleRef.current.value,
                date: taskDate.toISOString(),
                assign: assign,
                prioprity: false,
            };
            
            if(titleRef.current.value === '') {
                setIsInvalid(true);
                return null;
            } 
    
            const resultTask = await createTask(task);
            dispatch(createTaskAction(resultTask));
    
            if(resultTask) {
                titleRef.current.value = '';
                setAssign('');
                setIsInvalid(false);
                toast({
                    title: 'Item created.',
                    description: "We've created your album",
                    status: 'success',
                    duration: 3000,
                });                
            }
        } catch (error) {
            toast({
                title: 'Error!',
                description: `${error} . Please create again!!`,
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
    }

    const renderTaskForm = () => {        
        return (
            <Box bgColor='white'>
                    <Box>
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
                            <Select size='md' ref={prioprityRef}>
                                <option value='1'>High</option>
                                <option value='2'>Medium</option>
                                <option value='3'>Low</option>
                            </Select>
                        </Stack>
                    </Box>
            </Box>
        );
    }

    return (
        <>
            <Button onClick={onOpen}>Create Task</Button>
            <Modal isCentered motionPreset='slideInBottom' isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>Create new task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                        {renderTaskForm()}
                </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={(e) => {addAlbum()}}>Add new task</Button>
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