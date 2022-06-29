import {
    Flex,
    Box,
    Text,
    Heading
} from '@chakra-ui/react';
import { IoIosArrowForward, IoMdBriefcase } from 'react-icons/io';
import { AiFillThunderbolt } from 'react-icons/ai';
import { RiUser6Line } from 'react-icons/ri';
import { BsBriefcase } from 'react-icons/bs';
import { MdOutlineShowChart } from 'react-icons/md';
import { TbReportMoney } from 'react-icons/tb';

const Info = () => {
    const renderBoxInfo = (text, icon, heading) => {
        return (
            <Box bg='white' py='10' px='5' borderWidth='1px' borderStyle='solid' borderColor='gray.300' rounded='md' w='25%'>
                <Flex alignItems='center' justify='space-between' color="gray.500" mb='5'>
                    <Text fontWeight='bold'>{text}</Text>
                    {icon}
                </Flex>
                {heading}
            </Box>
        )
    }

    return (
        <Box mt="10">
            <Flex alignItems="center">
                <Text fontWeight="bold" color="gray.500">Project</Text>
                <IoIosArrowForward/>
                <Heading fontSize='md' fontWeight="bold">Design System</Heading>
            </Flex>
            <Box>
                <Heading color="gray.600">Design System</Heading>
            </Box>
            <Box my='5'>
                <Flex alignItems='center'>
                    <Flex alignItems='center' color="green.400" mr='4'>
                        <AiFillThunderbolt/> <Text ml='2'>Active Project</Text>
                    </Flex>
                    <Flex alignItems='center' mr='4'>
                        <RiUser6Line/> <Text color="gray.400" ml='2'>4 assignees</Text>
                    </Flex>
                    <Flex alignItems='center'>
                        <IoMdBriefcase/> <Text color="gray.400" ml='2'> Budget: 32 hours</Text>
                    </Flex>
                </Flex>
            </Box>
            <Flex my='10' gap='3'>
                {renderBoxInfo('Total time on Project', <BsBriefcase/>, (<Heading>03:39<small>h</small></Heading>))}
                {renderBoxInfo('Earnings', <TbReportMoney/>, (<Heading><Text as='sup'>$</Text>2,409.20</Heading>))}
                {renderBoxInfo('Costs', <BsBriefcase/>, (<Heading><Text as='sup'>$</Text>1,260.14</Heading>))}
                {renderBoxInfo((<Text color="blue.400">Productivity</Text>), <MdOutlineShowChart/>, (<Heading>93.57%<Text as='sup'>%</Text><Text as='small' color="green.400">2.37%</Text></Heading>))}
            </Flex>
        </Box>
    )
}

export default Info;