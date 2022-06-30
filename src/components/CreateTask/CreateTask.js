import React from 'react';
import {
    Button,   
    Heading,    
    Flex,  
} from '@chakra-ui/react';

import './react-datetime-picker.css';
const CreateTask = ({onOpen}) => {    
    return (
        <>
            <Flex alignItems='center' p='5' borderBottom borderColor='gray.200' bg='white' borderTopLeftRadius='5px' borderTopRightRadius='5px'>
                <Heading size={'md'} color="gray.500">Tasks</Heading>
                <Button onClick={onOpen} size='sm' color='purple.500' rounded={'md'} variant='outline' borderColor={'purple.500'} ml='5'>Add New Task</Button>
            </Flex>   
        </>
    )
}

export default CreateTask;