import { Box, PBox, Center, Text } from "rn-faiez-components";
import color from "../../utils/color";
import { ScrollView, Image } from "react-native";

const temp_uri = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.pinimg.com%2Foriginals%2F4e%2F4e%2F26%2F4e4e26cae6106d9c7dd6333083599553.png&f=1&nofb=1&ipt=00c03123a305e97293beae4f4d479497afee54f3dcd4ae581b780e080b28f4f0&ipo=images";

export default function VideosTab() {
    return <Box flex={1} bg={'#eee'} >
        <Center mb={5} bg={color.blue}>
            <Center p={12} mb={20} w={"100%"}>
                <Text fontWeight={400} color={color.white} fontSize={22}>
                    Video Learning
                </Text>
            </Center>
            <Box w={'100%'} flexDirection={'row'} >

                <Box
                    bg={'rgba(255,255,255,1)'}
                    // bg={'rgba(255,255,255,0.5)'}
                    p={6}
                    rounded={6}
                    m={4}
                    style={{
                        borderWidth : 1,
                        borderColor : color.white
                    }}
                >
                    <Text fontWeight={'bold'} color={color.blue} >
                        All Videos
                    </Text>
                </Box>
                <Box
                    // bg={'rgba(255,255,255,1)'}
                    bg={'rgba(255,255,255,0.7)'}
                    p={6}
                    rounded={6}
                    m={4}
                    style={{
                        borderWidth : 1,
                        borderColor : color.white
                    }}
                >
                    <Text fontWeight={'bold'} color={color.blue} >
                        Live Videos
                    </Text>
                </Box>

            </Box>
        </Center>
        <ScrollView>
            {[1,2,3,4,5,1,2,3,4,5,6].map(i => <Classes /> )}
        </ScrollView>
    </Box>
}


const Classes = () =>{
    return       <Box bg={color.white} m={4} e={2} flexDirection={'row'} alignItems={'center'} >
    <Box p={6}>
        <Image source={{ uri: temp_uri }}
            style={{
                width: 100,
                height: 100,
                borderRadius: 8
            }}
        />
    </Box>
    <Box w={'80%'} >
        <Text color={color.blue} >Online Learning</Text>
        <Text w={'90%'} fontSize={16} mt={5} mb={5} style={{ whiteSpace: "pre-line" }}>Online Session on English Workbook board A</Text>
        <Text w={'30%'} style={{ textAlign : 'center'}} bg={'red'}  rounded={8} p={6} color={color.white}  >live session</Text>
    </Box>

</Box>
}