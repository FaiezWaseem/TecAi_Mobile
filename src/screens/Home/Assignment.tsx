import * as React from "react";
import Box from "../../components/Box";
import PBox from "../../components/PBox";
import Text from "../../components/Text";
import color from "../../utility/Color";
// import { FontAwesome5 } from '@expo/vector-icons';

import Storage from "../../utility/Storage"

import Screens from "../../utility/Routes";

const Assignment = ({ navigation, activity } : any) => {
    const GoToAssignment =  async () => {
      const token = await Storage.get('token') || null
      navigation.navigate(Screens.ASSIGNMENT, { id: activity.id , token })
    }
    return (
      <PBox onPress={GoToAssignment} p={6} e={2} m={8} bg={color.white} rounded={3} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} >
        {/* <FontAwesome5 name="book-open" size={24} color={color.dark} /> */}
        <Box ml={10} w={'90%'} >
          <Box flexDirection={"row"}>
            <Text color={color.blue} fontSize={12} fontWeight={"bold"}>
              English
            </Text>
          </Box>
          <Box flexDirection={"row"}>
            <Text color={color.dark} fontSize={18} fontWeight={"bold"}>
              {activity.title}
            </Text>
          </Box>
          <Box flexDirection={"row"}>
            <Box flexDirection={"row"} w={"50%"}>
  
            </Box>
            <Box flexDirection={"row"}>
              <Text color={color.gray} fontWeight={"bold"}>
                {activity.deadline}
              </Text>
            </Box>
          </Box>
        </Box>
  
      </PBox>
    );
  };


  export default Assignment