import * as React from "react";
import Center from "../../components/Center";
import PBox from "../../components/PBox";
import Box from "../../components/Box";
import Text from "../../components/Text";
import { ScrollView, Image, StatusBar, ActivityIndicator } from "react-native";
import color from "../../utility/Color"
// import { Entypo } from '@expo/vector-icons';
// import { Ionicons } from '@expo/vector-icons';
// import { Feather } from "@expo/vector-icons";
import Input from "../../components/Input";
import Assignment from "./Assignment";
import { getMarks, getMe, getMyAssignments, setNotificationToken, getMonthlyAttendance } from "../../utility/db"
// import Course from "../../components/homeTab/Course";
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
import { FontAwesome5 } from '@expo/vector-icons';

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });


const courses = [
  { title: 'Biology', id: 1, link: 'https://tecdigital.live/image41.jpg' },
  { id: 3, title: 'Math', link: 'https://tecdigital.live/image7.jpg' },
  { id: 4, title: 'Chemistry', link: 'https://tecdigital.live/image5.jpg' },
  { title: 'Physics', id: 2, link: 'https://tecdigital.live/image9.jpg' }];


interface Marks {
  title: string
  obtained: number
  total: number

}


export default function HomeTabScreen({ extraData }: any) {

  const [student, setStudent] = React.useState({
    name: ''
  });
  const [activitys, setActivity] = React.useState([]);
  const [marks, setMarks] = React.useState<Marks[]>([]);
  const [loading, setLoading] = React.useState(true);


  const [expoPushToken, setExpoPushToken] = React.useState('');
  const [notification, setNotification] = React.useState(false);
  const notificationListener = React.useRef();
  const responseListener = React.useRef();

  React.useEffect(() => {

    getMe().then(res => {
      setLoading(true)
      if (res) {
        setStudent(res.user)
        setLoading(false)

      }
    })
    getMyAssignments().then(res => {
      setLoading(true)

      if (res.success) {
        setActivity(res.assignments)
        setLoading(false)

        // console.log(res.assignments)
      }
    })
    getMarks().then(res => {
      setLoading(true)

      if (res.status) {
        // console.log("marks"+ res.marks);
        setMarks(res.marks)
        setLoading(false)

      }
    })

    // // token
    // registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    //   setNotification(notification);
    // });

    // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    //   console.log(response);
    // });

    // return () => {
    //   Notifications.removeNotificationSubscription(notificationListener.current);
    //   Notifications.removeNotificationSubscription(responseListener.current);
    // };

  }, []);




  return (
    <Box flex bg={color.white}>
      <StatusBar backgroundColor={color.blue} />
      {loading ? <ActivityIndicator size="large" color={color.blue} /> : <ScrollView>
        <Center mb={5}>
          <Box bg={color.blue} p={12} mb={20} w={"100%"}>
            <Box flexDirection={'row'}>
              <Box w={'75%'}>
                <Text color={color.white} fontSize={12}>
                  Welcome back
                  {/* <Entypo name="thunder-cloud" size={16} color={color.white} /> */}
                </Text>
                <Text fontWeight={"bold"} color={color.white} fontSize={16}>
                  {student.name}
                </Text>

              </Box>
              <Box w={'25%'} flexDirection={'row'} >
                <PBox
                  bg={"rgba(255,255,255,0.5)"}
                  rounded={20}
                  p={6}
                  w={40}
                  h={40}
                  alignItems={'center'}
                  justifyContent={'center'}
                  style={{
                    borderWidth: 1,
                    borderColor: color.white,
                  }}
                >
                  {/* <Ionicons name="notifications-outline" size={24} color={color.white} /> */}
                </PBox>
                <PBox
                  bg={"rgba(255,255,255,0.5)"}
                  rounded={20}

                  ml={4}
                  w={40}
                  h={40}
                  alignItems={'center'}
                  justifyContent={'center'}
                >
                  <Image

                    source={{ uri: 'https://randomuser.me/api/portraits/men/81.jpg' }}
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: 20
                    }}
                  />

                </PBox>
              </Box>
            </Box>
            <Center bg={color.blue}>
              <Box
                bg={"rgba(255,255,255,0.5)"}
                flexDirection={"row"}
                w={"90%"}
                p={8}
                m={10}
                mt={20}
                rounded={8}
                style={{
                  borderWidth: 1,
                  borderColor: color.white,
                }}
              >
                <Box p={6} >
                  {/* <Feather name="search" size={24} color="white" /> */}

                </Box>
                <Input
                  m={18}
                  placeholder={"Search your Courses"}
                  hintColor={color.white}
                  color={color.white}
                />
              </Box>
            </Center>

          </Box>
        </Center>

        {/* <Box p={6} ml={8}>
          <Text fontSize={22} fontWeight={"bold"} ml={8} color={color.blue}>
            Courses
          </Text>
        </Box> */}
        <Box
          flexDirection={"row"}
          style={{ flexWrap: "wrap" }}
          justifyContent={"center"}
        >
          {/* {courses.map((course, i) => (
            <Course
              course={course}
              navigation={extraData}
              title={course.title}
              icon={{ uri: course.link }}
            />
          ))} */}
        </Box>
        <Box p={6} ml={8} flexDirection={"row"}>
          <Text fontSize={22} fontWeight={"bold"} ml={8} color={color.blue}>
            Assignments Today
          </Text>
          <Box
            bg={"red"}
            alignItems={"center"}
            rounded={8}
            ml={6}
            p={6}
            h={"100%"}
          >
            <Text color={color.white}>{activitys.length}</Text>
          </Box>
        </Box>
        {activitys.map(activity => <Assignment activity={activity} navigation={extraData} />)}
        <Box p={6} ml={8} flexDirection={"row"}>
          <Text fontSize={22} fontWeight={"bold"} ml={8} color={color.blue}>
            Graded Assignments
          </Text>
          <Box
            bg={"red"}
            alignItems={"center"}
            rounded={8}
            ml={6}
            p={6}
            h={"100%"}
          >
            <Text color={color.white}>{marks?.length}</Text>
          </Box>
        </Box>
        {marks.map(marks =>
          <Box p={6} e={2} m={8} bg={color.white} rounded={3} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} >
            <FontAwesome5 name="check" size={24} color={color.dark} />
            <Box ml={10} w={'90%'} >
              <Box flexDirection={"row"}>
              </Box>
              <Box flexDirection={"row"}>
                <Text color={color.dark} fontSize={18} fontWeight={"bold"}>
                  {marks?.title}
                </Text>
              </Box>
              <Box flexDirection={"row"}>
                <Box flexDirection={"row"} w={"50%"}>

                </Box>
                <Box flexDirection={"row"}>
                  <Text color={color.dark} fontWeight={"bold"}>
                    Marks : {marks?.obtained} / {marks?.total}
                  </Text>
                </Box>
              </Box>
            </Box>

          </Box>

        )}
      </ScrollView>}

    </Box>
  );
}

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     await Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     // Learn more about projectId:
//     // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
//     token = (await Notifications.getExpoPushTokenAsync({ projectId: '21d53412-c0ec-4928-b1f0-025257997946' })).data;
//     setNotificationToken(token).then(res => {
//       // if (res.success) {
//       //   setActivity(res.assignments)
//       // }
//       console.log(res)
//     })

//     // console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }
//   return token;
// }

