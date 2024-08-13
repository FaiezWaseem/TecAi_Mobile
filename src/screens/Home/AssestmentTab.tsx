import * as React from 'react';

import { ScrollView, Image, ActivityIndicator } from "react-native";

import color from "../../utility/Color";
import Box from '../../components/Box';
import Center from '../../components/Center';
import Text from '../../components/Text';

import { getHomework } from '../../utility/db';
export default function AssestmentTab() {
    const tabSection = ["Homework", 'Assestment'];
    const [homework, setHomework] = React.useState([])
 
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        getHomework().then(res => {
setLoading(true)
            if (res.success) {
                console.log(res.homeworks)
                setHomework(res.homeworks)
                setLoading(false)
            }
        })
    }, []);
    return (
        <Box flex bg={color.white}>
            {loading? <ActivityIndicator size="large" color={color.blue} /> :  <ScrollView>
            <Center mb={5} bg={color.blue}>
                <Center p={12} mb={20} w={"100%"}>
                    <Text fontWeight={"400"} color={color.white} fontSize={22}>
                        My Work
                    </Text>
                </Center>
                <Box w={'100%'} flexDirection={'row'} alignItems={"center"} justifyContent={"center"} mb={10}>
                </Box>
            </Center>

            <Box p={6} ml={8}>

                <Text fontSize={22} fontWeight={"bold"} ml={8} mb={10} color={color.blue}>
                    Daily Homework
                </Text>

                {homework.length>0 && homework.map((homework : any) => (
                    <Box p={6} e={2} m={8} bg={color.white} rounded={3} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} >
                        {/* <FontAwesome5 name="book-open" size={24} color={color.dark} /> */}
                        <Box ml={10} w={'90%'} >

                            <Box flexDirection={"row"}>
                                <Text color={color.dark} fontSize={18} fontWeight={"bold"}>
                                    {homework?.content}
                                </Text>
                            </Box>
                            <Image source={{ uri: `https://gya.tec.edu.pk/api/student/preview/file/download/${homework?.id}` }} style={{height: 300 }} resizeMode="contain"/>

                            <Box flexDirection={"row"} mt={10}>
                                <Box flexDirection={"row"} w={"50%"}>
                                    <Text color={color.gray} fontWeight={"bold"}>Date</Text>
                                </Box>
                                <Box flexDirection={"row"}>
                                    <Text color={color.gray} fontWeight={"bold"}>
                                        {homework?.date}
                                    </Text>
                                </Box>
                            </Box>
                        </Box>

                    </Box>
                ))}


            </Box>
            </ScrollView> }
          
        </Box>
    )
}
