import Center from "../components/Center"
import Button from "../components/Button"
import { height } from "../utility/DptoPixels"
import { Image, ImageBackground } from "react-native";
import  color from '../utility/Color'
import Routes from "../utility/Routes";

const bgImage = require('../assets//background2.png');
const logo = require('../assets/logo.png');

export default function SplashScreen({ navigation }: { navigation: any }) {
  return (
      <ImageBackground source={bgImage} style={{
          flex: 1,
          backgroundColor: color.white,
      }}>
          <Center mt={height('5')}>
              <Image source={logo}
                  style={{ width: 200, height: 200 }} alt="Logo" />
          </Center>
          <Center p={6} w={"100%"} mt={10} position={'absolute'} bottom={height('10%')} >
              <Button
                  style={{
                      backgroundColor: color.blue,
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
                  onPress={() => navigation.replace(Routes.LOGIN)}
              >
                  Login
              </Button>
          </Center>
      </ImageBackground>
  )
}