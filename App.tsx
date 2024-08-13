import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


import HomeScreen from './src/screens/Home/HomeScreen';
import SplashScreen from './src/screens/SplashScreen'
import Routes from './src/utility/Routes';
import LoginScreen from './src/screens/LoginScreen';

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;