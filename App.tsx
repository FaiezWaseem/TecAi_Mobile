import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './src/screens/Home/HomeScreen';
import SplashScreen from './src/screens/SplashScreen'
import LoginScreen from './src/screens/LoginScreen';
import AssignmentScreen from './src/screens/AssignmentScreen';

import Routes from './src/utility/Routes';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName={Routes.SPLASH}
      >
        <Stack.Screen name={Routes.SPLASH} component={SplashScreen} />
        <Stack.Screen name={Routes.LOGIN} component={LoginScreen} />
        <Stack.Screen name={Routes.HOME} component={HomeScreen} />
        <Stack.Screen name={Routes.ASSIGNMENT} component={AssignmentScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;