import {
    Box,
    Flex,
    List,
    ListItem,
    ListIcon
} from '@chakra-ui/react';
import { BsReverseLayoutTextWindowReverse, BsClockHistory, BsApp, BsBriefcase } from 'react-icons/bs';
import { AiOutlinePicture, AiOutlineSetting, AiOutlineCalendar } from 'react-icons/ai';
import { SiMicrosoftteams } from 'react-icons/si';
import { TbUsers } from 'react-icons/tb';
import styles from './Navigation.module.scss';

const Navigation = () => {
    const Menu = [
        {text: 'Dashboard', icon: BsReverseLayoutTextWindowReverse},
        {text: 'Real-Time Tracking', icon: BsClockHistory},
        {text: 'Screenshots', icon: AiOutlinePicture},
        {text: 'Employees', icon: TbUsers, active: true},
        {text: 'Projects Tracking', icon: BsBriefcase},
        {text: 'Teams', icon: SiMicrosoftteams},
        {text: 'Time and Attendance', icon: AiOutlineCalendar},
        {text: 'Apps and Websites', icon: BsApp},
        {text: 'Settings', icon: AiOutlineSetting},
    ]

    return(
        <Box width='100%' minW='300px'>
            <Flex alignItems='center' justify='center' p='10' borderBottomWidth={'1px'} borderBottomStyle={'solid'} borderBottomColor={'gray.200'} >
                <img src="../images/logo.png" alt="Logo" width={'145px'}/>
            </Flex>
            <List>
                {
                    Menu.map((item) => (
                        <ListItem py='5' px='10' color="gray.500" fontWeight={'bold'} className={item.active? styles.active : '' }>
                            <ListIcon as={item.icon} color='gray.500' mr='5' />  
                            {item.text}
                        </ListItem>
                    ))
                }
            </List>
        </Box>
    )
}

export default Navigation;