import { useState, useEffect } from "react";
import Box from "../components/Box";
import Text from "../components/Text";
import Center from "../components/Center";
import Button from "../components/Button";
import Input from "../components/Input";
import { ActivityIndicator, Alert } from "react-native";
import color from "../utility/Color"
import Screens from "../utility/Routes";
import api from "../utility/fetcher";
import Storage from "../utility/Storage";
import { isAuthenticated } from "../utility/db";

import { NavigationProp, ParamListBase } from '@react-navigation/native';

type LoginScreenProps = {
    navigation: NavigationProp<ParamListBase>;
  };

export default function LoginScreen({ navigation } : LoginScreenProps) {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      if (await isAuthenticated()) {
        navigation.navigate(Screens.HOME)
      }
    })()
  }, [])

  const onSignin = async () => {
    try {

      if (email && password) {
        setLoading(true)
        // console.log(email, password);
        const { data } = await api.post('/login', { email, password })

        // console.log(data)

        if (data.success) {
          setLoading(false);
          Storage.save('token', data.token, Storage.DEFAULT);
          navigation.navigate(Screens.HOME);
        } else {
            Alert.alert('Login Attempt Failed' , 'Invalid Email or Password')
            setLoading(false);
        }
        
    } else {
          Alert.alert('Login Attempt Failed' , 'Invalid Email or Password')
          setLoading(false);
        }
    } catch (error) {
        if(error instanceof Error) {
          Alert.alert('Login Attempt Failed' , error.message)
          setLoading(false);
        }
    }

  }


  return (
    <Center flex bg={color.white}>
      <Box p={6} w={"80%"} mb={20}>
        <Text fontSize={28} fontWeight={"bold"} ml={8} color={color.blue}>
          Login to Continue
        </Text>
      </Box>
      <Box p={6} w={"80%"} mt={10}>
        <Text mb={8} color={color.gray}>
          Email{" "}
        </Text>
        <Input
          placeholder={"Enter Email"}
          rounded={3}
          p={8}
          variant="outline"
          variantcolor={color.white}
          onChangeText={setEmail}
        />
      </Box>
      <Box p={6} w={"80%"} mt={10}>
        <Text mb={8} color={color.gray}>
          Password{" "}
        </Text>
        <Input
          placeholder={"Enter Password"}
          rounded={3}
          p={8}
          variant="outline"
          variantcolor={color.white}
          onChangeText={setPassword}
        />
      </Box>
      <Center p={6} w={"80%"} mt={10}>
        {loading ? <ActivityIndicator /> : <Button
          
          style={{
            backgroundColor: color.blue,
            padding: 8,
            borderRadius: 4,
            width: "60%",
          }}
          txtStyle={{
            textAlign: "center",
          }}
          color={"white"}
          onPress={onSignin}
        >
          Login
        </Button>}

      </Center>
    </Center>
  );
}
