import {
    Box,
    Flex,
    List,
    ListItem,
    ListIcon
} from '@chakra-ui/react';
import { toggleMenuBar } from '../../store/actions';
import { BsReverseLayoutTextWindowReverse, BsClockHistory, BsApp, BsBriefcase } from 'react-icons/bs';
import { AiOutlinePicture, AiOutlineSetting, AiOutlineCalendar } from 'react-icons/ai';
import { SiMicrosoftteams } from 'react-icons/si';
import { TbUsers } from 'react-icons/tb';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './Navigation.module.scss';

const Navigation = ({dispatch, showMenuBar}) => {
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
        <Box className={showMenuBar ? styles.showMobile : ''}>
            <Box width='100%' minW='300px' className={styles.mainNavigation}>
                <Flex alignItems='center' justify='space-between' p='10' borderBottomWidth={'1px'} borderBottomStyle={'solid'} borderBottomColor={'gray.200'}>
                    <img src="../images/logo.png" alt="Logo" width={'145px'}/>
                    <Box className={styles.toggleMenuBar} cursor='pointer' onClick={() => {dispatch(toggleMenuBar())}}><GiHamburgerMenu/></Box>
                </Flex>
                <List>
                    {
                        Menu.map((item, key) => (
                            <ListItem py='5' key={key} px='10' color="gray.500" fontWeight={'bold'} className={item.active? styles.active : '' }>
                                <ListIcon as={item.icon} color='gray.500' mr='5' />  
                                {item.text}
                            </ListItem>
                        ))
                    }
                </List>
            </Box>
        </Box>
    )
}

export default Navigation;