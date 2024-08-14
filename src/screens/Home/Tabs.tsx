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

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        >
          {(props) => <HomeTabScreen {...props} extraData={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="My Work"
          options={{
            tabBarLabel: 'My Work',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="folder-network" color={color} size={size} />
            ),

          }}
        >
          {(props) => <AssestmentTab {...props} extraData={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="Attendance"
          options={{
            tabBarLabel: 'Attendance',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar" color={color} size={size} />
            ),

          }}
        >
          {(props) => <AttendanceTab {...props} extraData={navigation} />}
        </Tab.Screen>
        <Tab.Screen
          name="Profile"
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            ),

          }}
        >
          {(props) => <ProfileTab {...props} extraData={navigation} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}