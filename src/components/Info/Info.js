import {
    Flex,
    Box,
    Text,
    Heading,
} from '@chakra-ui/react';
import { toggleMenuBar } from '../../store/actions';
import { IoIosArrowForward, IoMdBriefcase } from 'react-icons/io';
import { AiFillThunderbolt } from 'react-icons/ai';
import { RiUser6Line } from 'react-icons/ri';
import { BsBriefcase } from 'react-icons/bs';
import { MdOutlineShowChart } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';
import { GiHamburgerMenu } from 'react-icons/gi';
import styles from './Info.module.scss';

const Info = ({dispatch}) => {
    const renderBoxInfo = (text, icon, heading) => {
        return (
            <Box bg='white' py='10' px='5' borderWidth='1px' borderStyle='solid' borderColor='gray.300' rounded='md' className={styles.boxInfo}>
                <Flex alignItems='center' justify='space-between' color="gray.500" mb='5'>
                    {text} {icon}
                </Flex>
                {heading}
            </Box>
        )
    }

    return (
        <Box>
            <Box className={styles.headerMobile}>
                    <img src="../images/logo.png" alt="Logo" width={'145px'}/>
                    <Box cursor='pointer' onClick={() => {dispatch(toggleMenuBar())}}><GiHamburgerMenu/></Box>
            </Box>
            <Flex alignItems="center" mt="4">
                <Text fontWeight="bold" color="gray.500">Project</Text>
                <IoIosArrowForward/>
                <Heading fontSize='md' fontWeight="bold">Design System</Heading>
            </Flex>
            <Box>
                <Heading color="gray.600" mt="3">Design System</Heading>
            </Box>
            <Box my='5'>
                <Flex alignItems='center' className={styles.boxDetail}>
                    <Flex alignItems='center' color="green.400" mr='4' mb='4'>
                        <AiFillThunderbolt/> <Text ml='2'>Active Project</Text>
                    </Flex>
                    <Flex alignItems='center' mr='4'mb='4'>
                        <RiUser6Line/> <Text color="gray.400" ml='2'>4 assignees</Text>
                    </Flex>
                    <Flex alignItems='center' mb='4'>
                        <IoMdBriefcase/> <Text color="gray.400" ml='2'> Budget: 32 hours</Text>
                    </Flex>
                </Flex>
            </Box>
            <Flex my='10' gap='3' className={styles.boxInfoWrapper}>
                {renderBoxInfo((<Text fontWeight="bold" >Total time on Project</Text>), <BsBriefcase/>, (<Heading>03:39<Text as='sup'>h</Text></Heading>))}
                {renderBoxInfo((<Text fontWeight="bold" >Earnings</Text>), <TbReportMoney/>, (<Heading><Text as='sup'>$</Text>2,409.20</Heading>))}
                {renderBoxInfo((<Text fontWeight="bold" >Costs</Text>), <BsBriefcase/>, (<Heading><Text as='sup'>$</Text>1,260.14</Heading>))}
                {renderBoxInfo(
                    (<Text fontWeight="bold"  color="blue.400">Productivity</Text>), 
                    <MdOutlineShowChart/>, 
                    (<Heading>93.57<Text as='sup'>%</Text><Text as='small' fontSize='sm' color="green.400">2.37%</Text></Heading>)
                )}
            </Flex>
        </Box>
    )
}

export default Info;