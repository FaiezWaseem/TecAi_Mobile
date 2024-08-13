// @ts-nocheck
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
const Tab = createBottomTabNavigator();

import color from '../../utility/Color';

import HomeTabScreen from './HomeTab'
import ProfileTab from './ProfileTab';
// import VideosTab from './VideosTab';
import AssestmentTab from './AssestmentTab.tsx';
import AttendanceTab from './AttendanceTab';
import { NavigationProps } from '../../props/navigation-props.ts';



export default function TabBtm({ navigation }: NavigationProps) {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: color.blue,
          tabBarInactiveTintColor: '#555',
   
        })}
      >
        <Tab.Screen
          name="Home"
          options={{ tabBarLabel: 'Home' }}
        >
          {(props) => <HomeTabScreen {...props} extraData={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="My Work"
          options={{ tabBarLabel: 'My Work' }}
        >
          {(props) => <AssestmentTab {...props} extraData={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="Attendance"
          options={{ tabBarLabel: 'Attendance' }}
        >
          {(props) => <AttendanceTab {...props} extraData={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{ tabBarLabel: 'Profile' }}
        >
          {(props) => <ProfileTab {...props} extraData={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}