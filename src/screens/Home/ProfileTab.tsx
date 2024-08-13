import * as React from "react";
import Box from "../../components/Box";
import Text from "../../components/Text";
import Button from "../../components/Button";
import Center from "../../components/Center";
import color from "../../utility/Color";
import { getMe, clearSession } from "../../utility/db";
import Screens from "../../utility/Routes";


export default function ProfileTab({ extraData }: { extraData: { replace: (screen: string) => void } }) {
    const [student, setStudent] = React.useState({
        name: '',
        father_name: '',
        class: ''
    });
    React.useEffect(() => {
        getMe().then(res => {
            if (res) {
                setStudent(res.user)
            }
        })
    }, []);

    const onLogout = async () => {
       await clearSession();
       extraData.replace(Screens.LOGIN);
    }

    return <Box flex bg={color.white} >
        <Box p={8} pt={15} mb={5} bg={color.blue}>
            <Text color={color.white} fontSize={16} >Name : {student.name}</Text>
            <Text color={color.white} fontSize={16} >Father Name : {student.father_name}</Text>
            <Text color={color.white} fontSize={16} >Class : {student.class}</Text>
            <Box h={1} m={6} mb={10} mt={10} bg={color.white} ></Box>
        </Box>
        <Center>
            <Button style={{
                backgroundColor: 'red',
                padding: 8,
                borderRadius: 8,
                width: "70%",
            }}
                txtStyle={{
                    textAlign: "center",
                    fontWeight: 'bold',
                    fontSize: 18
                }}
                color={"white"}
                onPress={onLogout} >Log Out</Button>
        </Center>
    </Box>
}

